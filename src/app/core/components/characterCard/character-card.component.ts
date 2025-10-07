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
  @Input() character: any; // Dados do personagem
  @Input() isFavorite: boolean = false; // Indica se o personagem é favorito
  @Input() actionLabel: string = 'Add'; // Texto do botão (ex.: "Add" ou "Remove")
  @Output() action = new EventEmitter<any>(); // Evento para ações (add/remove)

  onAction(): void {
    this.action.emit(this.character); // Emite o evento com os dados do personagem
  }
}
