"use server"

import { Item, ItemsList } from "../types/Item";
import {revalidatePath} from 'next/cache'




export async function updateListItemsForUser(user_id: string, items : ItemsList) {
    console.log(items.items.length > 0 ? items.items[0]["item_name"] : "empty");
}


export async function deleteItemsFromUserList(user_id: string, items : string[]) {
    // const data = JSON.stringify({
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


export async function addItemToUserList(user_id: string, item: Item | null) {
    interface addItemData {
        itemId: string,
        userId: string
    }
    console.log("got item thru server action");
    console.log(item);
    try {

    if (item === null) {
        console.log("no item sent");
        return;
    }
    const data : addItemData = {
        userId: "user1",
        itemId: item._id,
    }

    console.log(JSON.stringify(data));


    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/user/watchlist/add`, {
       method: 'POST',
       headers: {
        "Content-Type": "application/json",
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