import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { RowData } from '../../Types/landing.ts';

interface GridComponentProps {
  rowData: RowData[];
  // eslint-disable-next-line no-unused-vars
  onGridReady: (event: GridReadyEvent) => void;
  // eslint-disable-next-line no-unused-vars
  onCellValueChanged: (event: { data: RowData }) => void;
}

const GridComponent: React.FC<GridComponentProps> = ({
  rowData,
  onGridReady,
  onCellValueChanged,
}: GridComponentProps) => {
  const columns: ColDef[] = [
    { headerName: 'Name', field: 'name', editable: true },
    { headerName: 'Job', field: 'job', editable: true },
    { headerName: 'Company', field: 'company', editable: true },
    { headerName: 'Gender', field: 'gender', editable: true },
    { headerName: 'Salary', field: 'salary', editable: true },
    { headerName: 'Country', field: 'country', editable: true },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columns}
        domLayout="autoHeight"
        animateRows={true}
        onGridReady={onGridReady}
        rowSelection="single"
        pagination={true}
        paginationPageSize={20}
        onCellValueChanged={onCellValueChanged}
      ></AgGridReact>
    </div>
  );
};

export default GridComponent;
