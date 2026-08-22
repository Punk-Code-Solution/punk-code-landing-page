import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { PageContactComponent } from './page-contact.component';
import { testingProviders } from '../../../testing/testing-providers';
import { INTEREST_OPTIONS } from '../../data/services-offer';

describe('PageContactComponent', () => {
  let component: PageContactComponent;
  let fixture: ComponentFixture<PageContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageContactComponent],
      providers: [...testingProviders, provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(PageContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the updated commercial phone', () => {
    expect(fixture.nativeElement.textContent).toContain('(75) 9 8811-0732');
  });

  it('aligns interest select with shared options', () => {
    const options = fixture.nativeElement.querySelectorAll('select option') as NodeListOf<HTMLOptionElement>;
    const values = Array.from(options)
      .map(o => o.value)
      .filter(Boolean);
    for (const option of INTEREST_OPTIONS) {
      expect(values).toContain(option.value);
    }
    expect(values).not.toContain('financas-news' as string);
  });
});
