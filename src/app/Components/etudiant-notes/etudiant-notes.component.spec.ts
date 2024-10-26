import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantNotesComponent } from './etudiant-notes.component';

describe('EtudiantNotesComponent', () => {
  let component: EtudiantNotesComponent;
  let fixture: ComponentFixture<EtudiantNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtudiantNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
