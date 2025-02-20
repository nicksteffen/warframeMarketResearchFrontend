import ItemList from '@/app/components/ItemList';
import styles from "@/app/tracking/ItemPage.module.css";
import {ItemsList} from '@/app/types/Item';
import { Button } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
// import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';

// export default async function Page({data} : {data : ItemsList}) {
export default async function Page() {
    console.log("attempting to fetch mods");
    console.log(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/item/mods`);
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/item/mods`, {
        next: {revalidate: 3600},
    });
    const json = await resp.json();
    const data : ItemsList = {items: json};


    const additionalCols : GridColDef[] =
    [];
    // [
    //     {
    //         field: 'addItem',
    //         headerName: 'Add Item',
    //         width: 150,
    //         editable: false,
    //         renderCell: (params: GridRenderCellParams) => (
    //             <Button variant="contained" color="primary" ></Button>
    //             // <button onClick={() => console.log(params.row)}>Add Item</button>
    //         ),
    //     }
    // ]
    // todo need to figure out issue with the render cell client component issue.
    // probably by making a component to share for mods and prime parts, especially if there would be another type of item to track later

    return (
        <div className={styles.item_table_container}>
            <ItemList items={data}  additionalCols={additionalCols}></ItemList>
        </div>
    )
}