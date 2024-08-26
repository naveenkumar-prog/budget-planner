import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule,SideNavComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  lastMonthsIncome = ['January: 10000', 'February: 13000', 'March: 12000'];
  currentMonthIncome = '20000';

  lastMonthsExpense = ['January: 6000', 'February: 7000', 'March: 7500'];
  currentMonthExpense = '8000';

  totalCurrentMonthIncome = 20000;
  totalCurrentMonthExpense = 8000;
  currentMonthSavings = this.totalCurrentMonthIncome - this.totalCurrentMonthExpense;

  todoTransactions= [
    {description: 'Pay Electricity Bill'},
    {description: 'Submit Monthly Report'},
    {description: 'Buy Groceries'},
    {description: 'Call Insurance Company'},

  ]
  
  constructor(public router:Router){
  }

  onIncome(){
    this.router.navigate(['/budget-planner/income']);
  }

  onExpense(){
    this.router.navigate(['/budget-planner/expense']);
  }

  onTodo(){
    this.router.navigate(['/budget-planner/todo']);
  }
}
