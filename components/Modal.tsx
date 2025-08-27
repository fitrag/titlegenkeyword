import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    const { t } = useI18n();
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            modalRef.current?.focus();
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div
                ref={modalRef}
                className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl m-4 animate-fade-in"
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 id="modal-title" className="text-lg font-semibold text-gray-900">{title}</h2>
                    <button 
                        onClick={onClose} 
                        className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
                        aria-label={t('modal.close')}
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};