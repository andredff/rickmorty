import { Component, input } from '@angular/core';

@Component({
  selector: 'app-subtitle',
  imports: [],
  templateUrl: './subtitle.component.html',
  styleUrl: './subtitle.component.scss'
})
export class SubtitleComponent {
  label = input<string>();
}
