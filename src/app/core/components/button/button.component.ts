import { CommonModule } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [RouterLink, CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent implements OnInit {
  @Input() buttonClass: string = '';
  label = input<string>();
  count = input<number | undefined>();
  link = input<string | string[]>();
  isActive = input<boolean>(false);
  type = input<string>('button');
  icon = input<string>('');


  ngOnInit(): void {
    if (!this.label) {
      throw new Error('The label input is required');
    }
  }

}
