import cn from 'classnames';
import React, { InputHTMLAttributes } from 'react';

interface expectedOptionObject {
  id: number;
  name: string;
}

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  name: string;
  error?: string;
  type?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline' | 'line';
  dimension?: 'small' | 'medium' | 'big';
  options: string[] | expectedOptionObject[];
  onChange?: Function;
  isParent?: boolean;
}

const variantClasses = {
  normal:
    'bg-gray-100 border border-border-base rounded focus:shadow focus:bg-light focus:border-accent',
  solid:
    'bg-gray-100 border border-border-100 rounded focus:bg-light focus:border-accent',
  outline: 'border border-border-base rounded focus:border-accent',
  line: 'ltr:pl-0 rtl:pr-0 border-b border-border-base rounded-none focus:border-accent',
};

const sizeClasses = {
  small: 'text-sm h-9',
  medium: 'h-12',
  big: 'h-14',
};

const DropDownInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      label,
      name,
      error,
      children,
      variant = 'normal',
      dimension = 'medium',
      shadow = false,
      disabled = false,
      type = 'text',
      inputClassName,
      options,
      onChange,
      isParent,
      ...rest
    }, ref
  ) => {

    return (
      <div className={className} >
        {label && (
          <label
            htmlFor={name}
            className="block mb-3 text-sm font-semibold leading-none text-body-dark"
          >
            {label}
          </label>
        )}
        <select
          id={name}
          ref={ref}
          name={name}
          className={cn(
            'flex w-full appearance-none items-center px-4 text-sm text-heading transition duration-300 ease-in-out focus:outline-none focus:ring-0',
            shadow && 'focus:shadow',
            variantClasses[variant],
            sizeClasses[dimension],
            disabled && 'cursor-not-allowed bg-gray-100',
            inputClassName
          )}
          onChange={(e) => { if (onChange){
            if (isParent) {
              onChange(e.target.value)
            }
          } 
        }}
          disabled={disabled}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-invalid={error ? 'true' : 'false'}
          {...rest}
        >
          <option value='' ></option>
          {options && options.map(option => {
            if (typeof option === 'string') {
              return (
                <option key={option} value={option}>{option}</option>
                )
            } else if (typeof option === 'object') {
              return (
                <option key={option?.id} value={option?.id}>{option?.name}</option>
                )
            }
          })}
        </select>
        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
DropDownInput.displayName = 'DropDownInput';
export default DropDownInput;
