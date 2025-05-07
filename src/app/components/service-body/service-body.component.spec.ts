import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBodyComponent } from './service-body.component';

describe('ServiceBodyComponent', () => {
  let component: ServiceBodyComponent;
  let fixture: ComponentFixture<ServiceBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
