import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule, TruncatePipe, RouterLink],
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent {
  @Input() character: any;
  @Input() isFavorite: boolean = false;
  @Input() actionLabel: string = 'Add';
  @Input() showAdditionalInfo: boolean = false;
  @Output() action = new EventEmitter<any>();

  onAction(): void {
    this.action.emit(this.character);
  }
}
