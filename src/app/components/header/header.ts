import { Component } from '@angular/core';
import { BtnPrimaryComponent } from "../btn-primary/btn-primary";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BtnPrimaryComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
