import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';


@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,SideNavComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  transactionForm : any;
  selectedMonth:any;

  januaryTransaction:any = [
    {transaction:'Recharge', amount:1000},
    {transaction:'Light Bills', amount:500},    
  ]

  februaryTransaction:any = [
    {transaction:'Recharge', amount:500},
    {transaction:'Wifi', amount:700},    
  ]

  marchTransaction:any = [
    {transaction:'Recharge', amount:500},
    {transaction:'Light Bills', amount:200},    
    {transaction:'Wifi', amount:600}
  ]

  monthSelected:boolean = false;

  constructor(public fb:FormBuilder, private router:Router){
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', {month: 'long'});
  }

  ngOnInit() : void{
    this.transactionForm = this.fb.group({
      month: ['',Validators.required],
      transaction: ['',Validators.required],
      amount: ['',Validators.required],
    })
  }


  onSubmit(){
    if(this.transactionForm.valid){
      const newTransaction = this.transactionForm.value;
      switch(this.selectedMonth){
        case 'January':
          this.januaryTransaction.push(newTransaction);
          break;
        case 'February':
            this.februaryTransaction.push(newTransaction);
            break;
        case 'March':
          this.marchTransaction.push(newTransaction);
          break;
        default:
          break;
      }
      this.transactionForm.reset();
      this.transactionForm.patchValue({ month: '', transaction: ''});
    }
  }

  onChange(event:any){
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getTransaction();
  }

  getTransaction(){
    let transaction: any[] =[];
    switch(this.selectedMonth){
      case 'January':
        transaction = [...this.januaryTransaction];
        break;
      case 'February':
        transaction = [...this.februaryTransaction];
        break;
      case 'March':
        transaction = [...this.marchTransaction];
        break;
      default:
        break;
    }
    return transaction;
    }

    calculateTotalTransaction(month:string){
      let totalTransaction = 0;
      for(const transaction of this.getTransactionForMonth(month)){
        totalTransaction += transaction.amount;
      }
      return totalTransaction;
    }
    getTransactionForMonth(month:string){
      switch(month){
        case 'January':
          return this.januaryTransaction;
        case 'February':
          return this.februaryTransaction;
        case 'March':
          return this.marchTransaction;
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