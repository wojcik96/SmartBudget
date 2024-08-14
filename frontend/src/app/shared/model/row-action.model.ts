export enum RowActionType {
    Edit = 'edit',
    Delete = 'delete',
  }  

export interface RowAction {
    rowId: string,
    type: RowActionType
}