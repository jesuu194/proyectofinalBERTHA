import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReservaService, ReservaModel } from '../../../services/reserva';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List implements OnInit {
  reservas = signal<ReservaModel[]>([]);
  total = signal(0);
  page = signal(1);
  limit = 10;
  loading = signal(false);
  error = signal('');
  estado = signal('');

  constructor(private reservaService: ReservaService) {}

  ngOnInit() {
    this.fetchReservas();
  }

  fetchReservas() {
    this.loading.set(true);
    this.error.set('');
    this.reservaService.getAll(this.page(), this.limit, this.estado()).subscribe({
      next: (res) => {
        this.reservas.set(res.reservas);
        this.total.set(res.total);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar reservas');
        this.loading.set(false);
      }
    });
  }

  nextPage() {
    if (this.page() * this.limit < this.total()) {
      this.page.set(this.page() + 1);
      this.fetchReservas();
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.set(this.page() - 1);
      this.fetchReservas();
    }
  }

  onEstadoChange(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    this.estado.set(value);
    this.page.set(1);
    this.fetchReservas();
  }

  deleteReserva(id: string) {
    if (!confirm('¿Seguro que deseas eliminar esta reserva?')) return;
    this.loading.set(true);
    this.reservaService.delete(id).subscribe({
      next: () => {
        this.fetchReservas();
      },
      error: () => {
        this.error.set('No se pudo eliminar la reserva');
        this.loading.set(false);
      }
    });
  }
}
