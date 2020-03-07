/* import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderComponent } from './reminder.component';

describe('ReminderComponent', () => {
  let component: ReminderComponent;
  let fixture: ComponentFixture<ReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 */
import { ReminderComponent } from "./reminder.component";
 describe('ReminderComponent', () =>{
   let component: ReminderComponent;

   beforeEach(()=>{
    component = new ReminderComponent(null,null);
   });

   it ('It must returns a 30 max character string', () =>{
     
    expect (component.reminder.City.length).toBeLessThanOrEqual(30);
    
   });
 });