import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent {
  expenseForm : any;
  selectedMonth:any;

  januaryExpense:any = [
    {type:'Rent', amount:1000},
    {type:'Groceries', amount:500},    
  ]

  februaryExpense:any = [
    {type:'Rent', amount:500},
    {type:'Utilities', amount:700},    
  ]

  marchExpense:any = [
    {type:'Rent', amount:500},
    {type:'Groceries', amount:200},    
    {type:'Utilities', amount:600}
  ]

  monthSelected:boolean = false;

  constructor(public fb:FormBuilder, private router:Router){
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', {month: 'long'});
  }

  ngOnInit() : void{
    this.expenseForm = this.fb.group({
      month: ['',Validators.required],
      type: ['',Validators.required],
      amount: ['',Validators.required],
    })
  }


  onSubmit(){
    if(this.expenseForm.valid){
      const newExpense = this.expenseForm.value;
      switch(this.selectedMonth){
        case 'January':
          this.januaryExpense.push(newExpense);
          break;
        case 'February':
            this.februaryExpense.push(newExpense);
            break;
        case 'March':
          this.marchExpense.push(newExpense);
          break;
        default:
          break;
      }
      this.expenseForm.reset();
      this.expenseForm.patchValue({ month: '', type: ''});
    }
  }

  onChange(event:any){
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilterExpense();
  }

  getFilterExpense(){
    let filteredExpense: any[] =[];
    switch(this.selectedMonth){
      case 'January':
        filteredExpense = [...this.januaryExpense];
        break;
      case 'February':
        filteredExpense = [...this.februaryExpense];
        break;
      case 'March':
        filteredExpense = [...this.marchExpense];
        break;
      default:
        break;
    }
    return filteredExpense;
    }

    calculateTotalExpense(month:string){
      let totalExpense = 0;
      for(const expense of this.getExpenseForMonth(month)){
        totalExpense += expense.amount;
      }
      return totalExpense;
    }
    getExpenseForMonth(month:string){
      switch(month){
        case 'January':
          return this.januaryExpense;
        case 'February':
          return this.februaryExpense;
        case 'March':
          return this.marchExpense;
        default:
          return [];
      }
    }

    saveForm(){
      console.log("Form Saved!");
    }

    onBack(){
      this.router.navigate(['/budget-planner/dashboard']);
    }
}