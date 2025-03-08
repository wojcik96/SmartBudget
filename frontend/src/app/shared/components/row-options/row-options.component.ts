import { Component, input, output } from '@angular/core'
import { RowAction, RowActionType } from '../../model/row-action.model'

@Component({
  selector: 'app-row-options',
  standalone: true,
  imports: [],
  templateUrl: './row-options.component.html',
  styleUrl: './row-options.component.scss',
})
export class RowOptionsComponent {
  id = input<string>('');
  rowAction = output<RowAction>()

  protected actionsType = RowActionType

  onClick(type: RowActionType): void {
    this.rowAction.emit({
      id: this.id(),
      type,
    })
  }
}
