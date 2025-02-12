"use server"

import { Item, ItemsList } from "../types/Item";




export async function updateListItemsForUser(user_id: string, items : ItemsList) {
    console.log(items.items.length > 0 ? items.items[0]["item_name"] : "empty");
}

export async function addItemToUserList(user_id: string, item: Item | null) {
    interface addItemData {
        item: Item,
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
        userId: "my-user",
        item: item,
    }


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


} catch (error) {
    console.log(`Error: ${error}`);
    throw error;
}

     


}