"use client"
import { useState } from "react";
import { ItemsList } from "../types/Item";
import ResearchGrid from "./ResearchGrid";
import SearchBar from "./SearchBar";
import { FilterBody } from "../types/FilterBody";
import { getItems } from "../actions/userActions";


export default function SearchList() {
    const [searchItems, setSearchItems] = useState<ItemsList>({items: []});

    const handleSearch = async (query: string) => {
      console.log('Search query:', query);
      // You can add your search logic here
      const itemsList : ItemsList = {items : []};
      const filter : FilterBody = {
        property_name: "item_name",
        search_term : query,
        wildcard : true
      }
      const resp = await getItems(filter);
      if (!resp || resp.status === "error") {
        // todo implement later
        console.log("ERROR");
      } else {
        const data = resp.data;

        // setSearchItems(itemsList);
        setSearchItems({items: data});

      }

      // return itemsList;
    };

    return (
        <>
        <SearchBar onSearch={handleSearch}/>
        <ResearchGrid items={searchItems}/>
        </>
    );
}