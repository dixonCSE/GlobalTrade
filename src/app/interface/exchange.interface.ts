export interface IDatatable {
    id: number;

    send_amount: number;
    send_wallet__name: string | null;

    receive_amount: number;
    receive_wallet__name: string | null;

    created_date: string | null;
}
