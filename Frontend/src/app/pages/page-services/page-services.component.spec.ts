import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageServicesComponent } from './page-services.component';
import { testingProviders } from '../../../testing/testing-providers';

describe('PageServicesComponent', () => {
  let component: PageServicesComponent;
  let fixture: ComponentFixture<PageServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageServicesComponent],
      providers: testingProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(PageServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
