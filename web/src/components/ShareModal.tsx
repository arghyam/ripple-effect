import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  onCopy: () => void;
  chartImage: string;
  craftedMessage: string;
}

const ShareModal2: React.FC<ShareModalProps> = ({
  isModalOpen,
  onClose,
  onCopy,
  chartImage,
  craftedMessage
}) => {
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
          >
            <h2 className="text-xl font-bold mb-4">Share Your Progress</h2>
            {chartImage && (
              <img
                src={chartImage}
                alt="Water Footprint Chart"
                className="mb-4 rounded-lg w-full"
              />
            )}
            <p className="mb-4 text-gray-600 text-center">{craftedMessage}</p>
            <div className="flex gap-4">
              <button
                onClick={onCopy}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
              >
                Copy Link
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal2;