"use client"
import { AlertColor, Button } from "@mui/material";
import { ItemsList } from "../types/Item";
import ItemList from "./ItemList";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { addItemsToList, addItemsToUserList } from "../actions/userActions";
import { useState } from "react";
import AlertSnackbar from "./AlertSnackbar";
import ListsDropdown from "./ListsDropdown";




export default function ResearchGrid({items} : {items: ItemsList}) {
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const [selectedListId, setSelectedListId] = useState<string>('');
    // Alert Snackbar Setup
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('info');
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };


    const logId = async (selected_list_id : string | null) =>{
        console.log("selected list id before:");
        console.log(selectedListId);
        console.log("selected item ids");
        console.log(selected_list_id);
        setSelectedListId(selected_list_id ? selected_list_id : '');
        console.log("selected list id is now");
        console.log(selectedListId);


    }


    const addItemsToSelectedList = async (list_id: string, item_ids: string[]) => {
        const response = await addItemsToList(list_id, item_ids);
        if (!response || response.status == "error") {

            setSnackbarMessage('Error adding items');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } else {
            setSnackbarMessage('Items added successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        }
    }





    const addSelected = async () => {
        console.log("selected item ids");
        console.log(selectedItemIds);
        console.log("selected list id");
        console.log(selectedListId);
        addItemsToSelectedList(selectedListId, selectedItemIds);
        // const response = await addItemsToList(selectedListId, selectedItemIds)
        // if (!response || response.status == "error") {

        //     setSnackbarMessage('Error adding items');
        //     setSnackbarSeverity('error');
        //     setSnackbarOpen(true);
        // } else {
        //     setSnackbarMessage('Items added successfully');
        //     setSnackbarSeverity('success');
        //     setSnackbarOpen(true);
        // }
    }

    const addToList = async (itemId: string) => {
        // setSelectedItemIds([itemId]);
        // addSelected()
        addItemsToSelectedList(selectedListId, [itemId]);
    }

    const additionalCols = [
        {
                    field: 'addItem',
                    headerName: 'Add Item',
                    width: 150,
                    editable: false,
                    renderCell: (params: GridRenderCellParams) => (
                        <Button disabled={selectedListId.length < 1} variant="text" color="primary" onClick={() => addToList(params.row.id)} >Add To My List</Button>
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
        <div> {selectedListId }</div>
        <ItemList items={items} additionalCols={additionalCols} handleSelectionChange={setSelectedItemIds} />
        <Button variant="text" color="primary" onClick={addSelected} disabled={selectedListId.length < 1 || selectedItemIds.length < 1 }>Add Selected To My List</Button>
        <ListsDropdown onSelectionChange={logId} />
        </>
    )
}