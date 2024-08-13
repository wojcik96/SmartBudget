export enum RowActionType {
    Edit = 'edit',
    Delete = 'delete',
  }  

export interface RowAction {
    rowId: number,
    type: RowActionType
}