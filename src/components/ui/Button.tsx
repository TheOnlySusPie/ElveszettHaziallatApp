import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  }

  const variantStyles = {
    primary: 'bg-[var(--color-primary)] text-[var(--color-white)] font-semibold hover:bg-[var(--color-primary-light)] active:scale-95 shadow-sm shadow-black/15',
    secondary: 'bg-[var(--color-secondary)] text-[var(--color-white)] hover:bg-[#765D3C] active:scale-95 border border-[var(--color-secondary)]',
    outline: 'bg-transparent text-[var(--color-text)] border border-[var(--color-secondary)] hover:bg-[var(--color-border)] active:scale-95',
    ghost: 'bg-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-border)] hover:text-[var(--color-text)]',
    danger: 'bg-[var(--color-accent)]/15 text-[#A65335] border border-[var(--color-accent)]/40 hover:bg-[var(--color-accent)]/25 active:scale-95',
  }

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
