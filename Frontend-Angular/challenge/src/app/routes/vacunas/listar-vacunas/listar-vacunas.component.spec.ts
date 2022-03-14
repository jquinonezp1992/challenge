import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVacunasComponent } from './listar-vacunas.component';

describe('ListarVacunasComponent', () => {
  let component: ListarVacunasComponent;
  let fixture: ComponentFixture<ListarVacunasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarVacunasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarVacunasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
