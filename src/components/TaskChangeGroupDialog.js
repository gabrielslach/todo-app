import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';

import Dialog from './Dialog';

const Select = (props) => {
    const { name, optionsList = [], register, required } = props;
    return(
        <React.Fragment>
        <select {...register(name, { required })} className='mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0' >
            {optionsList.map(item => {
                const {value, label} = item;
                return (
                <option value={value} key={`${value}-opt-key`}>{label}</option>
                )
            }
            )}
        </select>
        </React.Fragment>
)};

const formValues = {
    title: '',
    description: '',
    categories: '',
    status: '',
    taskgroup: ''
};

const taskGroupList = [
    {value: 'queue', label: 'QUEUE'},
    {value: 'doing', label: 'DOING'},
    {value: 'done', label: 'DONE'},
];

function TaskChangeGroupDialog(props) {
    const {
        isOpen = false, 
        handleClose=()=>{},
        onSubmit=()=>{},
        isLoading = false,
        selected = {}
      } = props;

    const { register, handleSubmit, reset, formState: { errors } } = useForm({defaultValues: formValues});

    const onSubmit_ = (data) => {
        onSubmit(data, () => reset(formValues));
    };

    const handleCancel = () => {
        handleClose();
        reset(formValues);
    };

    useEffect(()=> {
        if (selected && selected.taskgroup) {
            reset({...formValues, ...selected});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    return(
        <Dialog
            isOpen = {isOpen}
            handleClose = {handleClose}
            handleConfirm = {handleSubmit(onSubmit_)}
            handleCancel = {handleCancel}
            disabled={isLoading}
            title = 'Change Group'
            description = {`Select which group to transfer task "${selected && selected.title}."`}
        >
            {/* form */}
        <form className='flex flex-col gap-2 m-1' >
            <Select name='taskgroup' label="Task Group" optionsList={taskGroupList} register={register} required />
            {/* Error messages */}
            {errors && Object.entries(errors).map(([key,val]) => (
                <p key={`${key}-errmsg`} className='font-light text-xs text-red-500 mt-2 capitalize'>{(val.message && val.message.length > 0) ? val.message: `${key} is required.`}</p>
            ))}
        </form>
        </Dialog>
    );
}

export default TaskChangeGroupDialog;