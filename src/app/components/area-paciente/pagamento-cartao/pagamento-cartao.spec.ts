import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoCartao } from './pagamento-cartao';

describe('PagamentoCartao', () => {
  let component: PagamentoCartao;
  let fixture: ComponentFixture<PagamentoCartao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagamentoCartao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagamentoCartao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
