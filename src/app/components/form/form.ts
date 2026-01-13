import { Component } from '@angular/core';
import { Header } from '../header/header';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary';

@Component({
  selector: 'app-form',
  imports: [
    Header,
    BtnPrimaryComponent
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {

}
