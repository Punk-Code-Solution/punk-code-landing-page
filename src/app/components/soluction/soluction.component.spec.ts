import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoluctionComponent } from './soluction.component';

describe('SoluctionComponent', () => {
  let component: SoluctionComponent;
  let fixture: ComponentFixture<SoluctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoluctionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoluctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
