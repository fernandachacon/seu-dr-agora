import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentoPublico } from './agendamento-publico';

describe('AgendamentoPublico', () => {
  let component: AgendamentoPublico;
  let fixture: ComponentFixture<AgendamentoPublico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendamentoPublico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendamentoPublico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
