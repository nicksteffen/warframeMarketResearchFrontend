import {ItemsList} from '@/app/types/Item';
import styles from "../ItemPage.module.css";
import ResearchGrid from '@/app/components/ResearchGrid';

export default async function Page() {
    // todo, these validation times need to be different than my-list page I think
    const time : number = Number(process.env.NEXT_PUBLIC_API_CACHE_TIME) || 3600;
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/item/primes`, {
        next: {revalidate: time},
    });
    const json = await resp.json();
    const data : ItemsList = {items: json};
    return (
        <div className={styles.item_table_container}>
            <ResearchGrid items={data}/>
        </div>
    )
}
