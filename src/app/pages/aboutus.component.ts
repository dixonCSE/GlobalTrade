import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'aboutus-component',
    standalone: true,
    imports: [CommonModule],
    styles: ['p { font-weight: bold; }'],
    template: ` <p>AboutUsComponent</p> `,
})
export class AboutusComponent {}
