import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomServicesComponent } from './custom-services.component';

describe('CustomServicesComponent', () => {
  let component: CustomServicesComponent;
  let fixture: ComponentFixture<CustomServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomServicesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders service offers and process steps', () => {
    expect(fixture.nativeElement.querySelectorAll('.offers article').length).toBe(3);
    expect(fixture.nativeElement.querySelectorAll('.process li').length).toBe(4);
  });

  it('links specialist and audit CTAs to WhatsApp', () => {
    expect(component.specialistHref).toContain('wa.me/5575988110732');
    expect(component.auditHref).toContain('wa.me/5575988110732');
  });
});
