
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';

import { cuitValidator } from '../../../validators/cuit.validator';
import { DateValidator } from '../../../validators/date.validator';

import { AutomotoresService } from './../../../core/services/automotores.service';

@Component({
  selector: 'app-automotores-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './automotores-form.component.html',
  styleUrl: './automotores-form.component.scss'
})
export class AutomotoresFormComponent {

  form: FormGroup;
  isEdit = false;
  currentId!: number;

  subjects = [
    { cuit: '20304050607', name: 'Juan Perez' },
    { cuit: '27333444555', name: 'Maria Gomez' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private automotoresService: AutomotoresService,
    private fb: FormBuilder
  ) {

    this.form = this.fb.group({
      id: [null], // 👈 importante para editar

      domain: ['', [
        Validators.required,
        Validators.pattern(/^[A-Z]{3}\d{3}$|^[A-Z]{2}\d{3}[A-Z]{2}$/)
      ]],

      chassis: ['', Validators.required],
      motor: ['', Validators.required],
      color: ['', Validators.required],

      fabrication: ['', [
        Validators.required,
        DateValidator
      ]],

      cuit: ['', [
        Validators.required,
        cuitValidator
      ]],

      owner: ['', Validators.required],
    });
  }

  ngOnInit() {
    const domain = this.route.snapshot.paramMap.get('domain');

    if (domain) {
      this.isEdit = true;
      this.loadAutomotor(domain);
    }

    this.form.get('cuit')?.valueChanges.subscribe(cuit => {
      const subject = this.findSubjectByCuit(cuit);

      if (subject) {
        this.form.patchValue(
          { owner: subject.name },
          { emitEvent: false }
        );
      }
    });
  }

  onCancel() {
    this.router.navigate(['/automotores']);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const automotor = this.form.value;

    const subject = this.findSubjectByCuit(automotor.cuit);

    // 👉 si no existe el sujeto → lo creamos
    if (!subject) {
      this.openCreateSubjectDialog(automotor.cuit);
      return;
    }

    this.saveAutomotor(automotor);
  }
  saveAutomotor(automotor: any) {
    if (this.isEdit) {
      this.automotoresService.updateAutomotor(automotor.id, automotor).subscribe(() => {
        alert('Actualizado correctamente');
        this.router.navigate(['/automotores']);
      });
    } else {
      this.automotoresService.createAutomotor(automotor).subscribe(() => {
        alert('Guardado correctamente');
        this.router.navigate(['/automotores']);
      });
    }
  }
  loadAutomotor(domain: string) {
    this.automotoresService.getAutomotores().subscribe({
      next: (data) => {
        const found = data.find(a => a.domain === domain);

        if (found) {
          this.form.patchValue(found);
          this.currentId = found.id; // 👈 guardamos id
        }
      },
      error: (err) => {
        console.error(err);
        alert('Error al cargar automotor');
      }
    });
  }

  findSubjectByCuit(cuit: string) {
    return this.subjects.find(s => s.cuit === cuit);
  }

  openCreateSubjectDialog(cuit: string) {
    const name = prompt(`El CUIT ${cuit} no existe. Ingresá el nombre del sujeto:`);

    if (name) {
      // 👉 crear sujeto
      this.subjects.push({ cuit, name });

      // 👉 completar automáticamente el owner en el form
      this.form.patchValue({ owner: name });

      // 👉 ahora sí guardar automotor
      this.saveAutomotor(this.form.value);
    }
  }
}
