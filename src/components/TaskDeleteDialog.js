import React from 'react';

import Dialog from './Dialog';

function TaskCreatorDialog(props) {
    const {isOpen = false, taskTitle = '', handleConfirm=()=>{}, handleClose=()=>{}} = props;
    return(
        <Dialog
            isOpen = {isOpen}
            handleClose = {handleClose}
            handleConfirm = {handleConfirm}
            handleCancel = {handleClose}
            title = 'Delete Task'
            description = {`Are you sure to delete "${taskTitle}"? This can't be undone.`}
            />
    );
}

export default TaskCreatorDialog;