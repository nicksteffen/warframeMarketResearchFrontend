"use server"

import { ItemsList } from "../types/Item";
import {revalidatePath} from 'next/cache'
import { cookies } from 'next/headers'




export async function updateListItemsForUser(user_id: string, items : ItemsList) {
    console.log(items.items.length > 0 ? items.items[0]["item_name"] : "empty");
}


export async function deleteItemsFromUserList(user_id: string, items : string[]) {
    // const data = JSON.stringify({
    const authToken =await get_auth_token();
    if (authToken === undefined) {
        // todo define auth error here to catch and redirect to login
        throw new Error("No auth token found");
    }
    const data = {
        userId: user_id,
        itemIds: items
    };

    // console.log(data);

    try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/user/watchlist/delete`, {
        method: 'POST',
        headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${authToken}`
         },
        body: JSON.stringify(data),
     });
 
 
     if (!resp.ok) {
         throw new Error(`HTTP error! Status: ${resp.status}`);
     }
 
 
     const respData = await resp.json();
     console.log(respData);
    revalidatePath('/');

    } catch (error) {
        console.log(`Error: ${error}`);
        throw error;
    }
}


export async function get_user_watchlist() {
    console.log("getting watchlist");
    const authToken =await get_auth_token();
    if (authToken === undefined) {
        // todo define auth error here to catch and redirect to login
        throw new Error("No auth token found");
    }
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/user/watchlist`, {
        next: {revalidate: 0},
        method: 'GET',
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${authToken}`
        },
    
    });
    const json = await resp.json()
    const data : ItemsList = {items: json ? json : []};
    return data;
}


export async function get_auth_token(authTokenName="token") {
    const token = (await cookies()).get(authTokenName);
    return token ? token.value : undefined;
}

export async function tester(token: string | undefined) {
    console.log("get cookies with next get auth");
    const authToken =await get_auth_token();
    console.log(authToken);



    if (authToken === undefined) {
        return;
    }
    // console.log(token);
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/user/protected`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${authToken}`
        },
    });
    const data = await resp.json();
    console.log("databack");
    console.log(data);
}


export async function addItemsToUserList(user_id: string, itemIds: string[] | null) {
    //  item: Item | null) {
    interface addItemData {
        userId: string
        itemIds: string[],
    }

    const authToken = await get_auth_token();


    console.log("got item thru server action");
    try {

    if (itemIds=== null) {
        console.log("no item sent");
        return;
    }
    const data : addItemData = {
        userId: user_id,
        itemIds: itemIds
    }



    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/user/watchlist/add`, {
       method: 'POST',
       headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
        },
       body: JSON.stringify(data),
    });


    if (!resp.ok) {
        throw new Error(`HTTP error! Status: ${resp.status}`);
    }


    const respData = await resp.json();
    console.log(respData);
    console.log("revalidating");
    revalidatePath('/');


} catch (error) {
    console.log(`Error: ${error}`);
    throw error;
}

}