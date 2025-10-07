import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent {
  @Input() character: any;
  @Input() isFavorite: boolean = false;
  @Input() actionLabel: string = 'Add';
  @Output() action = new EventEmitter<any>();

  onAction(): void {
    this.action.emit(this.character);
  }
}
