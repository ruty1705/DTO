
import { Pipe, PipeTransform } from '@angular/core';
import { debug } from 'console';
import { Waiting } from '../model/Waiting';
import { DatePipe } from '@angular/common'

@Pipe({
  name: 'WaitingFilter'
})
export class WaitingFilterPipe implements PipeTransform {


  transform(waitings: Waiting[], searchValue: string, searchValueDate: Date, filterMetadata: any): Waiting[] {

    let isFull = false;
    let filteredWaitings: Waiting[] = new Array<Waiting>();

    //Filter by customer name
    if (waitings && searchValue && waitings.length > 0 && searchValue.length > 0) {
      isFull = true;
      waitings.forEach(wait => {
        if (wait.Name.toLowerCase().includes(searchValue.toLowerCase()))
          filteredWaitings.push(wait);
      });
    }

    //Filter by date
    if (waitings && searchValueDate && waitings.length > 0 && searchValueDate != null) {
      isFull = true;
      waitings.forEach(wait => {
        let _date = new DatePipe("en-US").transform(wait.DateQueue, 'yyyy-MM-dd');
        if (_date == searchValueDate.toString())
          filteredWaitings.push(wait);
      });
    }

    if (isFull == true) {
      filterMetadata.count = filteredWaitings.length;
      return filteredWaitings;
    }
    else {
      filterMetadata.count = waitings.length;
      return waitings;
  }
}
}

