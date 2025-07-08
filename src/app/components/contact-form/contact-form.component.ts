import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../../services/contact/contact.service';
import { Categoria } from '../../models/Categoria';
import { Contato } from '../../models/Contato';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  standalone: false,
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnInit {
  contato: Omit<Contato, 'id'> = {
    nome: '',
    fotoUrl: '',
    emailPrincipal: '',
    telefonePrincipal: '',
    empresa: '',
    cargo: '',
    aniversario: '',
    endereco: {
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: ''
    },
    notas: '',
    favorito: false,
    categoria: null
  };

  categorias: Categoria[] = [];
  isEditMode: boolean = false;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Carregar categorias
    this.http.get<Categoria[]>('//contact-hub.duckdns.org/categorias').subscribe({
      next: (cats) => (this.categorias = cats),
      error: () => (this.categorias = [])
    });

    // Verificar modo de edição
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.contactService.buscarPorId(Number(id)).subscribe({
        next: (contato) => {
          const { id, ...contatoSemId } = contato;
          this.contato = contatoSemId;
        },
        error: (err) => {
          alert('Erro ao carregar contato para edição: ' + err.message);
          this.router.navigate(['/contatos']);
        }
      });
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.isEditMode) {
        // Atualiza o contato existente
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.contactService.atualizar(Number(id), this.contato as Contato).subscribe({
            next: () => this.router.navigate(['/contatos']),
            error: err => alert('Erro ao atualizar contato: ' + err.message)
          });
        }
      } else {
        // Cria um novo contato
        let contatoParaEnvio: any = { ...this.contato };

        // Remove id se existir
        delete contatoParaEnvio.id;

        // Ajusta categoria para enviar apenas o id
        if (contatoParaEnvio.categoria && contatoParaEnvio.categoria.id) {
          contatoParaEnvio.categoria = { id: contatoParaEnvio.categoria.id };
        } else {
          contatoParaEnvio.categoria = null;
        }

        this.contactService.criar(contatoParaEnvio).subscribe({
          next: () => this.router.navigate(['/contatos']),
          error: err => alert('Erro ao salvar contato: ' + err.message)
        });
      }
    }
  }

}
