import { ButtonHTMLAttributes,  } from 'react';


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

function Button(props: ButtonProps) {
  const { children, variant = 'primary', className , ...rest } = props;
  const colors = variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700 hover:active:bg-blue-800 ' : 'bg-white border text-gray-800 hover:bg-gray-50 hover:active:bg-gray-100 '

  return (
    <button
      className={colors + 'px-4 rounded shadow-sm ' + className}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button