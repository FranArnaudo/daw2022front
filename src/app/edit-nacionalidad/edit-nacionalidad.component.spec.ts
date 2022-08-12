import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNacionalidadComponent } from './edit-nacionalidad.component';

describe('EditNacionalidadComponent', () => {
  let component: EditNacionalidadComponent;
  let fixture: ComponentFixture<EditNacionalidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNacionalidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNacionalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
