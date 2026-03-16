import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-prontuario',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './prontuario.html',
  styleUrl: './prontuario.scss',
})
export class Prontuario {

}
