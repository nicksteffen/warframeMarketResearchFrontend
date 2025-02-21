"use client"
import { AlertColor, Button } from "@mui/material";
import { ItemsList } from "../types/Item";
import ItemList from "./ItemList";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { addItemsToUserList } from "../actions/userActions";
import { useState } from "react";
import AlertSnackbar from "./AlertSnackbar";




export default function ResearchGrid({items} : {items: ItemsList}) {
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    // Alert Snackbar Setup
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('info');
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };




    const addSelected = async () => {
        const resp = await addItemsToUserList(selectedItemIds)
        if (!resp || resp.status == "error") {
            setSnackbarMessage('Error adding items');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } else {
            setSnackbarMessage('Items added successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        }
    }

    const addToList = async (itemId: string) => {
        console.log("add to list");
        console.log(itemId);
        const resp = await addItemsToUserList([itemId]);
        if (!resp || resp.status == "error") {
            setSnackbarMessage('Error adding items');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } else {
            setSnackbarMessage('Items added successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        }
    }

    const additionalCols = [
        {
                    field: 'addItem',
                    headerName: 'Add Item',
                    width: 150,
                    editable: false,
                    renderCell: (params: GridRenderCellParams) => (
                        <Button variant="text" color="primary" onClick={() => addToList(params.row.id)} >Add To My List</Button>
                    ),
                }
        ];

    return (
        <>
        <AlertSnackbar
            open={snackbarOpen}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
            severity={snackbarSeverity}
        />
        <ItemList items={items} additionalCols={additionalCols} handleSelectionChange={setSelectedItemIds} />
        <Button variant="text" color="primary" onClick={addSelected} >Add Selected To My List</Button>
        </>
    )
}