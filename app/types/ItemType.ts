export class ItemType {
    constructor(
        public route: string,
        public apiRoute: string,
        public name: string
    ) {}

    static getByRoute(route: string): ItemType | undefined {
        return itemTypes.find(type => type.route === route);
    }
}

export const itemTypes: ItemType[] = [
    new ItemType('prime-parts', 'item/primes', 'Prime Parts'),
    new ItemType('mods', 'item/mods', 'Mods'),
    new ItemType('test', 'item/mods', 'Test')
];