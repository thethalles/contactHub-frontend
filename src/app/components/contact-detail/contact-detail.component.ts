import { Component, OnInit } from '@angular/core';
import { Contato } from '../../models/Contato';
import { ContactService } from '../../services/contact/contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent implements OnInit {
  contato: Contato | undefined;
  
  constructor(private contactService: ContactService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getContato();
  }

  getContato(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.contactService.buscarPorId(Number(id)).subscribe({
          next: (dados) => {
            this.contato = dados;
            console.log('Contato recebido com sucesso:', this.contato);
          },
          error: (err) => {
            console.error('Ocorreu um erro ao buscar o contato:', err);
          }
        });
      }
  }

  excluirContato() {
    if (confirm('Tem certeza que deseja excluir este contato?')) {
      this.contactService.deletar(this.contato!.id).subscribe({
        next: () => this.router.navigate(['/contatos']),
        error: err => alert('Erro ao excluir contato: ' + err.message)
      });
    }
  }
}
