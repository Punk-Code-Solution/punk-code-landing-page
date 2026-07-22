import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output, signal } from '@angular/core';

@Component({
    selector: 'responsive-menu-button',
    host: {
        "(click)": "menu_button_click()",
        "[class]": "menu_button_class()"
    },
    imports: [],
    templateUrl: './responsive-menu-button.component.html',
    styleUrl: './responsive-menu-button.component.css',
    animations: [
        trigger('animationDiv1', [
            state('begin', style({
                top: '0%',
                left: '0%',
                transform: 'translate(0%, 0%) rotate(0deg)'
            })),
            state('end', style({
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(-45deg)'
            })),
            transition('begin <=> end', animate('300ms linear'))
        ]),
        trigger('animationDiv3', [
            state('begin', style({
                bottom: '0%',
                right: '0%',
                transform: 'translate(0%, 0%) rotate(0deg)'
            })),
            state('end', style({
                bottom: '50%',
                right: '50%',
                transform: 'translate(50%, 50%) rotate(45deg)'
            })),
            transition('begin <=> end', animate('300ms linear'))
        ])
    ]
})
export class ResponsiveMenuButtonComponent {
  @Output() onClickEvent = new EventEmitter<string>();

  animationState = 'begin';
  position = signal('initial');
  menu_button_class = signal('');

  menu_button_click() {
    if (this.animationState === 'begin') {
      this.animationState = 'end';
    } else {
      this.animationState = 'begin';
    }

    if (this.menu_button_class() === 'close-button') {
      this.menu_button_class.set('menu-button');
      this.onClickEvent.emit('menu');
    } else {
      this.menu_button_class.set('close-button');
      this.onClickEvent.emit('close');
    }
  }

  animationStart() {
    this.position.set('absolute');
  }

  animationDone() {
    if (this.animationState === 'begin') {
      this.position.set('initial');
    } else {
      this.position.set('absolute');
    }
  }
}
