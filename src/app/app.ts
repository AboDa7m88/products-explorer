import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//my imports 
import { NavBar } from './components/nav-bar/nav-bar';
import { FavoritesService } from './services/favorites.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  favorites = inject(FavoritesService);
}
