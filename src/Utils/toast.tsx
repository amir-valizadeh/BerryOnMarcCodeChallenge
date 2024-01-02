import { useEffect } from 'react';

interface ToastProps {
  text: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  text,
  isVisible,
  onClose,
}: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 1700);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 z-50 bg-blue-500 border border-blue-400 text-white px-4 py-3 rounded"
      role="alert"
    >
      <span className="block sm:inline">{text}</span>
    </div>
  );
};

export default Toast;
