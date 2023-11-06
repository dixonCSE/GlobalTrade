export interface ICartItem {
    id: string;
    productId: number;
    name: string;
    price: number;
    image: string | null;
    qty: number;
}

export interface ICartState {
    user?: any;
    item: ICartItem[] | null;
}
