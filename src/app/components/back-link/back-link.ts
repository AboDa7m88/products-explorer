import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-back-link',
  imports: [RouterLink],
  templateUrl: './back-link.html',
  styleUrl: './back-link.css',
})
export class BackLink {
  @Input() link='/';
  @Input() label = 'Back to products';
}
