"use client"

import ItemList from "@/app/components/ItemList";
import ItemSelector from "@/app/components/ItemSelector";
import styles from "../ItemPage.module.css";
import { ItemsList } from "@/app/types/Item";
import { Button } from "@mui/material";
import { useState } from "react";
import { deleteItemsFromUserList } from "@/app/actions/userActions";
import DeleteButton from "@/app/components/DeleteButton";
import { GridColDef } from "@mui/x-data-grid";




export default function ListManager({all_items, my_items} : {all_items: ItemsList, my_items: ItemsList}) {
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

    const deleteSelected = () => {
        console.log("delete selected");
        console.log(selectedItemIds);
        const userId = "user1";
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

    return (
        <div>
            <h1>List Manager</h1>
        <ItemSelector input_options={all_items}/>

        {/* todo this was applying style differently before */}

        <div className={styles.item_table_container}>
            {/* <ItemList items={my_items}  handleSelectionChange={setSelectedItems}></ItemList> */}
            <ItemList items={my_items}  handleSelectionChange={setSelectedItemIds} additionalCols={additionalCols}></ItemList>
        </div>
        <DeleteButton buttonAction={deleteSelected} buttonText="Delete Selected"></DeleteButton>
        </div>
    )
}