"use server"
import { ItemsList } from "../types/Item";
import {revalidatePath} from 'next/cache'
import { cookies } from 'next/headers'
import AccessTokenError from "../errors/AccessTokenError";
import { redirect } from "next/navigation";
import { UserGroupIcon } from "@heroicons/react/16/solid";


export async function deleteItemsFromUserList(items : string[]) {
    // const data = JSON.stringify({
    const authToken =await get_auth_token();
    if (authToken === undefined) {
        // todo define auth error here to catch and redirect to login
        throw new Error("No auth token found");
    }
    const data = {
        itemIds: items
    };
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
    interface watchlistResponse {
        status: string,
        itemsList: ItemsList
    }
    console.log("getting watchlist");
    const authToken =await get_auth_token();
    if (authToken === undefined) {
        // todo define auth error here to catch and redirect to login
        console.log("throwing access token erro");
        const emptyItemsList : ItemsList = {items: []};
        return {status: "error", itemsList : emptyItemsList};
        // throw new AccessTokenError('Access token is invalid', 403, 'TOKEN_INVALID');
        // redirect(`/login?redirect=/tracking/my-list`);
        // throw new Error("No auth token found");
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
    // const data : ItemsList = {items: json ? json : []};
    const itemsList : ItemsList = {items: json ? json : []};
    const data : watchlistResponse = {status: "success", itemsList: itemsList};
    console.log("watchlist data");
    console.log(data);
    return data;
}


export async function get_auth_token(authTokenName="auth_token") {
    const token = (await cookies()).get(authTokenName);
    return token ? token.value : undefined;
}

export async function tester() {
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


export async function addItemsToUserList(itemIds: string[] | null) {
    try {

    if (itemIds=== null) {
        console.log("no item sent");
        return;
    }
    const data = {
        itemIds: itemIds
    }
    const authToken = await get_auth_token();

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