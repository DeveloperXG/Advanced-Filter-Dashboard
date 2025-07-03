import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Header } from './header/header';
import { Project } from './projects/projects';
import { Stats } from './stats/stats';
import { DUMMY_STATS } from './dummy-stats';
import { DUMMY_PROJECTS } from './dummy-projects';
import { Filter } from './filter/filter';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [Header, Stats, CommonModule, Filter, Project, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'threndx-angular-project';
  statistics = DUMMY_STATS;
  projects = DUMMY_PROJECTS;

  selectedCategory!: string;
  
  searchTerm = '';
  fromDate = '';
  toDate = '';


  //Initialize the population of the data
  ngOnInit() {
    this.populate_stats();
  }

  // So far, returns 
  get filteredProjects() {
    return this.projects.filter(project => {
      const matchesCategory = !this.selectedCategory || project.category === this.selectedCategory;
      const matchesSearch = !this.searchTerm || project.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDateRange = this.matchesDateRange(project.date);
      return matchesCategory && matchesSearch && matchesDateRange;
    });
}


  get filteredProjectCount() {
  return this.filteredProjects.length;
}

  onCategoryChange(category: string){
    this.selectedCategory = category;
    this.populate_stats(); //Dynamically populate stats upon change in category
  }

  onSearchChange(search: string) {
    this.searchTerm = search;
    this.populate_stats(); //Dynamically populate stats upon change in search
  }

  onDateRangeChange(dateRange: {fromDate: string, toDate: string}) {
    this.fromDate = dateRange.fromDate;
    this.toDate = dateRange.toDate;
    this.populate_stats();
  }

  private matchesDateRange(projectDate: string): boolean {
    // If no date filters are set, return true

    if (!this.fromDate && !this.toDate) {
      return true;
    }

    //Convert project date to comparabale format
    const projectDateObj = this.parseProjectDate(projectDate);
    if (!projectDateObj) {
      return false; // If we cannot parse the date, exclude it
    }

    //Check from date
    if (this.fromDate) {
      const fromDateObj = new Date(this.fromDate);
      if (projectDateObj < fromDateObj) {
        return false;
      }
    }

    //Check to date
    if (this.toDate) {
      const toDateObj = new Date(this.toDate);
      if (projectDateObj > toDateObj) {
        return false;
      }
    }

    return true;
  }

  private parseProjectDate(dateString: string): Date | null {
    // Handle different date formats that might be in your project data
    // Example formats: "Dec 15, 2024", "12/15/2024", "2024-12-15"
    
    try {
      // Try parsing as-is first
      let parsedDate = new Date(dateString);
      
      // If that doesn't work, try common formats
      if (isNaN(parsedDate.getTime())) {
        // Handle "MMM dd, yyyy" format (e.g., "Dec 15, 2024")
        const monthNames = {
          'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
          'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
          'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
        };
        
        const match = dateString.match(/(\w{3})\s+(\d{1,2}),\s+(\d{4})/); //Regex match 
        if (match) {
          console.log(match);
          const [, month, day, year] = match;
          const monthNum = monthNames[month as keyof typeof monthNames];
          if (monthNum) {
            parsedDate = new Date(`${year}-${monthNum}-${day.padStart(2, '0')}`);
          }
        }
      }
      
      return isNaN(parsedDate.getTime()) ? null : parsedDate;
    } catch (error) {
      return null;
    }
  }


  populate_stats(){
    // Initialize everything to 0
    let total_value = 0;
    let completed = 0;
    let pending = 0;
    let active = 0;

    // Retrieve amount of each statistic and also results
    for (const project of this.filteredProjects) {
    total_value += project.value;

    if (project.status === 'active') active++;
    else if (project.status === 'completed') completed++;
    else pending++;
  }

    for (const stats of this.statistics) {
      if (stats.id === 's1') stats.amount = total_value;
      else if (stats.id === 's2') stats.amount = active;
      else if (stats.id === 's3') stats.amount = completed;
      else if (stats.id === 's4') stats.amount = pending;
    }
  } 

  
}
