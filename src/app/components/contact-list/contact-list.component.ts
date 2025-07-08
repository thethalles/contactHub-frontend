import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact/contact.service';
import { Contato } from '../../models/Contato';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  contatos: Contato[] = [];
  filtro: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar() {
    this.contactService.pesquisar(this.filtro).subscribe({
      next: (dados) => this.contatos = dados,
      error: (err) => console.error('Erro ao buscar contatos', err)
    });
  }
}
