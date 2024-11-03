import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtugestionComponent } from './etugestion.component';

describe('EtugestionComponent', () => {
  let component: EtugestionComponent;
  let fixture: ComponentFixture<EtugestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtugestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtugestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
