import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { cuitValidator } from '../../../app/validators/cuit.validator';
import { DateValidator } from '../../../app/validators/date.validator';

import { AutomotoresService } from '../../../core/services/automotores.service';

@Component({
  selector: 'app-automotores-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './automotores-form.component.html',
  styleUrl: './automotores-form.component.scss'
})

export class AutomotoresFormComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private automotoresService: AutomotoresService,
    private fb: FormBuilder
  ) {

    this.form = this.fb.group({
      domain: ['', [
        Validators.required,
        Validators.pattern(/^[A-Z]{3}\d{3}$|^[A-Z]{2}\d{3}[A-Z]{2}$/)
      ]],
      chassis:['', [ Validators.required,]],
      motor:['', [ Validators.required,]],
      color:['', [ Validators.required,]],
      fabrication: ['', [
        Validators.required,
        DateValidator]],
      cuit: ['', [
        Validators.required,
        cuitValidator
      ]],
      owner: ['', [Validators.required]],
    });
  }

  form: FormGroup;

  subjects = [
    { cuit: '20304050607', name: 'Juan Perez' },
    { cuit: '27333444555', name: 'Maria Gomez' }
  ];

  ngOnInit() {
    const domain = this.route.snapshot.paramMap.get('domain');

    if (domain) {
      this.loadAutomotor(domain);
    }
  }

  onCancel() {
    this.router.navigate(['/automotores']);
  }

  onSubmit() {
    const automotor = this.form.value;

    const subject = this.findSubjectByCuit(automotor.cuit);

    if (!subject) {
      this.openCreateSubjectDialog(automotor.cuit);
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.automotoresService.createAutomotor(automotor).subscribe({
      next: () => {
        alert('Guardado correctamente');
        this.router.navigate(['/automotores']);
      },
      error: (err) => {
        console.error(err);

        if (err.status === 422) {
          alert('Error de validación del backend');
        }
      }
    });
  }

  loadAutomotor(domain: string) {
    const mock = {
      domain: 'ABC12345',
      owner: 'Juan Perez',
      cuit: '20304050607',
      fabrication: '202201'
    };

    this.form.patchValue(mock);
  }

  findSubjectByCuit(cuit: string) {
    return this.subjects.find(s => s.cuit === cuit);
  }
  openCreateSubjectDialog(cuit: string) {
    const name = prompt(`El CUIT ${cuit} no existe. Ingresá el nombre del sujeto:`);

    if (name) {
      this.subjects.push({ cuit, name });
      alert('Sujeto creado correctamente');

      this.onSubmit();
    }
  }
}
