import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PageHomeComponent } from './page-home.component';
import { testingProviders } from '../../../testing/testing-providers';

describe('PageHomeComponent', () => {
  let component: PageHomeComponent;
  let fixture: ComponentFixture<PageHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHomeComponent],
      providers: testingProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(PageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('composes the conversion funnel sections', () => {
    const root = fixture.debugElement;
    expect(root.query(By.css('main-banner'))).toBeTruthy();
    expect(root.query(By.css('proof-points'))).toBeTruthy();
    expect(root.query(By.css('saas-section'))).toBeTruthy();
    expect(root.query(By.css('project-case'))).toBeTruthy();
    expect(root.query(By.css('custom-services'))).toBeTruthy();
    expect(root.query(By.css('lead-capture'))).toBeTruthy();
    expect(root.query(By.css('app-faq'))).toBeTruthy();
    expect(root.query(By.css('app-footer'))).toBeTruthy();
  });
});
