import ItemList from '@/app/tracking/ItemList';
import styles from "../ItemPage.module.css";
// import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';

export default async function Page() {
    // const data = await fetch("http://localhost:8000/item/")
    console.log("attempting to fetch mods");
    console.log(`${process.env.NEXT_PUBLIC_API_URL}:8000/item/mods`);
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:8000/item/mods`)
    const json = await data.json();

    // const { mode, setMode } = useColorScheme();
    // if (!mode) {
    //   return null;
    // }

    // const mods = JSON.parse(json);
    // const mods = await data.json()
        // .filter((item) => item.item_type == "MOD");
    const mods = json
        // .filter((item) => item.item_type == "MOD");
    console.log(mods);

    // const theme = createTheme({
    //     colorSchemes: {
    //       dark: true,
    //     },
    //   });

    return (
        //todo make this a component?
        // should item list be the only thing here?
        // no- probably not, we want my list to have add and delete features which would be part of this
        <div className={styles.item_table_container}>
            
            <ItemList items={mods} ></ItemList>
        </div>
    )
}
