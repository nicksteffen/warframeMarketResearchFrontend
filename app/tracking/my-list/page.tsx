import ItemList from '@/app/components/ItemList';
import styles from "../ItemPage.module.css";
import { Item, ItemsList } from '@/app/types/Item';
import ItemSelector from '@/app/components/ItemSelector';
// import { useState } from 'react';

export default async function Page() {

    const time : number = Number(process.env.NEXT_PUBLIC_API_CACHE_TIME) || 3600;
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/item/my-list/test`, {
        next: {revalidate: time}, });
    const json = await resp.json();
    const data : ItemsList = {items: json};

    const all_items_resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/item`, {
        next: {revalidate: time}, });
    const all_items_json = await all_items_resp.json();
    const all_items : ItemsList = {items: all_items_json};


    return (
        <>
        Add items:
        <ItemSelector input_options={all_items}/>

        <div className={styles.item_table_container}>
            Coming soon...
            <ItemList items={data} ></ItemList>
        </div>
        </>
    )
}
