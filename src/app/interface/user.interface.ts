export interface IUser {
    id: number;
    login_id: string;
    last_name?: string | null;
    first_name?: string | null;
    user_name: string;
    email?: string | null;
    phone?: string | null;
    image?: string | null;
    image_thumb?: string | null;
    country__name?: string | null;
    state?: string | null;
    city?: string | null;
    ps?: string | null;
    zip?: string | null;
    address_1?: string | null;
    address_2?: string | null;
    created_date?: string | null;
    user_role__name: string;
    user_role__view_panel: string;
    reference__id?: number | null;
    reference__user_name?: string | null;
    reference__email?: string | null;
    reference__phone?: string | null;
    reference__image_thumb?: string | null;
}

export interface IReference {
    id: number;
    login_id: string;
    user_name: string;
    last_name?: string | null;
    first_name?: string | null;
    email?: string | null;
    phone?: string | null;
    image_thumb?: string | null;
    created_date?: string | null;
}
