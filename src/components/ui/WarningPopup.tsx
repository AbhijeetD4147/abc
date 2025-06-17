import React from 'react';
import WarningLogo from '/warning-logo.png';

interface WarningPopupProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    confirmColor?: string;
    cancelColor?: string;
}

const WarningPopup: React.FC<WarningPopupProps> = ({
    message,
    onConfirm,
    onCancel,
    confirmText = 'Yes',
    cancelText = 'No',
    confirmColor = 'bg-blue-500 text-white',
    cancelColor = 'bg-gray-500 text-white',
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Dimmed background */}
            <div className="absolute inset-0 bg-black opacity-70"></div>

            {/* Popup content */}
            <div className="relative bg-white p-6 py-8 rounded-lg shadow-lg flex z-10">
                <div className="flex items-center justify-center pr-6">
                    <img src={WarningLogo} alt="Warning" className="w-24 h-24" />
                </div>
                <div className="flex flex-col items-center px-2">
                    <p className="text-lg mb-6 text-center max-w-xs">{message}</p>
                    <div className="flex space-x-8">
                        <button
                            className={`px-8 py-2 rounded ${confirmColor}`}
                            onClick={onConfirm}
                        >
                            {confirmText}
                        </button>
                        <button
                            className={`px-8 py-2 rounded ${cancelColor}`}
                            onClick={onCancel}
                        >
                            {cancelText}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default WarningPopup;
