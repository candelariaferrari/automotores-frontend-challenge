import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutomotoresListComponent } from "../features/automotores/automotores-list/automotores-list.component";

@Component({
  selector: 'app-root',
  imports: [ AutomotoresListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'automotores-app';
}
