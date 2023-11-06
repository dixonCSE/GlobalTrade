export interface IDatatable {
    id: number;
    withdraw_amount: number;
    get_amount: number;
    bank_ac: string | null;
    created_date: string | null;

    status: string | null;

    bank__name: string | null;
    bank__image: string | null;

    wallet__name: string | null;
    wallet__image: string | null;
}
