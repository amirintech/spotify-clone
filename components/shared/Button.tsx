import { ButtonHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, children, disabled, type = 'button', ...props }, ref) => {
    return (
      <button
        type={type}
        className={twMerge(
          'w-full rounded-full bg-green-500 px-3 py-3 font-bold text-black transition hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button' // for react and helpful for debugging

export default Button
