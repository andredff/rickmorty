import { Component, OnInit } from '@angular/core';
import { CharacterDetailComponent } from "../../components/character-details/character-detail.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CharacterDetailComponent],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
