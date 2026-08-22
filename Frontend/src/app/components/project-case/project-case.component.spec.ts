import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCaseComponent } from './project-case.component';

describe('ProjectCaseComponent', () => {
  let component: ProjectCaseComponent;
  let fixture: ComponentFixture<ProjectCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows Finanças News as a case with outcomes', () => {
    const root = fixture.nativeElement as HTMLElement;
    expect(root.textContent).toContain('Finanças News');
    expect(root.querySelectorAll('ul li').length).toBeGreaterThanOrEqual(3);
    expect(root.querySelector('a.btn-outline')?.getAttribute('href')).toContain('wa.me/');
  });
});
