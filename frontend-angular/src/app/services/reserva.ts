import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReservaModel {
  _id?: string;
  cliente: string;
  producto: string;
  fecha: string;
  cantidad: number;
  estado: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private apiUrl = 'http://localhost:3000/api/v1/reserva';

  constructor(private http: HttpClient) {}

  getAll(page = 1, limit = 10, estado?: string): Observable<{reservas: ReservaModel[], total: number}> {
    let url = `${this.apiUrl}/get/all?page=${page}&limit=${limit}`;
    if (estado) url += `&estado=${estado}`;
    return this.http.get<{reservas: ReservaModel[], total: number}>(url);
  }

  getById(id: string): Observable<ReservaModel> {
    return this.http.get<ReservaModel>(`${this.apiUrl}/get/${id}`);
  }

  create(reserva: ReservaModel): Observable<ReservaModel> {
    return this.http.post<ReservaModel>(`${this.apiUrl}/post`, reserva);
  }

  update(id: string, reserva: ReservaModel): Observable<ReservaModel> {
    return this.http.patch<ReservaModel>(`${this.apiUrl}/update/${id}`, reserva);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
