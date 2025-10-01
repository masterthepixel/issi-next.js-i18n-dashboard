'use client';

import { cn } from '@/lib/utils';
import { XIcon } from 'lucide-react';
import React, {
    useCallback,
    useContext,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';

export type SimpleDialogContextType = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    uniqueId: string;
};

const SimpleDialogContext = React.createContext<SimpleDialogContextType | null>(
    null
);

function useSimpleDialog() {
    const context = useContext(SimpleDialogContext);
    if (!context) {
        throw new Error('useSimpleDialog must be used within a SimpleDialog');
    }
    return context;
}

export type SimpleDialogProps = {
    children: React.ReactNode;
};

function SimpleDialog({ children }: SimpleDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const uniqueId = useId();

    const contextValue = useMemo(
        () => ({
            isOpen,
            setIsOpen,
            uniqueId,
        }),
        [isOpen, uniqueId]
    );

    return (
        <SimpleDialogContext.Provider value={contextValue}>
            {children}
        </SimpleDialogContext.Provider>
    );
}

export type SimpleDialogTriggerProps = {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

function SimpleDialogTrigger({
    children,
    className,
    style,
}: SimpleDialogTriggerProps) {
    const { setIsOpen, isOpen } = useSimpleDialog();

    const handleClick = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen, setIsOpen]);

    return (
        <button
            className={cn('relative cursor-pointer', className)}
            onClick={handleClick}
            style={style}
            type="button"
            aria-haspopup='dialog'
            aria-expanded={isOpen}
        >
            {children}
        </button>
    );
}

export type SimpleDialogContentProps = {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

function SimpleDialogContent({
    children,
    className,
    style,
}: SimpleDialogContentProps) {
    const { setIsOpen, isOpen } = useSimpleDialog();
    const containerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Handle Escape key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, setIsOpen]);

    // Handle body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node) &&
                isOpen
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, setIsOpen]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                className='fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-200'
                aria-hidden='true'
            />

            {/* Dialog container - centered */}
            <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
                <div
                    ref={containerRef}
                    className={cn(
                        'relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl dark:bg-gray-900',
                        'animate-in fade-in zoom-in-95 duration-200',
                        className
                    )}
                    style={style}
                    role='dialog'
                    aria-modal='true'
                >
                    {children}
                </div>
            </div>
        </>,
        document.body
    );
}

export type SimpleDialogCloseProps = {
    children?: React.ReactNode;
    className?: string;
};

function SimpleDialogClose({ children, className }: SimpleDialogCloseProps) {
    const { setIsOpen } = useSimpleDialog();

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    return (
        <button
            onClick={handleClose}
            type='button'
            aria-label='Close dialog'
            className={cn(
                'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                className
            )}
        >
            {children || <XIcon className='h-6 w-6' />}
        </button>
    );
}

export {
    SimpleDialog,
    SimpleDialogClose,
    SimpleDialogContent,
    SimpleDialogTrigger
};

