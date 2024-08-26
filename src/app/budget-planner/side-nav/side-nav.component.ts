import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {

  isSlideOut = false;

  constructor(private router:Router){}

  toggleSlideOut():void{
    this.isSlideOut = !this.isSlideOut;
  }
  
  onDash(){
    this.router.navigate(['/budget-planner/dashboard']);
  }

  onHistory(){
    this.router.navigate(['/budget-planner/history']);

  }

  onProfile(){
    this.router.navigate(['/budget-planner/profile']);

  }

  onLogOut(){
  this.router.navigate(['/budget-planner/login']);
  }
}
