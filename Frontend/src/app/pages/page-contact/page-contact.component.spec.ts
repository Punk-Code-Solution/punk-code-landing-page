import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { PageContactComponent } from './page-contact.component';
import { testingProviders } from '../../../testing/testing-providers';

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
});
