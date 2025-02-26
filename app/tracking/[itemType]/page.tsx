// "use client"
import {ItemsList} from '@/app/types/Item';
import styles from "@/app/tracking/ItemPage.module.css";
import ResearchGrid from '@/app/components/ResearchGrid';
import { ItemType, itemTypes } from '@/app/types/ItemType';
// import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import { getItemTypeData } from '@/app/actions/userActions';

export default async function Page({
    params 
} : {
    params: Promise<{itemType: string}>
}
) {
    const itemTypeRoute = (await params).itemType;
    const itemType = ItemType.getByRoute(itemTypeRoute);
    if (!itemType) {
        return (

            <div>
                Invalid item type
                {/* todo implement page not found component */}
                
                </div>
        )
    }
    // todo, these validation times need to be different than my-list page I think
    // const time : number = Number(process.env.NEXT_PUBLIC_API_CACHE_TIME) || 3600;
    const apiRoute = itemType.apiRoute;

    const resp = await getItemTypeData(apiRoute);
    if (!resp || resp.status === "error") {
        // todo return an error page
        return (
            <div>
                Error
            </div>
        )
    }
    const data : ItemsList = {items: resp.data};
    return (
        <div className={styles.item_table_container}>
            <ResearchGrid items={data}/>
        </div>
    )
}