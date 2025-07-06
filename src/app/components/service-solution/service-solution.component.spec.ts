import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSolutionComponent } from './service-solution.component';

describe('ServiceSolutionComponent', () => {
  let component: ServiceSolutionComponent;
  let fixture: ComponentFixture<ServiceSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceSolutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
