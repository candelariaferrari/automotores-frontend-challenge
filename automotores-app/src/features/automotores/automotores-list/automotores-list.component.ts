import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';

import { AutomotoresService } from './../../../core/services/automotores.service';


export interface Automotor {
  domain: string;
  owner: string;
  cuit: string;
  fabrication: string;
}


@Component({
  selector: 'app-automotores-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatPaginator,
    MatSortModule],
  templateUrl: './automotores-list.component.html',
  styleUrl: './automotores-list.component.scss'
})

export class AutomotoresListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private automotoresService: AutomotoresService) { }

  ngOnInit() {
    this.loadAutomotores();
  }
  loadAutomotores() {
    this.loading = true;
    this.error = false;

    this.automotoresService.getAutomotores().subscribe({
      next: (data: Automotor[]) => {
        this.originalData = data;
        this.dataSource = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.error = true;
        this.loading = false;
      }
    });
  }
  displayedColumns: string[] = ['domain', 'owner', 'cuit', 'fabrication', 'actions'];

  searchValue: string = '';

  originalData: Automotor[] = [];
  dataSource: Automotor[] = [];
  loading = false;
  error = false;

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value
      .toLowerCase()
      .trim();

    this.searchValue = value;

    this.dataSource = this.originalData.filter(item =>
      item.domain.toLowerCase().includes(value) ||
      item.cuit.toLowerCase().includes(value)
    );
  }
  goToCreate() {
    this.router.navigate(['/automotores/crear']);
  }
  goToEdit(domain: string) {
    this.router.navigate(['/automotores/editar', domain]);
  }
  delete(id: number) {
    if (!confirm('¿Seguro que querés eliminar este automotor?')) return;

    this.automotoresService.deleteAutomotor(id).subscribe(() => {
      this.loadAutomotores();
    });
  }
}
