import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReservaService, ReservaModel } from '../../../services/reserva';

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
    private reservaService: ReservaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      cliente: ['', [Validators.required, Validators.maxLength(50)]],
      producto: ['', [Validators.required, Validators.maxLength(50)]],
      fecha: ['', [Validators.required]],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      estado: ['pendiente', [Validators.required]]
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.id;
    if (this.isEdit && this.id) {
      this.loading.set(true);
      this.reservaService.getById(this.id).subscribe({
        next: (res) => {
          this.form.patchValue(res);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudo cargar la reserva');
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
    const data: ReservaModel = this.form.value;
    const obs = this.isEdit && this.id
      ? this.reservaService.update(this.id, data)
      : this.reservaService.create(data);
    obs.subscribe({
      next: () => {
        this.success.set(this.isEdit ? 'Reserva actualizada' : 'Reserva creada');
        this.loading.set(false);
        setTimeout(() => this.router.navigate(['/reservas']), 1200);
      },
      error: () => {
        this.error.set('Error al guardar la reserva');
        this.loading.set(false);
      }
    });
  }
}
