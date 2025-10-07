import { Component, OnInit } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';

@Component({
  selector: 'app-home',
  imports: [TitleComponent],
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


