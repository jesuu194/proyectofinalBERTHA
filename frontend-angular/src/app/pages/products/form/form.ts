import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, ProductModel } from '../../../services/product';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form implements OnInit {
  form: FormGroup;
  loading = signal(false);
  error = signal('');
  success = signal('');
  isEdit = false;
  id: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.id;
    if (this.isEdit && this.id) {
      this.loading.set(true);
      this.productService.getById(this.id).subscribe({
        next: (prod) => {
          this.form.patchValue(prod);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudo cargar el producto');
          this.loading.set(false);
        }
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set('');
    this.success.set('');
    const data: ProductModel = this.form.value;
    const obs = this.isEdit && this.id
      ? this.productService.update(this.id, data)
      : this.productService.create(data);
    obs.subscribe({
      next: () => {
        this.success.set(this.isEdit ? 'Producto actualizado' : 'Producto creado');
        this.loading.set(false);
        setTimeout(() => this.router.navigate(['/productos']), 1200);
      },
      error: (err) => {
        this.error.set('Error al guardar el producto');
        this.loading.set(false);
      }
    });
  }
}
