import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, ProductModel } from '../../../services/product';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail implements OnInit {
  product = signal<ProductModel | null>(null);
  loading = signal(false);
  error = signal('');
  id: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loading.set(true);
      this.productService.getById(this.id).subscribe({
        next: (prod) => {
          this.product.set(prod);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudo cargar el producto');
          this.loading.set(false);
        }
      });
    }
  }
}
