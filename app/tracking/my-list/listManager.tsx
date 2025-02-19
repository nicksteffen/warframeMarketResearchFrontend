"use client"

import ItemList from "@/app/components/ItemList";
import ItemSelector from "@/app/components/ItemSelector";
import styles from "../ItemPage.module.css";
import { ItemsList } from "@/app/types/Item";
import { Button } from "@mui/material";
import { useState } from "react";
import { deleteItemsFromUserList } from "@/app/actions/userActions";




// export default function ItemSelector({ input_options } : {input_options: ItemsList} ) {
export default function ListManager({all_items, my_items} : {all_items: ItemsList, my_items: ItemsList}) {
    // const 
    // const emptyItemsList : ItemsList = {items:[]};
    // const [selectedItems, setSelectedItems] = useState<ItemsList>(emptyItemsList);


    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

    const deleteSelected = () => {
        console.log("delete selected");
        console.log(selectedItemIds);
        const userId = "user1";
        deleteItemsFromUserList(userId,
            selectedItemIds);
    }

    return (
        <div>
            <h1>List Manager</h1>
        <ItemSelector input_options={all_items}/>

        {/* todo this was applying style differently before */}
        <div className={styles.item_table_container}>
            {/* <ItemList items={my_items}  handleSelectionChange={setSelectedItems}></ItemList> */}
            <ItemList items={my_items}  handleSelectionChange={setSelectedItemIds}></ItemList>
        </div>
        <Button onClick={deleteSelected}>Delete Selected</Button>
        </div>
    )
}