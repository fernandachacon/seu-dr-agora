import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaPaciente } from './area-paciente';

describe('AreaPaciente', () => {
  let component: AreaPaciente;
  let fixture: ComponentFixture<AreaPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaPaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
