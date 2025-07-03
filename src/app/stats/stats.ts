import { Component, Input } from '@angular/core';
import { type STAT } from './stat.model';
import { NgClass } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-stats',
  imports: [NgClass, CurrencyPipe],
  templateUrl: './stats.html',
  styleUrl: './stats.css'
})
export class Stats {

  @Input({required: true}) stat!: STAT;
  
}

