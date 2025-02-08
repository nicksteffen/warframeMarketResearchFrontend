import ItemList from '@/app/tracking/ItemList';
import styles from "@/app/tracking/ItemPage.module.css";
import {ItemsList} from '@/app/types/Item';
// import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';

// export default async function Page({data} : {data : ItemsList}) {
export default async function Page() {
    // const data = await fetch("http://localhost:8000/item/")
    console.log("attempting to fetch mods");
    console.log(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/item/mods`);
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/item/mods`, {
        next: {revalidate: 3600},
    });
    const json = await resp.json();
    const data : ItemsList = {items: json};

    return (
        <div className={styles.item_table_container}>
            <ItemList items={data} ></ItemList>
        </div>
    )
}



// export const getServerSideProps: GetServerSideProps = async() => {
//     const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/item/mods`)
//     const items : ItemsList  = await data.json();


//     return {
//         props: {
//             items,
//         },
//     };
// };