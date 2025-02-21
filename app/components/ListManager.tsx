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
import { AlertColor, Button } from "@mui/material";
import AccessTokenError from "../errors/AccessTokenError";
import { getCookie } from "cookies-next";
import AlertSnackbar from "./AlertSnackbar";

export default function ListManager({all_items, my_items} : {all_items: ItemsList, my_items: ItemsList}) {
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const [user_items, setUserItems] = useState<ItemsList>(my_items);

    // Alert Snackbar Setup
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('info');
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };



    // todo this should not exist, but when we get a token, we should be handling the user from the cookies on the backend

    const deleteSelected = () => {
        console.log("delete selected");
        console.log(selectedItemIds);
        // userId is being set as const, but should be sending the userid by getting it from cookies
        deleteItemsFromUserList(selectedItemIds);
    }


    const deleteOneItem = (itemId: string) => {
        console.log("delete one item");
        console.log(itemId);
        deleteItemsFromUserList([itemId]);
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
        tester();
    }
    const fetchMyItems = async () => {
        console.log("fetch my items")
        try {
            const data = await get_user_watchlist();

            if (data.status === "error") {
                setSnackbarMessage('Redirecting to the Login...');
                setSnackbarSeverity('info');
                setSnackbarOpen(true);
                console.log("error fetching items");
                setTimeout(() => {
                    router.push(`/login?redirect=${pathname}`);
                }, 2000);
                
            }
            setUserItems(data.itemsList);
        } catch (error) {
            if (AccessTokenError.isAccessTokenError(error)) {
                // Handle access token error, e.g., redirect to login or show an error notifi
                console.log("access token error");
            }
            else {
                console.log("Undefined error fetching items");
                console.log(error);
            }
        }

     }
   
 
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = getCookie('access_token'); // Check if the user is authenticated
        // const token = Cookies.get('token'); // Check if the user is authenticated
        if (!token) {
            // Redirect to login with the current URL as a query parameter
            const redirectUrl = encodeURIComponent(pathname);
            router.push(`/login?redirect=${redirectUrl}`);
        }
        fetchMyItems();
    }, [router, pathname]);



    return (
        <div>
        <AlertSnackbar
            open={snackbarOpen}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
            severity={snackbarSeverity}
        />
        <p>My Items</p>
        <Button onClick={testButton}>Test</Button>
        <ItemSelector input_options={all_items}/>
        <ItemList items={user_items}  handleSelectionChange={setSelectedItemIds} additionalCols={additionalCols}></ItemList>
        <DeleteButton buttonAction={deleteSelected} buttonText="Delete Selected"></DeleteButton>
        </div>
    )
}