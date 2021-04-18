import React from "react";
import { Dialog } from "@headlessui/react";

function MyDialog(props) {
  const {isOpen = true, setIsOpen=()=>{}} = props;

  return (
    <Dialog open={isOpen} onClose={() => console.log(false)} className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <div className="w-full max-w-md p-6 overflow-hiddenalign-middle transform bg-white shadow-xl rounded-2xl">
        <Dialog.Title className="text-btnHovBlue text-2xl font-normal">Add Task</Dialog.Title>
        <Dialog.Description className="text-sm m-1">
            Fill-up required (*) fields.
        </Dialog.Description>

        <button onClick={() => setIsOpen(false)}>Confirm</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </div>
    </Dialog>
  );
}

export default MyDialog;