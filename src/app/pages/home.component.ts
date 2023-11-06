import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'home-component',
    standalone: true,
    imports: [CommonModule],
    styles: [],
    template: `
        <style>
            .twg {
                background-color: brown;
            }
        </style>
        <section>
            <div class="text-center text-amber-500 font-bold text-2xl my-5  ">
                Feature
            </div>
            <div>
                <div></div>
                <div>view all</div>
            </div>
        </section>
        <section>
            <div class="text-center text-amber-500 font-bold text-2xl my-5  ">
                Best Sale
            </div>
        </section>
        <section>
            <div class="text-center text-amber-500 font-bold text-2xl my-5  ">
                Offer Product
            </div>
        </section>
    `,
})
export class HomeComponent implements OnInit {
    ngOnInit(): void {}
}
