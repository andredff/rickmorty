import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [RouterLink, CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent implements OnInit {
  label = input<string>();
  icon = input<string>();
  link = input<string | string[]>();
  type = input<string>('button');
  buttonType = input<'primary' | 'secondary'>('primary');
  borderRightRadius = input<boolean | undefined>(true)
  borderLeftRadius = input<boolean | undefined>(true);

  ngOnInit(): void {
    if (!this.label) {
      throw new Error('The label input is required');

    }
  }

  private buttonClasses: Record<string, string> = {
    primary: 'primary-button',
    secondary: 'secondary-button'
  };

  get classeCss(): string {
    return this.buttonClasses[this.buttonType()] || 'primary-button';
  }

  get dynamicStyles(): any {
    return {
      'border-top-right-radius': this.borderRightRadius() ? '12px' : '0',
      'border-bottom-right-radius': this.borderRightRadius() ? '12px' : '0',
      'border-top-left-radius': this.borderLeftRadius() ? '12px' : '0',
      'border-bottom-left-radius': this.borderLeftRadius() ? '12px' : '0'
    };
  }
}
