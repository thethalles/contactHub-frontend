import { Component, Input } from '@angular/core';
import { Contato } from '../../models/Contato';

@Component({
  selector: 'app-contact-card',
  standalone: false,
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.css'
})
export class ContactCardComponent {
  @Input() contato!: Contato;
}
