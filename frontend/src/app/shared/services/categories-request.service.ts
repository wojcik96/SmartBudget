import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Category } from '../../features/transaction/category-list/model/category.model'

@Injectable({
  providedIn: 'root',
})
export class CategoriesRequestService {
  private http = inject(HttpClient)

  public getCategoriesList(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/categories/getCategoriesList')
  }

  public getCategoriesWithExpenses(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/categories/getCategoriesWithExpanses')
  }
}
