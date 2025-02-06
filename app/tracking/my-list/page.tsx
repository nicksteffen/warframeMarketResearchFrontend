import ItemList from '@/app/tracking/ItemList';

export default async function Page() {
    //const data = await fetch("http://localhost:3001/all/prime-parts")
    //const primes = await data.json();
    const primes = {data: []};

    return (
        <div>
            <p> Prime: </p>
                <h1>Item Details</h1>
            
            <ItemList items={primes.data} ></ItemList>

                {/* mods.data.map((item, index) =>  */} 
        </div>
    )
}
