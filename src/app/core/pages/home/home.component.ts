import { Component } from '@angular/core';
import { SearchComponent } from "../../components/search/search.component";
import { CharacterListComponent } from "../../components/character-list/character-list.component";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [SearchComponent, SearchComponent, CharacterListComponent, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}


