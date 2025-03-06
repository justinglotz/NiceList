import * as React from 'react';
import PropTypes from 'prop-types';
import cn from '@/lib/utils';

const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => <input ref={ref} type={type} data-slot="input" className={cn('file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', className)} {...props} />);

// Add prop types validation
Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

// Add default props to fix the require-default-props errors
Input.defaultProps = {
  className: '',
  type: 'text',
};

Input.displayName = 'Input';

// Fix the prefer-default-export issue by exporting both named and default
export { Input };
export default Input;
