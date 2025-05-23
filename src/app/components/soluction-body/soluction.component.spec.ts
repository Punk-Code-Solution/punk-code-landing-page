import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoluctionComponentBody } from './soluction.component';

describe('SoluctionComponent', () => {
  let component: SoluctionComponentBody;
  let fixture: ComponentFixture<SoluctionComponentBody>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoluctionComponentBody]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoluctionComponentBody);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
