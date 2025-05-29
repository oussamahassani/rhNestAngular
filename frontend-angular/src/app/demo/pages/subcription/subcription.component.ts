import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subcription',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './subcription.component.html',
})
export class SubcriptionComponent implements OnInit {
    constructor(

      private router: Router
    ) {}
  stripe: any | null = null;
  subscriptios: any[] = [
    { id:'1',
      title: 'starter',
      description: 'Best option for personal use & for your next project.',
      price: 99,
      interval: 'month',
      features: [
        'Individual configuration',
        'No setup, or hidden fees',
        'Team size: <span class="font-semibold">1 developer</span>',
        'Premium support: <span class="font-semibold">6 months</span>',
        'Free updates: <span class="font-semibold">6 months</span>',
      ],
    },
    {id:'2',
      title: 'Company',
      description: 'Relevant for multiple users, extended & premium support.',
      price: 499,
      interval: 'month',
      features: [
        'Individual configuration',
        'No setup, or hidden fees',
        'Team size: <span class="font-semibold">10 developer</span>',
        'Premium support: <span class="font-semibold">24 months</span>',
        'Free updates: <span class="font-semibold">24 months</span>',
      ],
    },
    {id:'3',
      title: 'Enterprise',
      description:
        'Best for large scale uses and extended redistribution rights.',
      price: 999,
      interval: 'month',
      features: [
        'Individual configuration',
        'No setup, or hidden fees',
        'Team size: <span class="font-semibold">100+ developer</span>',
        'Premium support: <span class="font-semibold">36 months</span>',
        'Free updates: <span class="font-semibold">36 months</span>',
      ],
    },
  ];

  ngOnInit(): void {
   
  }

  activeSubcription(item: any) {
    console.log(item);
  localStorage.setItem("pack",item.id)
  this.router.navigate(['/auth/signup-2']);

  }


}
