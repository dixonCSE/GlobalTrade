export interface IDatatable {
    id: number;

    wallet__name: string | null;
    amount: number;

    agent_bank__name: string | null;
    agent_bank_ac: string | null;

    bank__name: string | null;
    bank_ac: string | null;
    send_amount: number;
    trxid: string | null;
    status: string | null;

    created_date: string | null;
}
