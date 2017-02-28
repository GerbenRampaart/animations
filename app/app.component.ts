import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';

@Component({
  selector: 'my-app',
  /*template: `<button 
    [@myTrigger]='state'
    (click)='toggleState()'>
    My Button</button>`,*/
  template: `
    <button [@removeMe]="btnState" (click)='toggleState()'>My Button</button>
    <ul>
      <li *ngFor="let item of items" 
        [@myTrigger]="state" 
        (@myTrigger.start)="animStart($event)"
        (@myTrigger.done)="animDone($event)">
          {{ item }}
      </li>
    </ul>
    {{ animDetails }}
  `,
  styles: [
    `
      ul { 
        list-style-type: none;
        margin: 30px 30px 0 0;
        padding: 0;
      }

      li {
        padding: 15px;
        width: 100%;
        background: #f1f1f1;
        margin-bottom: 2px;
        font-weight: bold;
      }
    `
  ],
  animations: [
    trigger('myTrigger', [
      state('small', style({
        transform: 'scale(1)'
      })),
      state('large', style({
        transform: 'scale(1.4)'
      })),
      state('extra-large', style({
        transform: 'scale(2)'
      })),
      state('fadeIn', style({
        opacity: '1'
      })),
      transition("void => *", [
        animate(500, keyframes([
          style({
            opactiy: 0,
            transform: 'translateY(-30px)',
            offset: 0
          }),
          style({
            opactiy: 1,
            transform: 'translateY(5px)',
            offset: .3
          }),
          style({
            opacity: 1,
            transform: 'translateY(0)',
            offset: 1
          })
        ]))
      ])
      /*transition('void => *', [
        style({
          opacity: '0',
          transform: 'translateY(50px)'
        }), 
        animate('500ms 0s ease-out')
      ]),
      transition('small => large',
        animate('500ms')
      ),
      transition('large => small',
        animate('500ms')
      ),
      transition(
        'small => large, large => small',
        animate('500ms')),
      transition(
        'small <=> large',
        animate('500ms'))
      transition(
        '* => small',
        animate('500ms'))*/
    ]),
    trigger('removeMe', [
      state('out', style({
        transform: 'scale(0)',
        opactity: 0
      })),
      transition('* => out', [
        animate('500ms 0s ease-in', keyframes([
          style({
            opacity: 1,
            transform: 'translateX(-8px)',
            offset: 0
          }),
          style({
            opacity: 1,
            transform: 'translateX(0)',
            offset: 0.3
          }),
          style({
            opacity: 1,
            transform: 'translateX(50px)',
            offset: 1
          })


        ]))
      ])
    ])
  ]
})
export class AppComponent  { 
  state: string = 'fadeIn'; 
  items: Array<string> = new Array();
  animDetails: string = '';
  btnState: string = 'in';

  animStart($event: any) {
    this.animDetails = '';
    console.log($event);
  }

  animDone($event: any) {
    console.log($event);
    this.animDetails = "It took me " + $event.totalTime + 'ms to complete';
  }

  toggleState() {
    this.items.push('another item');
    this.state = "fadeIn";
    this.btnState = 'out';
    //this.state = (this.state === 'small') ? 'large' : 'small';
  }
}
