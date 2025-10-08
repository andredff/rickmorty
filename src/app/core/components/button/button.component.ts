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
  @Input() label!: string; // Tornado obrigatório com "!"
  @Input() count?: number;
  @Input() link!: string | string[];
  @Input() isActive: boolean = false;
  @Input() type: string = 'button';
  @Input() icon: string = '';

  ngOnInit(): void {
    if (!this.label) {
      throw new Error('The label input is required');
    }
  }

}
