import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [RouterLink],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {
  text = input<string>();
  icon = input<string>();
  link = input<string | string[]>();
  type = input<string>('button');
  buttonType = input<'primary' | 'secondary'>('primary');

  private buttonClasses: Record<string, string> = {
    primary: 'button-primary',
    secondary: 'button-secondary'
  };

  get classeCss(): string {
    return this.buttonClasses[this.buttonType()] || 'button-primary';
  }
}
