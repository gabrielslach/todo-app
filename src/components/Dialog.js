import React from "react";
import { Dialog } from "@headlessui/react";

function MyDialog(props) {
  const {
    isOpen = false, 
    handleClose = ()=>{}, 
    handleConfirm = ()=>{}, 
    handleCancel = ()=>{},
    title = '',
    description = '',
    children = null,
    disabled = false
   } = props;
   
  return (
    <Dialog open={isOpen} onClose={handleClose} className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <div className="w-full max-w-md p-6 overflow-hiddenalign-middle transform bg-white shadow-xl rounded-2xl">
        <Dialog.Title className="text-btnHovBlue text-2xl font-normal">{title}</Dialog.Title>
        <Dialog.Description className="text-sm mx-1 my-2">
            {description}
        </Dialog.Description>

        {children}

        <div className='mt-6 float-right flex gap-1'>
          <button 
            onClick={handleCancel} 
            className={`px-3 ${disabled && 'cursor-not-allowed'}`} 
            disabled={disabled} 
            >
              Cancel
            </button>
          <button 
            onClick={handleConfirm} 
            className= {`py-1 px-3 rounded-md text-white 
              ${!disabled && 'bg-blue-600 font-normal'} 
              ${disabled && 'bg-gray-400 cursor-not-allowed'}
              `} 
            disabled={disabled} 
            >
              {disabled ? 'Loading...': 'Confirm'}
            </button>
        </div>
      </div>
    </Dialog>
  );
}

export default MyDialog;