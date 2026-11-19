import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// A página inicial agora é a landing estática (public/index.html).
// Quando o app navega para "/", recarrega a página para abrir a landing.
@Component({
  selector: 'app-inicio',
  standalone: true,
  template: '',
})
export class Inicio {
  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      window.location.replace('/' + window.location.search + window.location.hash);
    }
  }
}
