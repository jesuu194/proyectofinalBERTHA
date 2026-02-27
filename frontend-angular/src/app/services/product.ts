import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductModel {
  _id?: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/v1/products';

  constructor(private http: HttpClient) {}

  getAll(page = 1, limit = 10): Observable<{products: ProductModel[], total: number}> {
    return this.http.get<{products: ProductModel[], total: number}>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  getById(id: string): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.apiUrl}/${id}`);
  }

  create(product: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.apiUrl, product);
  }

  update(id: string, product: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${this.apiUrl}/${id}`, product);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
