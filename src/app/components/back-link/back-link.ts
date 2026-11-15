import { Location } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-link',
  imports: [],
  templateUrl: './back-link.html',
  styleUrl: './back-link.css',
})
export class BackLink {
  @Input() link = '/products';
  @Input() label = 'Back';

  private location = inject(Location);
  private router = inject(Router);

  goBack() {
    const navigationId = window.history.state?.navigationId ?? 0;
    if (navigationId > 1) {
      this.location.back();
    } else {
      this.router.navigateByUrl(this.link);
    }
  }
}
