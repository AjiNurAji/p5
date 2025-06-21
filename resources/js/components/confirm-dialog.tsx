import { cn } from '@/lib/utils';
import React from 'react';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from './ui/alert-dialog';
import { Button } from './ui/button';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: React.ReactNode;
    disabled?: boolean;
    desc: React.JSX.Element | string;
    cancelBtnText?: string;
    confirmBtnText?: React.ReactNode;
    destructive?: boolean;
    handleConfirm: () => void;
    isLoading?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export const ConfirmDialog = (props: Props) => {
    const {
        title,
        desc,
        cancelBtnText = 'Batal',
        confirmBtnText = 'Lanjutkan',
        destructive = false,
        handleConfirm,
        disabled,
        isLoading,
        className,
        children,
        ...actions
    } = props;

    return (
        <AlertDialog {...actions}>
            <AlertDialogContent className={cn(className && className)}>
                <AlertDialogHeader className="text-left">
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription asChild>
                        <p>{desc}</p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                {children}
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>{cancelBtnText}</AlertDialogCancel>
                    <Button variant={destructive ? 'destructive' : 'default'} disabled={disabled || isLoading} onClick={handleConfirm}>
                        {confirmBtnText}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
