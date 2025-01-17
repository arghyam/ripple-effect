
interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }
  
const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-6 rounded-lg z-10">
          <h2 className="text-xl font-bold mb-4">Logout Confirmation</h2>
          <p className="mb-4">Are you sure you want to logout?</p>
          <div className="flex justify-end gap-4">
            <button className="px-4 py-2 bg-gray-300 rounded-lg" onClick={onClose}>Cancel</button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={onConfirm}>Logout</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default LogoutModal;