import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProofPointsComponent } from './proof-points.component';
import { PROOF_POINTS } from '../../data/services-offer';

describe('ProofPointsComponent', () => {
  let component: ProofPointsComponent;
  let fixture: ComponentFixture<ProofPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProofPointsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProofPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders all proof points', () => {
    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(PROOF_POINTS.length);
    expect(items[0].textContent).toContain(PROOF_POINTS[0]);
  });
});
