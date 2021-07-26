
import { Component } from '@angular/core';
import { debug } from 'console';
import { Waiting } from '../model/Waiting';
import { WaitingService } from '../services/waiting.service';
declare var $: any;

@Component({
  selector: 'app-list-waiting',
  templateUrl: './list-waiting.component.html',

})
export class ListWaitingComponent {

  searchValueDate: string = null;
  searchValue: string;
  waitingDetails: Waiting = new Waiting();
  waitingEdit: Waiting = new Waiting();
  waitingInsert: Waiting = new Waiting();
  TotalRows: number;
  massage: string;
  errorMessage: string;
  isMassage: boolean = false;
  isUpdateOrInsert: boolean = false;
  filterMetadata = { count: 0 };
  getUserIdFromUserToken: number = +localStorage.getItem('userToken');


  constructor(private _waitingService: WaitingService) { }

  Waitings: Array<Waiting> = new Array<Waiting>();

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip();

    //For insert
    this.waitingInsert.Id = -1;
    //Get list waiting
    this._waitingService.getWaitingList().subscribe(x => { 
      this.Waitings = x;
    })
  }

  //Displays a pop-up window by clicking on a row in the table with details
  showDetails(wait) {
     this.waitingDetails = wait;
  }

   //Closing a pop-up window by clicking on a row in the table
  closeDetails() {
    debugger;
    this.waitingDetails = new Waiting();
  }
  closeDetailsEdit() {
    debugger;
    this.waitingEdit = new Waiting();
  }

  //Deleting a row in a table, a user can only delete for himself
  deleteWaiting(waiting: Waiting) {
    var ans = confirm("האם ברצונך למחוק את התור בתאריך " + waiting.DateQueue);
    if (ans) {
      this._waitingService.deleteWaiting(waiting.Id).subscribe(res => {
        this.massage = res;
        setTimeout(function () { $(".alertMessage").hide('slow'); }, 2000);
        this.ngOnInit();
      })
    }
  }

  //Displays a pop-up window for editing by clicking Edit in the table
  //In changing it, he will go to a child and display a pop-up window
  showEdit(waiting) {
    this.waitingEdit = waiting; 
  }

  //Save a record update / addition
  EditWaiting(waiting: Waiting) {
    $(".alertMessage").show();
   this. isUpdateOrInsert = true;
    //to update
    if (waiting.Id > 0) {
      this._waitingService.updateWaiting(waiting).subscribe(res => {
        this.massage ="העדכון בוצע בהצלחה";
        setTimeout(function () { $(".alertMessage").hide('slow'); }, 2000);
        this.isMassage = false;
        this.waitingEdit = new Waiting(); 
        this.ngOnInit();
      }, error => {
        this.isMassage = true;
        setTimeout(function () { $(".alertMessage").hide('slow'); }, 2000);
        this.errorMessage = error
      })
    }
    //to insert
    else {
      waiting.UserId = this.getUserIdFromUserToken;

      this._waitingService.InsertWaiting(waiting).subscribe(res => {
        this.massage = "ההוספה בוצעה בהצלחה";
        this.isMassage = false;
        setTimeout(function () { $(".alertMessage").hide('slow'); }, 2000);
        this.waitingEdit = new Waiting();
        this.ngOnInit();
      }, error => {
          this.isMassage = true;
          setTimeout(function () { $(".alertMessage").hide('slow'); }, 2000);
        this.errorMessage = error
      })
    }
   
  }
}
