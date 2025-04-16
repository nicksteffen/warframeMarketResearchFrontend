'use client'
import { get_user_watchlist, addItemsToUserList } from "@/app/actions/userActions";
import AlertSnackbar from "@/app/components/AlertSnackbar";
import ListManager from "@/app/components/ListManager";
import AccessTokenError from "@/app/errors/AccessTokenError";
import { ItemsList } from "@/app/types/Item";
import { AlertColor } from "@mui/material";
import { getCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function QuickList() {
    const data : ItemsList = {items: []};
    // const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const [user_items, setUserItems] = useState<ItemsList>(data);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('info');
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const router = useRouter();
    const pathname = usePathname();

    const fetchMyItems = useCallback(async () => {
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
            console.log("data and list")
            console.log(data)
            console.log(data.itemsList);
            setUserItems(data.itemsList);
            return {"status": "success"};
        } catch (error) {
            if (AccessTokenError.isAccessTokenError(error)) {
                // Handle access token error, e.g., redirect to login or show an error notifi
                console.log("access token error");
            }
            else {
                console.log("Undefined error fetching items");
                console.log(error);
            }
            return {"status": "error"};
        }

     }, [router, pathname]);


    useEffect(() => {
        const token = getCookie('access_token'); // Check if the user is authenticated
        // const token = Cookies.get('token'); // Check if the user is authenticated
        if (!token) {
            // Redirect to login with the current URL as a query parameter
            const redirectUrl = encodeURIComponent(pathname);
            router.push(`/login?redirect=${redirectUrl}`);
        }
        fetchMyItems();
    }, [router, pathname, fetchMyItems]);



    return (
        <>
        <p> QUICK LIST DRAFT</p>
        <AlertSnackbar
            open={snackbarOpen}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
            severity={snackbarSeverity}
        />
        <ListManager grid_items={user_items} ></ListManager>
        </>
    )

}