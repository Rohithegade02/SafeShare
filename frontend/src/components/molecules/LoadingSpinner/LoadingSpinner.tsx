import { Card } from '@/components/atoms/card';
import { Skeleton } from '@/components/atoms/skeleton';
import type { LoadingSpinnerProps } from './types';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const LoadingSpinner = ({
    size = 'md',
    text = 'Loading...',
}: LoadingSpinnerProps) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    return (
        <div className="flex items-center justify-center p-8">
            <div className="flex flex-col items-center gap-3">
                <Loader2 className={cn('animate-spin text-primary', sizeClasses[size])} />
                {text && <p className="text-sm text-muted-foreground">{text}</p>}
            </div>
        </div>
    );
};

export const LoadingCard = () => {
    return (
        <Card className="p-6">
            <div className="space-y-3">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
            </div>
        </Card>
    );
};

export const LoadingPage = () => {
    return (
        <div className="container py-8 space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-8 w-[300px]" />
                <Skeleton className="h-4 w-[400px]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <LoadingCard key={i} />
                ))}
            </div>
        </div>
    );
};
