import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('SEU_DR_AGORA');

  mostrarBotaoFlutuante = false;
  botaoSaindo = false;

  private readonly duracaoFadeMs = 160;

  constructor(private router: Router) {
    // estado inicial
    this.setEstadoBotao(this.isHomeUrl(this.router.url));

    // mudanças de rota
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.setEstadoBotao(this.isHomeUrl(e.urlAfterRedirects)));
  }

  private isHomeUrl(url: string) {
    // Home: "/", "/?..." (ex: ngrok-skip-browser-warning) ou "/#..." (âncoras)
  return url === '/' || url.startsWith('/?') || url.startsWith('/#');
  }

  private setEstadoBotao(naHome: boolean) {
    if (naHome) {
      this.botaoSaindo = false;
      this.mostrarBotaoFlutuante = true;  // aparece (fade-in via CSS)
      return;
    }

    // se estava visível, faz fade-out antes de remover do DOM
    if (this.mostrarBotaoFlutuante) {
      this.botaoSaindo = true;
      setTimeout(() => {
        this.mostrarBotaoFlutuante = false;
        this.botaoSaindo = false;
      }, this.duracaoFadeMs);
    } else {
      this.mostrarBotaoFlutuante = false;
      this.botaoSaindo = false;
    }
  }

  marcarConsulta() {
    this.router.navigate(['/form']);
  }
}