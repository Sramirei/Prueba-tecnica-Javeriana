import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-javeriana-gold bg-javeriana-gold text-javeriana-blue hover:bg-javeriana-gold-700 hover:border-javeriana-gold-700 hover:text-white',
  secondary:
    'border-javeriana-blue bg-javeriana-blue text-white hover:bg-javeriana-blue-900 hover:border-javeriana-blue-900',
  ghost:
    'border-stone-line bg-white text-ink hover:border-javeriana-blue hover:text-javeriana-blue dark:bg-javeriana-blue-900 dark:text-white dark:border-javeriana-blue-800',
  danger: 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:border-red-300'
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-3 py-2 text-xs',
  md: 'min-h-11 px-4 py-2.5 text-sm',
  lg: 'min-h-12 px-5 py-3 text-sm'
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={[
      'inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm border font-bold uppercase tracking-wide shadow-sm motion-safe-transition transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60',
      variantClasses[variant],
      sizeClasses[size],
      fullWidth ? 'w-full' : '',
      className
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    {children}
  </button>
);
