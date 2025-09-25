import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';
import { Loader } from './shadcn-io/ai/loader';

export type UniversalLoaderProps = HTMLAttributes<HTMLDivElement> & {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'globe' | 'minimal' | 'card';
  message?: string;
  description?: string;
  showSpinner?: boolean;
};

const sizeConfig = {
  sm: { spinner: 16, container: 'h-20 w-20' },
  md: { spinner: 24, container: 'h-32 w-32' },
  lg: { spinner: 32, container: 'h-48 w-48' },
  xl: { spinner: 40, container: 'h-64 w-64' },
};

export const UniversalLoader = ({
  className,
  size = 'md',
  variant = 'default',
  message,
  description,
  showSpinner = true,
  ...props
}: UniversalLoaderProps) => {
  const config = sizeConfig[size];

  const getVariantClasses = () => {
    switch (variant) {
      case 'globe':
        return 'bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border border-primary/20';
      case 'minimal':
        return 'bg-transparent';
      case 'card':
        return 'bg-card border border-border rounded-lg shadow-sm';
      default:
        return 'bg-background/50 rounded-lg border border-border/50';
    }
  };

  const getGlobeAnimation = () => {
    if (variant !== 'globe') return null;

    return (
      <div className="absolute inset-0 rounded-full">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse"></div>

        {/* Middle ring */}
        <div
          className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 animate-spin"
          style={{ animationDuration: '20s' }}
        ></div>

        {/* Inner ring */}
        <div
          className="absolute inset-4 rounded-full bg-gradient-to-tr from-primary/40 to-secondary/40 animate-ping"
          style={{ animationDuration: '3s' }}
        ></div>

        {/* Globe emoji center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-5xl animate-bounce" style={{ animationDuration: '2s' }}>
            🌍
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 p-4',
        config.container,
        getVariantClasses(),
        className
      )}
      {...props}
    >
      <div className="relative flex items-center justify-center">
        {variant === 'globe' && getGlobeAnimation()}

        {showSpinner && variant !== 'globe' && (
          <Loader
            size={config.spinner}
            className="text-primary"
          />
        )}
      </div>

      {message && (
        <div className="text-center space-y-1">
          <div className="text-sm font-medium text-foreground">
            {message}
          </div>
          {description && (
            <div className="text-xs text-muted-foreground">
              {description}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Preset configurations for common use cases
export const GlobeLoader = ({ className, ...props }: Omit<UniversalLoaderProps, 'variant'>) => (
  <UniversalLoader
    variant="globe"
    size="lg"
    showSpinner={false}
    className={className}
    {...props}
  />
);

export const ComponentLoader = ({ className, message = "Loading...", ...props }: Omit<UniversalLoaderProps, 'variant'>) => (
  <UniversalLoader
    variant="default"
    size="md"
    message={message}
    className={className}
    {...props}
  />
);

export const CardLoader = ({ className, ...props }: Omit<UniversalLoaderProps, 'variant'>) => (
  <UniversalLoader
    variant="card"
    size="sm"
    message="Loading content..."
    className={className}
    {...props}
  />
);

export const MinimalLoader = ({ className, size = 'sm', ...props }: Omit<UniversalLoaderProps, 'variant'>) => (
  <UniversalLoader
    variant="minimal"
    size={size}
    showSpinner={true}
    className={className}
    {...props}
  />
);