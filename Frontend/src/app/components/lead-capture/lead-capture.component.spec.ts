import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LeadCaptureComponent } from './lead-capture.component';
import Swal from 'sweetalert2';

describe('LeadCaptureComponent', () => {
  let component: LeadCaptureComponent;
  let fixture: ComponentFixture<LeadCaptureComponent>;
  let swalSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadCaptureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeadCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    swalSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({} as never));
  });

  afterEach(() => {
    (globalThis.fetch as jasmine.Spy | undefined)?.and?.stub?.();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('exposes interest options without Finanças News', () => {
    const values = component.interestOptions.map(o => o.value) as string[];
    expect(values).not.toContain('financas-news');
    expect(values).toContain('app-pronto');
  });

  it('blocks submit when required fields are missing', () => {
    component.enviarProposta();
    expect(swalSpy).toHaveBeenCalled();
    const args = swalSpy.calls.mostRecent().args[0] as { icon: string; text: string };
    expect(args.icon).toBe('error');
    expect(args.text).toContain('Nome');
  });

  it('posts lead payload and clears the form on success', fakeAsync(() => {
    component.nome = 'Ana';
    component.email = 'ana@empresa.com';
    component.telefone = '75988110732';
    component.servico = 'igreja-40';
    component.mensagem = 'Quero demo';

    spyOn(globalThis, 'fetch').and.returnValue(
      Promise.resolve(new Response(null, { status: 200 }))
    );

    component.enviarProposta();
    tick();

    expect(globalThis.fetch).toHaveBeenCalled();
    expect(component.nome).toBe('');
    expect(component.email).toBe('');
    expect(swalSpy).toHaveBeenCalled();
    const args = swalSpy.calls.mostRecent().args[0] as { icon: string };
    expect(args.icon).toBe('success');
  }));
});
