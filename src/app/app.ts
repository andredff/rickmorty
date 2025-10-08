import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('app-rickMorty');
  currentLanguage: string;

  constructor(private translate: TranslateService) {
    this.currentLanguage = this.translate.currentLang || 'pt';
  }

  ngOnInit(): void {
    this.translate.addLangs(['en', 'pt']);
    const browserLang = this.translate.getBrowserLang() || 'pt';
    const defaultLang = browserLang.match(/en|pt/) ? browserLang : 'pt';

    this.translate.use(defaultLang);

    this.currentLanguage = defaultLang;
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLanguage = lang;
  }
}
