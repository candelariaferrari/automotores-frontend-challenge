import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomotoresFormComponent } from './automotores-form.component';

describe('AutomotoresFormComponent', () => {
  let component: AutomotoresFormComponent;
  let fixture: ComponentFixture<AutomotoresFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomotoresFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomotoresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
