import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contato } from '../../models/Contato';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://contact-hub.duckdns.org:8080/contatos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro?: string, categoriaId?: number, favorito?: boolean): Observable<Contato[]> {
    let params = new HttpParams();
    if (filtro) params = params.set('filtro', filtro);
    if (categoriaId) params = params.set('categoriaId', categoriaId.toString());
    if (favorito !== undefined) params = params.set('favorito', favorito.toString());
    return this.http.get<Contato[]>(this.apiUrl, { params });
  }

  buscarPorId(id: number): Observable<Contato> {
    return this.http.get<Contato>(`${this.apiUrl}/${id}`);
  }

  criar(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.apiUrl, contato);
  }

  atualizar(id: number, contato: Contato): Observable<Contato> {
    return this.http.put<Contato>(`${this.apiUrl}/${id}`, contato);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  alterarFavorito(id: number): Observable<Contato> {
    return this.http.patch<Contato>(`${this.apiUrl}/${id}/favorito`, {});
  }

}
