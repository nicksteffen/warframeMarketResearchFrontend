"use client"

import ItemList from "@/app/components/ItemList";
import ItemSelector from "@/app/components/ItemSelector";
// import styles from "@/ItemPage.module.css";
import { ItemsList } from "@/app/types/Item";
// import { useCallback, useState } from "react";
import { useState } from "react";
import { addItemsToList, deleteItemsFromList } from "@/app/actions/userActions";
import DeleteButton from "@/app/components/DeleteButton";
import { GridColDef } from "@mui/x-data-grid";
// import { usePathname, useRouter } from 'next/navigation';
// import { useEffect } from 'react';
import { AlertColor } from "@mui/material";
// import AccessTokenError from "../errors/AccessTokenError";
// import { getCookie } from "cookies-next";
import AlertSnackbar from "./AlertSnackbar";

interface Params {
    grid_items : ItemsList;
    list_id : string;
}

export default function ListManager({list_id, grid_items } : Params) {
    // const data : ItemsList = {items: []};
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    // const [user_items, setUserItems] = useState<ItemsList>(data);

    // Alert Snackbar Setup
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('info');
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };



    // todo this should not exist, but when we get a token, we should be handling the user from the cookies on the backend

    const deleteItems = async (itemIds : string[]) => {
        // const resp = await deleteItemsFromUserList(itemIds);
        const resp = await deleteItemsFromList(list_id, itemIds);
        if (!resp || resp.status == "error") {
            setSnackbarMessage('Error deleting items');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } else {
            setSnackbarMessage(`${itemIds.length ? "Items" : "Item"} deleted successfully`);
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            // fetchMyItems();
        }
    }

    const deleteSelected = async () => {
        console.log("delete selected");
        console.log(selectedItemIds);
        deleteItems(selectedItemIds);
    }

    const deleteOneItem = async (itemId: string) => {
        console.log("delete one item");
        console.log(itemId);
        deleteItems([itemId]);
    }

    const addItem = async (item_id: string) => {   
        try {
            const data = await addItemsToList(list_id, [item_id])
            // const data = await addItemsToUserList([item_id]);
            if (data && data.status === "success") {
                setSnackbarMessage('Item added successfully');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                // fetchMyItems();
            }
        } catch (error) {
            console.error('Failed to add item:', error);
        }
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
    // const testButton = () => {
    //     console.log("test button");
    //     tester();
    // }
    // const router = useRouter();
    // const pathname = usePathname();

    // const fetchMyItems = useCallback(async () => {
    //     console.log("fetch my items")
    //     try {
    //         const data = await get_user_watchlist();

    //         if (data.status === "error") {
    //             setSnackbarMessage('Redirecting to the Login...');
    //             setSnackbarSeverity('info');
    //             setSnackbarOpen(true);
    //             console.log("error fetching items");
    //             setTimeout(() => {
    //                 router.push(`/login?redirect=${pathname}`);
    //             }, 2000);
                
    //         }
    //         console.log("data and list")
    //         console.log(data)
    //         console.log(data.itemsList);
    //         setUserItems(data.itemsList);
    //         return {"status": "success"};
    //     } catch (error) {
    //         if (AccessTokenError.isAccessTokenError(error)) {
    //             // Handle access token error, e.g., redirect to login or show an error notifi
    //             console.log("access token error");
    //         }
    //         else {
    //             console.log("Undefined error fetching items");
    //             console.log(error);
    //         }
    //         return {"status": "error"};
    //     }

    //  }, [router, pathname]);



    // useEffect(() => {
    //     const token = getCookie('access_token'); // Check if the user is authenticated
    //     // const token = Cookies.get('token'); // Check if the user is authenticated
    //     if (!token) {
    //         // Redirect to login with the current URL as a query parameter
    //         const redirectUrl = encodeURIComponent(pathname);
    //         router.push(`/login?redirect=${redirectUrl}`);
    //     }
    //     fetchMyItems();
    // }, [router, pathname, fetchMyItems]);



    return (
        <div>
        <AlertSnackbar
            open={snackbarOpen}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
            severity={snackbarSeverity}
        />
        <p>My Items</p>
        {/* <Button onClick={testButton}>Test</Button> */}
        <ItemSelector onButtonClick={addItem}/>
        <ItemList items={grid_items}  handleSelectionChange={setSelectedItemIds} additionalCols={additionalCols}></ItemList>
        <DeleteButton buttonAction={deleteSelected} buttonText="Delete Selected"></DeleteButton>
        </div>
    )
}