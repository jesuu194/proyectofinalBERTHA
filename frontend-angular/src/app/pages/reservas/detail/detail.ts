import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReservaService, ReservaModel } from '../../../services/reserva';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail implements OnInit {
  reserva = signal<ReservaModel | null>(null);
  loading = signal(false);
  error = signal('');
  id: string | null = null;

  constructor(
    private reservaService: ReservaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loading.set(true);
      this.reservaService.getById(this.id).subscribe({
        next: (res) => {
          this.reserva.set(res);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudo cargar la reserva');
          this.loading.set(false);
        }
      });
    }
  }
}
