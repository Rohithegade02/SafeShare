import { Alert, AlertDescription, AlertTitle } from '@/components/atoms/alert';
import { Button } from '@/components/atoms/button';
import type { ErrorMessageProps } from './types';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const ErrorMessage = ({
    title = 'Error',
    message,
    onRetry,
}: ErrorMessageProps) => {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription className="mt-2 space-y-3">
                <p>{message}</p>
                {onRetry && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onRetry}
                        className="gap-2"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Try Again
                    </Button>
                )}
            </AlertDescription>
        </Alert>
    );
};
