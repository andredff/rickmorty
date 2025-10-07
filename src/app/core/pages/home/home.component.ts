import { Component, OnInit } from '@angular/core';
import { SearchComponent } from "../../components/search/search.component";
import { CharacterListComponent } from "../../components/characterList/character-list.component";

@Component({
  selector: 'app-home',
  imports: [SearchComponent, SearchComponent, CharacterListComponent, CharacterListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {


  ngOnInit(): void {
    // try {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     console.log(position);
    //   })
    // } catch (error) {
    //   console.log(error);
    // }
  }

}


