import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';

const routes: Routes = [
  // Rota principal que exibe a lista de contatos
  { path: '', component: ContactListComponent },

  // A rota 'contacts' é uma alternativa, redirecionando para a rota principal
  { path: 'contatos', redirectTo: '', pathMatch: 'full' }, 
  
  // Rota para criar um novo contato
  { path: 'contatos/novo', component: ContactFormComponent },
  
  // Rota para ver os detalhes de um contato específico
  { path: 'contatos/:id', component: ContactDetailComponent },
  
  // Rota para editar um contato específico
  { path: 'contatos/:id/edit', component: ContactFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
