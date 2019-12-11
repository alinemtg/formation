import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';

import { Formacao } from '../../../../formation-common/formacao';


@Injectable({
  providedIn: 'root'
})

export class FormacaoService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private formationURL = 'http://localhost:3000';

    criar(formacao: Formacao): Observable<Formacao> {
        return this.http.post<any>(this.formationURL + "/formacao", formacao, { headers: this.headers })
            .pipe(
                retry(2),
                map(res => { if (res.success) { return formacao; } else { return null; } })
            );
    }

    atualizar(formacao: Formacao): Observable<Formacao> {
        return this.http.put<any>(this.formationURL + "/formacao", formacao, { headers: this.headers }).pipe(
            retry(2),
            map(res => { if (res.success) { return formacao; } else { return null; } })
        );
    }

    getFormacoes(): Observable<Formacao[]> {
        return this.http.get<Formacao[]>(this.formationURL + "/formacoes")
            .pipe(
                retry(2)
            );
    }

    private tratarErro(erro: any): Promise<any>{
        console.error('Acesso mal sucedido ao serviço de formacoes',erro);
        return Promise.reject(erro.message || erro);
      }

  constructor(private http: HttpClient) { }

}
