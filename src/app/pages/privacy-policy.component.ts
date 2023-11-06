import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'privacy-policy-component',
    standalone: true,
    imports: [CommonModule],
    styles: ['p { font-weight: bold; }'],
    template: ` <p>ProductDetailPageComponent</p> `,
})
export class PrivacyPolicyComponent {}
