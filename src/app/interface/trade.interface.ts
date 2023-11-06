export interface IPendingDatatable {
    id: number;

    amount: number;
    direction: number;
    commission: number;

    status__name: string | null;
    tstamp: string | null;
    created_date: string | null;
}

export interface IPendingList {
    id: number;
    trade__key: string;

    amount: number;
    direction: number;

    res_tstamp: string | null;
    created_date: string | null;
}

export interface ICompleteDatatable {
    id: number;

    amount: number;
    direction: number;
    commission: number;

    res_direction: number;

    status__name: string | null;
    tstamp: string | null;
    created_date: string | null;
}

export interface ICompleteList {
    id: number;
    trade__key: string;
    amount: number;
    commission: number;
    direction: number;

    res_direction: number;
    status__name: string;
    res_status__id: number;
    res_status__name: string | null;
    res_tstamp: string | null;

    created_date: string | null;
}
