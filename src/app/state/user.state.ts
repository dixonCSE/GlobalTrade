import { Injectable, signal } from '@angular/core';
import { IUser } from '../interface/user.interface';
import { UserService } from '../service/user.service';
import { GlobalConstants as gData } from 'src/app/data/global-constants';

@Injectable({
    providedIn: 'root',
})
export class UserState {
    public state = signal<IUser | null>(null);

    constructor(private _userService: UserService) {}

    loadUserState() {
        this._userService.userData().subscribe((res) => {
            // this.userState.mutate((val) => {
            //     val = {
            //         id: res.data.id,
            //         login_id: res.data.login_id,
            //         last_name: res.data.last_name,
            //         first_name: res.data.first_name,
            //         user_name: res.data.user_name,
            //         email: res.data.email,
            //         phone: res.data.phone,
            //         image: res.data.image,
            //         image_thumb: res.data.image_thumb,
            //         country__name: res.data.country__name,
            //         state: res.data.state,
            //         city: res.data.city,
            //         ps: res.data.ps,
            //         zip: res.data.zip,
            //         address_1: res.data.address_1,
            //         address_2: res.data.address_2,
            //         created_date: res.data.created_date,
            //         user_role__name: res.data.user_role__name,
            //         user_role__view_panel: res.data.user_role__view_panel,
            //         reference__id: res.data.reference__id,
            //         reference__user_name: res.data.reference__user_name,
            //         reference__email: res.data.reference__email,
            //         reference__phone: res.data.reference__phone,
            //         reference__image_thumb: res.data.reference__image_thumb,
            //     };
            // });

            this.state.set({
                id: res.data.id,
                login_id: res.data.login_id,
                last_name: res.data.last_name,
                first_name: res.data.first_name,
                user_name: res.data.user_name,
                email: res.data.email,
                phone: res.data.phone,
                image: gData.assetsBaseURL + res.data.image,
                image_thumb: gData.assetsBaseURL + res.data.image,
                country__name: res.data.country__name,
                state: res.data.state,
                city: res.data.city,
                ps: res.data.ps,
                zip: res.data.zip,
                address_1: res.data.address_1,
                address_2: res.data.address_2,
                created_date: res.data.created_date,
                user_role__name: res.data.user_role__name,
                user_role__view_panel: res.data.user_role__view_panel,
                reference__id: res.data.reference__id,
                reference__user_name: res.data.reference__user_name,
                reference__email: res.data.reference__email,
                reference__phone: res.data.reference__phone,
                reference__image_thumb: res.data.reference__image_thumb,
            });

            //console.log(this.userState());
        });
    }
}
