import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { testingProviders } from '../../../testing/testing-providers';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: testingProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('links WhatsApp to the commercial number', () => {
    const wa = fixture.nativeElement.querySelector('a[href*="wa.me/"]') as HTMLAnchorElement;
    expect(wa).toBeTruthy();
    expect(wa.href).toContain('5575988110732');
  });

  it('lists SaaS products and Finanças News as a case', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Igreja 4.0');
    expect(text).toContain('Gamers League');
    expect(text).toContain('Finanças News');
  });
});
