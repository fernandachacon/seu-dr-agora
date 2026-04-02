import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoPa } from './resumo-pa';

describe('ResumoPa', () => {
  let component: ResumoPa;
  let fixture: ComponentFixture<ResumoPa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumoPa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumoPa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
