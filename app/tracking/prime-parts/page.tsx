import ItemList from '@/app/tracking/ItemList';

export default async function Page() {
    // const data = await fetch("http://localhost:8000/item/")
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/item/primes`)	
    const json = await data.json();
    const mods = json
    // .filter((item) => item.item_type == "COMPONENT");
    console.log(mods);

    return (
        <div>
            <p> PRIMES: </p>
                <h1>Item Details</h1>
            
            <ItemList items={mods} ></ItemList>

                {/* mods.data.map((item, index) =>  */} 
        </div>
    )
}
