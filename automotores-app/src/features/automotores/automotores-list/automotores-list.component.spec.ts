import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomotoresListComponent } from './automotores-list.component';

describe('AutomotoresListComponent', () => {
  let component: AutomotoresListComponent;
  let fixture: ComponentFixture<AutomotoresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomotoresListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomotoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
