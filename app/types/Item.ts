export interface Item  {
	item_name: string;
	median_price: number;
	volume: number;
	wiki_link: string;
	market_link: string;
	_id: string;
}

export interface ItemsList {
    items: Item[];
}