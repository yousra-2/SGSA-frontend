import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantAttestationComponent } from './etudiant-attestation.component';

describe('EtudiantAttestationComponent', () => {
  let component: EtudiantAttestationComponent;
  let fixture: ComponentFixture<EtudiantAttestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtudiantAttestationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
