import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirecteurDashboardComponent } from './directeur-dashboard.component';

describe('DirecteurDashboardComponent', () => {
  let component: DirecteurDashboardComponent;
  let fixture: ComponentFixture<DirecteurDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirecteurDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirecteurDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
