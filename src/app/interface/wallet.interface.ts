export interface IWallet {
    id: number;
    name: string;
    image: string | null;
}

/* export interface IUserBalance extends IWallet {
    key_code: string;
    value: number;
} */

export interface IUserBalance {
    id: number;
    name: string;
    image: string | null;
    key_code: string;
    value: number;
}

export interface IBalanceState {
    [key: string]: IUserBalance;
}
