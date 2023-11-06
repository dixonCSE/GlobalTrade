import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { RouterLink } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { MaterialModule } from 'src/app/material.module';
import { UserState } from 'src/app/state/user.state';
import { UserService } from 'src/app/service/user.service';
import { ExchangeService } from 'src/app/service/exchange.service';
import { IDatatable } from 'src/app/interface/exchange.interface';

@Component({
    selector: 'exchange-datatable-component',
    standalone: true,
    imports: [CommonModule, MaterialModule, RouterLink],
    styles: [],
    template: `
        <style>
            * {
                color: #ffff;
            }
            .container {
                position: relative;
            }

            .table-container {
                min-height: 200px;
                max-height: 500px;
                overflow: auto;
            }

            table {
                width: 100%;
                min-width: max-content;
            }

            .table-top-container {
                padding: 0rem 0.5rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            @media (max-width: 768px) {
                .table-top-container {
                    padding: 1rem 0.4rem;
                    display: block;
                }
            }

            .table-title {
                font: normal normal 500 20px/20px Roboto;
                padding: 5px 10px;
            }
            .table-subtitle {
                font: normal normal 400 12px/12px Roboto;
                padding: 2px 10px;
            }

            .mat-cell {
                padding: 2px 8px;
            }

            .mat-header-cell {
                padding: 4px 8px;
            }
        </style>
        <div class="container mat-elevation-z8">
            <div class="loading-shade" *ngIf="isLoading">
                <mat-spinner *ngIf="isLoading"></mat-spinner>
            </div>

            <div class="table-top-container">
                <div>
                    <div class="table-title">Exchange Report</div>
                </div>
                <div>
                    <mat-form-field class="tool-button">
                        <mat-label>Filter</mat-label>
                        <input
                            matInput
                            placeholder="Search"
                            #filter
                            (keyup)="searchData($event)"
                        />
                    </mat-form-field>
                </div>
            </div>

            <div class="table-container">
                <table
                    mat-table
                    matSort
                    [dataSource]="dataSource"
                    class=""
                    (matSortChange)="sortData($event)"
                    matSortActive="id"
                    matSortDisableClear
                    matSortDirection="desc"
                >
                    <ng-container matColumnDef="id">
                        <th mat-header-cell *matHeaderCellDef>#</th>
                        <td mat-cell *matCellDef="let element">
                            {{ element.id.toString(16) }}
                        </td>
                    </ng-container>

                    <ng-container matColumnDef="send_amount">
                        <th
                            mat-header-cell
                            mat-sort-header="send_amount"
                            *matHeaderCellDef
                        >
                            Send
                        </th>
                        <td mat-cell *matCellDef="let element">
                            {{ element.send_amount | currency }}
                        </td>
                    </ng-container>

                    <ng-container matColumnDef="send_wallet__name">
                        <th mat-header-cell *matHeaderCellDef>Send Wallet</th>
                        <td mat-cell *matCellDef="let element">
                            {{ element.send_wallet__name }}
                        </td>
                    </ng-container>

                    <ng-container matColumnDef="receive_amount">
                        <th
                            mat-header-cell
                            mat-sort-header="receive_amount"
                            *matHeaderCellDef
                        >
                            Receive
                        </th>
                        <td mat-cell *matCellDef="let element">
                            {{ element.receive_amount | currency }}
                        </td>
                    </ng-container>

                    <ng-container matColumnDef="receive_wallet__name">
                        <th mat-header-cell *matHeaderCellDef>
                            Receive Wallet
                        </th>
                        <td mat-cell *matCellDef="let element">
                            {{ element.receive_wallet__name }}
                        </td>
                    </ng-container>

                    <ng-container matColumnDef="created_date">
                        <th
                            mat-header-cell
                            mat-sort-header="created_date"
                            *matHeaderCellDef
                        >
                            Date
                        </th>
                        <td mat-cell *matCellDef="let element">
                            {{ element.created_date }}
                        </td>
                    </ng-container>

                    <tr
                        mat-header-row
                        *matHeaderRowDef="displayedColumns; sticky: false"
                    ></tr>

                    <tr
                        mat-row
                        *matRowDef="let row; columns: displayedColumns"
                    ></tr>
                </table>
            </div>

            <mat-paginator
                [length]="length"
                [pageSize]="limit"
                [pageSizeOptions]="[5, 10, 50, 100, 200]"
                showFirstLastButtons
                aria-label="Select page"
                (page)="paginatorChange($event)"
            >
            </mat-paginator>
        </div>
    `,
})
export class ExchangeDatatableComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = [
        'id',
        'send_amount',
        'send_wallet__name',
        'receive_amount',
        'receive_wallet__name',
        'created_date',
    ];

    dataSource: any = new MatTableDataSource<IDatatable>();
    selection = new SelectionModel<IDatatable>(true, []);

    datatableData: IDatatable[] = [];

    limit: number = 10;
    offset: number = 0;
    sortCol: string = 'id';
    sortOrder: string = 'desc';
    searchKey: string | null = null;

    length: number = 0;

    resultsLength = 0;
    isLoading = true;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        public _userState: UserState,
        private _userService: UserService,
        private _exchangeService: ExchangeService,
        public dialog: MatDialog
    ) {}
    ngOnInit(): void {
        this.loadData();
    }
    ngOnDestroy(): void {}

    loadData() {
        this._exchangeService
            .datatable(
                this.searchKey,
                this.sortCol,
                this.sortOrder,
                this.offset,
                this.limit
            )
            .subscribe((result) => {
                this.datatableData = result.data.rows;
                this.length = result.data.count;
                this.dataSource = this.datatableData;
                this.isLoading = false;
            });
    }

    paginatorChange(event?: PageEvent) {
        this.isLoading = true;
        this.offset = event?.pageIndex! * event?.pageSize!;
        this.limit = event?.pageSize!;
        this.loadData();
    }

    sortData(sort: Sort) {
        this.isLoading = true;
        this.offset = 0;
        this.sortCol = sort.active;
        if (sort.direction == 'asc' || sort.direction == 'desc') {
            this.sortOrder = sort.direction;
        } else {
            this.sortOrder = 'asc';
        }
        this.loadData();
    }

    searchData(event: Event) {
        this.isLoading = true;
        this.offset = 0;
        this.searchKey = (event.target as HTMLInputElement).value;
        this.loadData();
    }
}
