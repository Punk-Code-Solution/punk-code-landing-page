import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponsiveMenuButtonComponent } from './responsive-menu-button.component';
import { testingProviders } from '../../../testing/testing-providers';

describe('ResponsiveMenuButtonComponent', () => {
  let component: ResponsiveMenuButtonComponent;
  let fixture: ComponentFixture<ResponsiveMenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsiveMenuButtonComponent],
      providers: testingProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(ResponsiveMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
