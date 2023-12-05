import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/model-clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  addNovoClientes(params: any): Observable<Cliente> {
    return this.http.post<Cliente>(
      `${environment.apiUrl}/clientes`, params
    )
  }

  getClientesById(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(
      `${environment.apiUrl}/clientes/${id}`
    );
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(
      `${environment.apiUrl}/clientes`
    );
  }

  atualizarClientes(params: any): Observable<Cliente> {
    return this.http.put<Cliente>(
      `${environment.apiUrl}/clientes/${params.id}`,params
    );
  }

  deletarClientes(id: any): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}/clientes/${id}`
    );
  }
}
