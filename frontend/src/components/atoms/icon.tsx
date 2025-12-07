import type { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface IconProps extends Omit<LucideProps, 'ref'> {
    icon: React.ComponentType<LucideProps>;
}

/**
 * Icon component - A wrapper for Lucide icons
 * 
 * @example
 * ```tsx
 * import { Upload } from 'lucide-react';
 * <Icon icon={Upload} className="h-4 w-4" />
 * ```
 */
export const Icon = ({ icon: IconComponent, className, ...props }: IconProps) => {
    return <IconComponent className={cn('h-4 w-4', className)} {...props} />;
};
