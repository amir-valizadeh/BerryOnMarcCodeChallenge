import { GridReadyEvent } from 'ag-grid-community';

export interface RowData {
  id?: number;
  name: string;
  job: string;
  company: string;
  gender: string;
  salary: string;
  country: string;
}
export interface ActionButtonProps {
  onClick: () => void;
  className: string;
  text: string;
}
export interface DashboardLayoutProps {
  toastMessage: string;
  showToast: boolean;
  onToastClose: () => void;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSync: () => void;
  rowData: RowData[];
  onGridReady: (event: GridReadyEvent) => void;
  onCellValueChanged: (event: { data: RowData }) => void;
}
