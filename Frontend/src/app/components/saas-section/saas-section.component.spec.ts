import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaasSectionComponent } from './saas-section.component';
import { SAAS_PRODUCTS } from '../../data/products';

describe('SaasSectionComponent', () => {
  let component: SaasSectionComponent;
  let fixture: ComponentFixture<SaasSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaasSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SaasSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a showcase card for each SaaS product', () => {
    const cards = fixture.nativeElement.querySelectorAll('.card');
    expect(cards.length).toBe(SAAS_PRODUCTS.length);
  });

  it('renders feature lists for each product detail', () => {
    const featureLists = Array.from(
      fixture.nativeElement.querySelectorAll('ul.features') as NodeListOf<HTMLUListElement>
    );
    expect(featureLists.length).toBe(SAAS_PRODUCTS.length);
    for (const list of featureLists) {
      expect(list.querySelectorAll('li').length).toBeGreaterThanOrEqual(5);
    }
  });

  it('does not render a pricing plans block', () => {
    expect(fixture.nativeElement.querySelector('.pricing')).toBeNull();
    expect(fixture.nativeElement.querySelector('.plans')).toBeNull();
  });
});
