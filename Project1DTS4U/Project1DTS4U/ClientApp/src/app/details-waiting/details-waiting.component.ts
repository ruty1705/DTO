import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output, OnChanges } from '@angular/core';
import { Waiting } from '../model/Waiting';

declare var $: any;

@Component({
  selector: 'app-details-waiting',
  templateUrl: './details-waiting.component.html',
})
export class DetailsWaitingComponent implements OnInit, OnChanges {

  @Input() waiting2show: Waiting;
  @Output() OnCloseEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    debugger;
    if (this.waiting2show.Id > 0) {
      $('#myWaitingDetailsModal').modal('show');
    }
  }

  raiseOnCloseEvent() {
    this.OnCloseEvent.emit();
    $('#myWaitingDetailsModal').modal('hide');
  }

}
