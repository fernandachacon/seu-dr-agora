import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionePagamento } from './selecione-pagamento';

describe('SelecionePagamento', () => {
  let component: SelecionePagamento;
  let fixture: ComponentFixture<SelecionePagamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecionePagamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecionePagamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
