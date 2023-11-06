import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'contactus-component',
    standalone: true,
    imports: [CommonModule],
    styles: ['p { font-weight: bold; }'],
    template: ` <p>ContactusComponent</p> `,
})
export class ContactusComponent {}
