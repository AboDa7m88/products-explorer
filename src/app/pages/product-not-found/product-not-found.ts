import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackLink } from '../../components/back-link/back-link';


@Component({
  selector: 'app-product-not-found',
  imports: [RouterLink, BackLink],
  templateUrl: './product-not-found.html',
  styleUrl: './product-not-found.css',
})
export class ProductNotFound {

}
