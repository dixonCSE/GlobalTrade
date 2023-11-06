export interface ISetting {
    key: any | null;
    value?: any | null;
}

export interface ISettingState {
    setting: ISetting[] | null;
}
