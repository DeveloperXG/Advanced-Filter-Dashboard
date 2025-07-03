import { Component, Input } from '@angular/core';
import { type PROJECT } from './project.model';
import { FormsModule } from '@angular/forms'; //Used for [NgModel]="searchText" in filter template
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-project',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Project {

    @Input({required: true}) project !: PROJECT;

}
