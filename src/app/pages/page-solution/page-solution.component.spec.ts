import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSolutionComponent } from './page-solution.component';

describe('PageSolutionComponent', () => {
  let component: PageSolutionComponent;
  let fixture: ComponentFixture<PageSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSolutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
