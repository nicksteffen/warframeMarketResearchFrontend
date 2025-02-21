import { ItemsList } from '@/app/types/Item';
import ListManager from '@/app/components/ListManager';


export default async function Page() {
    const time : number = Number(process.env.NEXT_PUBLIC_API_CACHE_TIME) || 3600;

    const all_items_resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/item`, {
        next: {revalidate: time}, });
    const all_items_json = await all_items_resp.json();
    const all_items : ItemsList = {items: all_items_json};

    return (
        <>
        <ListManager all_items={all_items}></ListManager>
        </>
    )
}
