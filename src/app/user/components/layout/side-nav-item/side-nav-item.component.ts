import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';

@Component({
    selector: 'app-side-nav-item',
    templateUrl: './side-nav-item.component.html',
    styleUrls: ['./side-nav-item.component.scss'],
})

//export class SideNavItemComponent implements OnInit {
export class SideNavItemComponent implements OnChanges {
    @Input() navmenus: any;
    @Input() level: number = 0;

    is_sideNavItemClassExpanded: boolean = false;
    is_sideNavItemClassActive: boolean = false;
    tmp_is_sideNavItemClassActive: boolean = false;

    classes: string = 'level-' + this.level;

    constructor() {
        //
    }

    /* ngOnInit(): void {
        console.log(this.classes);
    } */

    ngOnChanges() {
        this.is_sideNavItemClassActive = false;
    }

    navItemExpand() {
        this.is_sideNavItemClassExpanded = !this.is_sideNavItemClassExpanded;
    }

    navItemactive() {
        this.tmp_is_sideNavItemClassActive = !this.is_sideNavItemClassActive;
        this.is_sideNavItemClassActive = this.tmp_is_sideNavItemClassActive;
    }
}
