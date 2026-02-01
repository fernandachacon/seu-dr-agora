import { Component } from '@angular/core';
import { BtnPrimaryComponent } from "../btn-primary/btn-primary";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BtnPrimaryComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  constructor(private router: Router) {}

  irParaCadastro() {
    this.router.navigate(['/form']);
  }

}
