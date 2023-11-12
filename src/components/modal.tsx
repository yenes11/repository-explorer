import { HTMLAttributes } from 'react';
import CloseIcon from '../assets/close-icon.svg';

interface ModalProps extends HTMLAttributes<HTMLDivElement>  {
  visible: boolean;
  children?: React.ReactNode;
  onClose: () => void;
}

function Modal(props: ModalProps) {
  const { visible, children, onClose, className, ...rest } = props;
  return (
    <>
      <div
        onClick={onClose}
        style={{ display: visible ? 'flex': 'none' }}
        className='absolute w-screen h-screen bg-black top-0 left-0 opacity-25 items-center justify-center'
      >
      </div>
      <div
        style={{ display: visible ? 'flex': 'none' }}
        className={'bg-white rounded p-8 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] ' + className}
        {...rest}
      >
        <img src={CloseIcon} alt="close" className='absolute top-4 right-4 w-6 cursor-pointer' onClick={onClose} />
        {children}
      </div>
    </>
  )
}

export default Modal