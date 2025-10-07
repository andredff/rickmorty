import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {


  ngOnInit(): void {
    try {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
      })
    } catch (error) {
      console.log(error);
    }
  }

}


