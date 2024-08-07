export interface ColumnConfig {
    label: string;
    key: string;
    width: string;
  }

export interface TableConfig {
    columns: ColumnConfig[];
    data: { [key: string]: any }[];
  }