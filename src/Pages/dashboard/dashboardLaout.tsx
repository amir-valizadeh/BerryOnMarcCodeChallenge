import ActionButton from '../../Components/atoms/actionButton.tsx';
import GridComponent from '../../Components/atoms/GridComponent.tsx';
import Toast from '../../Utils/toast.tsx';
import { DashboardLayoutProps } from '../../Types/landing.ts';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  toastMessage,
  showToast,
  onToastClose,
  onAdd,
  onEdit,
  onDelete,
  onSync,
  rowData,
  onGridReady,
  onCellValueChanged,
}: DashboardLayoutProps) => (
  <div className="container mx-auto my-8 p-4">
    <Toast text={toastMessage} isVisible={showToast} onClose={onToastClose} />

    <h1 className="text-2xl font-bold text-center mb-4">Employee Dashboard</h1>

    <div className="flex justify-end mb-2 relative">
      <ActionButton
        onClick={onSync}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-auto"
        text="Sync to Server"
      />
      <ActionButton
        onClick={onAdd}
        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        text="Add New"
      />
      <ActionButton
        onClick={onEdit}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        text="Edit"
      />
      <ActionButton
        onClick={onDelete}
        className="bg-red-500 text-white px-4 py-2 rounded"
        text="Delete"
      />
    </div>

    <GridComponent
      rowData={rowData}
      onGridReady={onGridReady}
      onCellValueChanged={onCellValueChanged}
    />
  </div>
);

export default DashboardLayout;
