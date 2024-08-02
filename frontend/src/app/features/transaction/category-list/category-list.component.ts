import { Component } from '@angular/core';
import { CategoryItemComponent } from "./category-item/category-item.component";
import { CategoryItem } from './category-item.model';

interface Expense {
  name: string;
  amount: number;
}

interface Subcategory {
  name: string;
  totalAmount: number;
  expenses: Expense[];
}

interface Category {
  name: string;
  totalAmount: number;
  subcategories: Subcategory[];
}

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CategoryItemComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  public categories: CategoryItem[] = [
    {
      icon: 'bi-plus-circle-dotted',
      label: 'Przychody',
      value: 0,
    },
    {
      icon: 'bi-basket-fill',
      label: 'Zakupy',
      value: 0,
    },
    {
      icon: 'bi-house-fill',
      label: 'Mieszkanie',
      value: 0,
    },
    {
      icon: 'bi-person-fill',
      label: 'Ubezpieczenia',
      value: 0,
    },
    {
      icon: 'bi-car-front-fill',
      label: 'Transport',
      value: 0,
    },
    {
      icon: 'bi-briefcase-fill',
      label: 'Praca',
      value: 0,
    },
    {
      icon: 'bi-heart-fill',
      label: 'Zdrowie',
      value: 0,
    },
    {
      icon: 'bi-people-fill',
      label: 'Rodzina',
      value: 0,
    },
    {
      icon: 'bi-bell-fill',
      label: 'Rozrywka',
      value: 0,
    },
    {
      icon: 'bi-wallet-fill',
      label: 'Oszczędności',
      value: 0,
    },
  ];
  
  // categories: Category[] = [
  //   {
  //     name: 'Kategoria 1',
  //     totalAmount: 300,
  //     subcategories: [
  //       {
  //         name: 'Podkategoria 1.1',
  //         totalAmount: 100,
  //         expenses: [
  //           { name: 'Wydatek 1.1.1', amount: 50 },
  //           { name: 'Wydatek 1.1.2', amount: 50 }
  //         ]
  //       },
  //       {
  //         name: 'Podkategoria 1.2',
  //         totalAmount: 200,
  //         expenses: [
  //           { name: 'Wydatek 1.2.1', amount: 150 },
  //           { name: 'Wydatek 1.2.2', amount: 50 }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Kategoria 2',
  //     totalAmount: 400,
  //     subcategories: [
  //       {
  //         name: 'Podkategoria 2.1',
  //         totalAmount: 200,
  //         expenses: [
  //           { name: 'Wydatek 2.1.1', amount: 100 },
  //           { name: 'Wydatek 2.1.2', amount: 100 }
  //         ]
  //       },
  //       {
  //         name: 'Podkategoria 2.2',
  //         totalAmount: 200,
  //         expenses: [
  //           { name: 'Wydatek 2.2.1', amount: 150 },
  //           { name: 'Wydatek 2.2.2', amount: 50 }
  //         ]
  //       }
  //     ]
  //   }
  // ];

  // selectedCategory: Category | null = null;
}
