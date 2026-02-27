import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, ProductModel } from '../../../services/product';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List implements OnInit {
  products = signal<ProductModel[]>([]);
  total = signal(0);
  page = signal(1);
  limit = 10;
  loading = signal(false);
  error = signal('');

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.loading.set(true);
    this.error.set('');
    this.productService.getAll(this.page(), this.limit).subscribe({
      next: (res) => {
        this.products.set(res.products);
        this.total.set(res.total);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar productos');
        this.loading.set(false);
      }
    });
  }

  deleteProduct(id: string) {
    if (!confirm('¿Seguro que deseas eliminar este producto?')) return;
    this.loading.set(true);
    this.productService.delete(id).subscribe({
      next: () => {
        this.fetchProducts();
      },
      error: () => {
        this.error.set('No se pudo eliminar el producto');
        this.loading.set(false);
      }
    });
  }

  nextPage() {
    if (this.page() * this.limit < this.total()) {
      this.page.set(this.page() + 1);
      this.fetchProducts();
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.set(this.page() - 1);
      this.fetchProducts();
    }
  }
}
