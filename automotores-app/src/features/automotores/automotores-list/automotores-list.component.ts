import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

export interface Automotor {
  domain: string;
  owner: string;
  cuit: string;
  fabrication: string;
}


@Component({
  selector: 'app-automotores-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './automotores-list.component.html',
  styleUrl: './automotores-list.component.scss'
})
export class AutomotoresListComponent {
  displayedColumns: string[] = ['domain', 'owner', 'cuit', 'fabrication', 'actions'];

  searchValue: string = '';

  originalData: Automotor[] = [
    {
      domain: 'ABC12345',
      owner: 'Juan Perez',
      cuit: '20304050607',
      fabrication: '202201'
    },
    {
      domain: 'ABC6789',
      owner: 'Maria Gomez',
      cuit: '27333444555',
      fabrication: '202112'
    },
    {
      domain: 'DFG12345',
      owner: 'Juan Perez',
      cuit: '20304050607',
      fabrication: '202201'
    },
    {
      domain: 'HIJ6789',
      owner: 'Maria Gomez',
      cuit: '27333444555',
      fabrication: '202112'
    }
  ];
  dataSource = [...this.originalData];

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

}
