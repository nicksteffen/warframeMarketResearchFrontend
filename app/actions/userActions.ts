"use server"
import { ItemsList } from "../types/Item";
import {revalidatePath} from 'next/cache'
import { cookies } from 'next/headers'
import { FilterBody } from "../types/FilterBody";

// interface FilterBody {
//     propertyName : string;
//     searchString: string;
//     wildcard: boolean;
// }


export async function deleteItemsFromUserList(items : string[]) {
    const authToken =await get_auth_token();
    if (authToken === undefined) {
        return {"status" : "error", "message": "No auth token found"}
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
            return {"status" : "error", "message": `Response returned with error status ${resp.status}`};
        }
        revalidatePath('/');
        return  {"status" : "success", "message": "Successfully deleted items from watchlist"};
    } catch (error) {
        console.log(`Error: ${error}`);
        return {"status" : "error", "message": `Caught an error ${error}`};
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
        console.log("throwing access token error");
        const emptyItemsList : ItemsList = {items: []};
        return {status: "error", itemsList : emptyItemsList};
    }
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/user/watchlist`, {
        next: {revalidate: 0},
        method: 'GET',
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${authToken}`
        },

    
    });
    if (!resp.ok) {
        console.log("error getting watchlist");
        const emptyItemsList : ItemsList = {items: []};
        return {status: "error", itemsList : emptyItemsList};
    }
    const json = await resp.json()
    const itemsList : ItemsList = {items: json ? json : []};
    const data : watchlistResponse = {status: "success", itemsList: itemsList};
    revalidatePath('/');
    return data;
}


export async function get_auth_token(authTokenName="access_token") {
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
        console.log("add items to user list");

        if (itemIds=== null) {
            console.log("no item sent");
            return;
        }
        const data = {
            itemIds: itemIds
        }
        const authToken = await get_auth_token();
        if (authToken === undefined) {
            return {"status" : "error", "message": "No auth token found"}
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
            return {"status": "error", "message":`HTTP error! Status: ${resp.status}`,
            "data": await resp.json()};
        }
        // const respData = await resp.json();
        console.log("revalidating");
        revalidatePath('/');
        return {"status": "success", "message": "Items added to watchlist", 
            "data": await resp.json()};


    } catch (error) {
        console.log(`Error: ${error}`);
        throw error;
    }

}

export async function getItemTypeData(apiRoute : string) { 
    const time : number = Number(process.env.NEXT_PUBLIC_API_CACHE_TIME) || 3600;
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/${apiRoute}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            next: {revalidate: time},
        });
        if (!resp.ok) {
            return {"status": "error", "message":`HTTP error! Status: ${resp.status}`,
            "data": await resp.json()};
        }
        return {"status": "success", "message": "Items added to watchlist",
            "data": await resp.json()};
    } catch (error) {
        console.log(`Error: ${error}`);
        throw error;
    }
}

export async function getItems(filterBody : FilterBody) { 
    const time : number = Number(process.env.NEXT_PUBLIC_API_CACHE_TIME) || 3600;
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/item/search-items`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(filterBody),
            next: {revalidate: time},
        });
        if (!resp.ok) {
            return {"status": "error", "message":`HTTP error! Status: ${resp.status}`,
            "data": await resp.json()};
        }
        return {"status": "success", "message": "Items added to watchlist",
            "data": await resp.json()};
    } catch (error) {
        console.log(`Error: ${error}`);
        throw error;
    }
}

