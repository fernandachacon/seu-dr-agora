import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './components/home/home';  //adicionei depois


@Component({
  selector: 'app-root',
  standalone: true, //adicionei depois
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('SEU_DR_AGORA');
  
  marcarConsulta() {
    window.open('https://wa.me/5599999999999', '_blank');
  }
}
