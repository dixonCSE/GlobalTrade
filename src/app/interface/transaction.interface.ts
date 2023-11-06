export interface ISendDatatable {
    id: number;

    sender_wallet__name: string | null;
    send_amount: number;

    receiver__user_name: string | null;
    receiver__image_thumb: string | null;
    receiver__email: string | null;
    receive_amount: number;

    created_date: string | null;
}

export interface IReceiveDatatable {
    id: number;

    receiver_wallet__name: string | null;
    receive_amount: number;

    sender__user_name: string | null;
    sender__image_thumb: string | null;
    sender__email: string | null;
    send_amount: number;

    created_date: string | null;
}
