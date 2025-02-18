import ItemList from '@/app/components/ItemList';
import {ItemsList} from '@/app/types/Item';
import styles from "../ItemPage.module.css";

export default async function Page() {
    // const data = await fetch("http://localhost:8000/item/")
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/item/primes`, {
        next: {revalidate: 3600},
    });
    const json = await resp.json();
    const data : ItemsList = {items: json};

    return (
        <div className={styles.item_table_container}>
            {/* <ItemList items={data} ></ItemList> */}
            <ItemList items={data} handleSelectionChange={undefined} ></ItemList>

                {/* mods.data.map((item, index) =>  */} 
        </div>
    )
}
