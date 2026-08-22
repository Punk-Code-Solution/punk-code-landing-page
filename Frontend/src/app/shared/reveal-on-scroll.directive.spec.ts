import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RevealOnScrollDirective } from './reveal-on-scroll.directive';

@Component({
  standalone: true,
  imports: [RevealOnScrollDirective],
  template: `<div revealOnScroll [revealDelay]="delay">conteúdo</div>`,
})
class HostComponent {
  delay = '0.1s';
}

describe('RevealOnScrollDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('adds reveal class and delay CSS variable on the host element', () => {
    const el = fixture.nativeElement.querySelector('div') as HTMLElement;
    expect(el.classList.contains('reveal')).toBeTrue();
    expect(el.style.getPropertyValue('--reveal-delay')).toBe('0.1s');
  });
});
