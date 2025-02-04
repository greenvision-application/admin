import { ButtonProps } from '../propTypes';
import { cn } from '../../../utils';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'text',
  className = '',
  ...props
}) => {
  const baseClasses =
    'flex items-center justify-center transition-colors focus:outline-none';
  const variantClasses = {
    icon: 'h-14 w-14 rounded-xl hover:bg-green-500/20',
    text: 'px-4 py-2 rounded-md text-gray-400 hover:text-green-500 hover:bg-green-500/20'
  };

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
