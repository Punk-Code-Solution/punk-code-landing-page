import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaqComponent } from './faq.component';

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('keeps Finanças News FAQ clarifying it is not for sale', () => {
    const item = component.faqs.find(f => f.question.includes('Finanças News'));
    expect(item).toBeTruthy();
    expect(item?.answer.toLowerCase()).toContain('não');
  });

  it('toggles a single open FAQ at a time', () => {
    component.toggle(2);
    expect(component.faqs[2].open).toBeTrue();
    expect(component.faqs.filter(f => f.open).length).toBe(1);
  });
});
