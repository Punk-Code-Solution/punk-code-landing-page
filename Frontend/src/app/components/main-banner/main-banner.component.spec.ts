import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainBannerComponent } from './main-banner.component';

describe('MainBannerComponent', () => {
  let component: MainBannerComponent;
  let fixture: ComponentFixture<MainBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows brand signal and dual CTAs', () => {
    const root = fixture.nativeElement as HTMLElement;
    expect(root.textContent).toContain('Punk Code Solution');
    expect(root.querySelector('a[href="#servicos"]')?.textContent).toContain('Contratar');
    expect(root.querySelector('a[href="#produtos"]')?.textContent).toContain('produtos');
  });

  it('marks hero as ready after animation frame', done => {
    requestAnimationFrame(() => {
      expect(component.ready).toBeTrue();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.hero-ready')).toBeTruthy();
      done();
    });
  });
});
