import { Component,Input, Output, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms'; //Used for [NgModel]="searchText" in filter template

@Component({
  selector: 'app-filter',
  imports: [FormsModule],
  templateUrl: './filter.html',
  styleUrl: './filter.css'
})
export class Filter {

  @Input({required:true}) results !: number;
  
  @Output() optionSelected = new EventEmitter<string>();
  @Output() searchChanged = new EventEmitter<string>();
  @Output() dateRangeChanged = new EventEmitter<{fromDate: string, toDate: string}>();


  searchText = '';
  selectedOption !: string;

  fromDate = '';
  toDate = '';
  

  onCategoryChange(event: Event){
    this.selectedOption = (event.target as HTMLSelectElement).value;
    this.optionSelected.emit(this.selectedOption); //emit to parent
  }

  onSearchChange() {
    this.searchChanged.emit(this.searchText);
  }

  onDateChange() {
    this.dateRangeChanged.emit({
      fromDate: this.fromDate,
      toDate: this.toDate
    });
  }

}
