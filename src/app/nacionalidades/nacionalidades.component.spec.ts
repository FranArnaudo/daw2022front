import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NacionalidadesComponent } from './nacionalidades.component';

describe('NacionalidadesComponent', () => {
  let component: NacionalidadesComponent;
  let fixture: ComponentFixture<NacionalidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NacionalidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NacionalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
