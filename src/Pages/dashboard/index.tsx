import { useState, useEffect, useCallback } from 'react';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { URL } from '../../Utils/base';
import { RowData } from '../../Types/landing.ts';
import DashboardLayout from './dashboardLaout.tsx';

const Dashboard = () => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [gridApi, setGridApi] = useState<GridApi>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [changedRows, setChangedRows] = useState<RowData[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}info`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setRowData(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);
  }, []);
  const onCellValueChanged = useCallback(
    ({ data }: { data: RowData }) => {
      setChangedRows(currentChangedRows => {
        const existingRow = currentChangedRows.find(row => row.id === data.id);
        l(existingRow, 'existingRow');
        if (existingRow) {
          return currentChangedRows.map(row =>
            row.id === data.id ? data : row
          );
        } else {
          return [...currentChangedRows, data];
        }
      });
    },
    [changedRows]
  );
  const handleAddItem = useCallback(() => {
    const newItem: RowData = {
      name: 'New Item',
      job: '',
      company: '',
      gender: '',
      salary: '',
      country: '',
      id: Date.now(), // Use a unique identifier for the new row
    };
    setRowData([newItem, ...rowData]);
    setChangedRows(currentChangedRows => [newItem, ...currentChangedRows]);
  }, [rowData]);

  const handleEditItem = () => {
    setToastMessage('  Just click on any cell and edit! Then press Enter.');
    setShowToast(true);
  };

  const handleDeleteItem = async () => {
    if (!gridApi) return;

    const selectedNodes = gridApi.getSelectedNodes();
    if (selectedNodes.length === 0) {
      setToastMessage('No row selected');
      setShowToast(true);
      return;
    }

    const selectedRow = selectedNodes[0].data;
    try {
      const response = await fetch(`${URL}info/${selectedRow.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete row with ID ${selectedRow.id}`);
      }

      setRowData(rowData.filter(row => row.id !== selectedRow.id));
      setToastMessage(`Row with ID ${selectedRow.id} deleted successfully`);
      setShowToast(true);
    } catch (error) {
      console.error('Delete error:', error);
      setToastMessage('Error deleting data');
      setShowToast(true);
    }
  };

  const syncToServer = async () => {
    if (changedRows.length === 0) {
      setToastMessage('No changes to sync');
      setShowToast(true);
      return;
    }

    try {
      for (const row of changedRows) {
        const response = await fetch(URL + 'info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(row), // Send individual row object
        });

        if (!response.ok) {
          throw new Error('Network response was not ok for one of the rows');
        }
      }

      setToastMessage('Data synced successfully');
      setShowToast(true);
      setChangedRows([]); // Clear the changed rows after successful sync
    } catch (error) {
      console.error('Sync error:', error);
      setToastMessage('Error syncing data');
      setShowToast(true);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <DashboardLayout
      toastMessage={toastMessage}
      showToast={showToast}
      onToastClose={() => setShowToast(false)}
      onAdd={handleAddItem}
      onEdit={handleEditItem}
      onDelete={handleDeleteItem}
      onSync={syncToServer}
      rowData={rowData}
      onGridReady={onGridReady}
      onCellValueChanged={onCellValueChanged}
    />
  );
};

export default Dashboard;
