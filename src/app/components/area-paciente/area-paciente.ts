import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-area-paciente',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Footer
  ],
  templateUrl: './area-paciente.html',
  styleUrl: './area-paciente.scss',
})
export class AreaPaciente {

}
