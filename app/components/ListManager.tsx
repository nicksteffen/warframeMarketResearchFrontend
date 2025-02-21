"use client"

import ItemList from "@/app/components/ItemList";
import ItemSelector from "@/app/components/ItemSelector";
// import styles from "@/ItemPage.module.css";
import { ItemsList } from "@/app/types/Item";
import { useState } from "react";
import { deleteItemsFromUserList, get_user_watchlist, tester } from "@/app/actions/userActions";
import DeleteButton from "@/app/components/DeleteButton";
import { GridColDef } from "@mui/x-data-grid";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button } from "@mui/material";

export default function ListManager({all_items, my_items} : {all_items: ItemsList, my_items: ItemsList}) {
    const userId = "user1";
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const [user_items, setUserItems] = useState<ItemsList>(my_items);
    // todo this should not exist, but when we get a token, we should be handling the user from the cookies on the backend

    const deleteSelected = () => {
        console.log("delete selected");
        console.log(selectedItemIds);
        // userId is being set as const, but should be sending the userid by getting it from cookies
        deleteItemsFromUserList(userId,
            selectedItemIds);
    }


    const deleteOneItem = (itemId: string) => {
        console.log("delete one item");
        console.log(itemId);
        const userId = "user1";
        deleteItemsFromUserList(userId,
            [itemId]);
    }

    const additionalCols : GridColDef[] = [
        {
            field: 'delete1',
            headerName: 'Delete',
            width: 150,
            renderCell: (params) => (
                <DeleteButton buttonAction={() => deleteOneItem(params.row.id)} buttonText="Delete"></DeleteButton>
            ),
        },
    ];
    const testButton = () => {
        console.log("test button");
        tester(Cookies.get('token'));
    }
    const fetchMyItems = async () => {
        console.log("fetch my items")
        // if (!token) {
            // console.log("no token")
            // return;
        // }
        try {
            const data = await get_user_watchlist();
            setUserItems(data);
        } catch (error) {
            console.log("error fetching items");
            console.log(error);
        }

     }
   
 
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = Cookies.get('token'); // Check if the user is authenticated
        if (!token) {
            // Redirect to login with the current URL as a query parameter
            const redirectUrl = encodeURIComponent(pathname);
            router.push(`/login?redirect=${redirectUrl}`);
        }
        fetchMyItems(token);
    }, [router, pathname]);



    return (
        <div>
            <p>My Items</p>
            <Button onClick={testButton}>Test</Button>
        <ItemSelector input_options={all_items}/>
        <ItemList items={user_items}  handleSelectionChange={setSelectedItemIds} additionalCols={additionalCols}></ItemList>
        <DeleteButton buttonAction={deleteSelected} buttonText="Delete Selected"></DeleteButton>
        </div>
    )
}