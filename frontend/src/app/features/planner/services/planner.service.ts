import { Injectable } from '@angular/core'
import { StatusOption } from '../../../shared/model/status-type.model'

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  setStatus(difference: number) {
    return difference >= 0
      ? { type: StatusOption.SUCCESS, label: 'Below Budget' }
      : { type: StatusOption.ERROR, label: 'Over Budget' }
  }

  countDifference(a: number, b: number) {
    return Number((a + b).toFixed(2))
  }
}
