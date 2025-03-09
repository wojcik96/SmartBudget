export enum RowActionType {
    Edit = 'edit',
    Delete = 'delete',
  }  

export interface RowAction {
    id: string,
    type: RowActionType
}