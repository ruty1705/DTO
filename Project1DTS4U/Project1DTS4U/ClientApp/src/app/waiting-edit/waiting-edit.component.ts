
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Waiting } from '../model/Waiting';
declare var $: any;

@Component({
  selector: 'app-waiting-edit',
  templateUrl: './waiting-edit.component.html',
})
export class WaitingEditComponent {

  @Input() waitingEdit: Waiting;
  @Output() OnCloseEvent = new EventEmitter();
  @Output() OnEditWaitingEvent = new EventEmitter<Waiting>();

  TimeQueue : string;
  DateQueue: string;
  
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
     debugger;

    if (this.waitingEdit.Id > 0) {
      this.TimeQueue = new DatePipe("en-US").transform(this.waitingEdit.DateQueue, 'hh:mm');
      this.DateQueue = new DatePipe("en-US").transform(this.waitingEdit.DateQueue, "yyyy-MM-dd");
      $('#myWaitingModal').modal('show');
    }
    else {
      if (this.waitingEdit.Id == -1) {
        this.TimeQueue = "";
        this.DateQueue = new DatePipe("en-US").transform(Date(), "yyyy-MM-dd");
        $('#myWaitingModal').modal('show');
      }
    }

  
  }

  //close popup
  raiseOnCloseEvent() {
    this.OnCloseEvent.emit();
    $('#myWaitingModal').modal('hide');
  }

  //for save
  raiseOnEditEvent(res: boolean) {
    debugger;
    if (!res) return;
    this.waitingEdit.DateQueue = new Date(this.DateQueue);
    this.waitingEdit.TimeQueue = this.TimeQueue;

    this.OnEditWaitingEvent.emit(this.waitingEdit);
    $('#myWaitingModal').modal('hide');
  }
}




   //var hour = +this.TimeQueue.split(":")[0];
    //var minutes = +this.TimeQueue.split(":")[1];
