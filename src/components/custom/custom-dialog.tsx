import {useEffect, useCallback, ReactNode, useRef, MouseEvent} from "react";
import {X} from "lucide-react";
import {cn} from "@/lib/utils";

type CustomDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    // maxWidth ?: number;
    className?: string;
};

const CustomDialog = ({isOpen, onClose, children, className}: CustomDialogProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "";
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, handleKeyDown]);

    const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div onClick={handleBackdropClick} className="fixed inset-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-60 z-[60]">
            <div ref={modalRef}  className={cn("bg-white p-0 rounded-lg shadow-lg animate-fade-in", className && className)} >
                <div className="relative h-full">
                    <button
                        className="absolute top-[1px] right-[1px] text-gray-500 hover:text-gray-700 bg-red-100 rounded-md hover:bg-red-200"
                        onClick={onClose}
                    >
                        <X className="w-6 h-6" color="#f87171"/>
                    </button>
                    {children}
                </div>

            </div>
        </div>
    );
};

export default CustomDialog;
