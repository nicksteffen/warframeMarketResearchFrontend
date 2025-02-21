"use client"
import { Button } from "@mui/material";
import { ItemsList } from "../types/Item";
import ItemList from "./ItemList";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { addItemsToUserList } from "../actions/userActions";
import { useState } from "react";




export default function ResearchGrid({items} : {items: ItemsList}) {
    const userId = "user1";
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    // const handleSelectionChange = (selectedIds: string[]) => {
        // setSelectedItemIds(selectedIds);
    // };

    const addSelected = () => {
        addItemsToUserList(userId, selectedItemIds)
    }

    const addToList = (itemId: string) => {
        console.log("add to list");
        console.log(itemId);
        addItemsToUserList(userId, [itemId]);

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
        <ItemList items={items} additionalCols={additionalCols} handleSelectionChange={setSelectedItemIds} />
        <Button variant="text" color="primary" onClick={addSelected} >Add Selected To My List</Button>
        </>
    )
}