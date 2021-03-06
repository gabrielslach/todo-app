import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';

import Dialog from './Dialog';

const TextInput = (props) => {
    const { name, label, register, required, validation=null } = props;
    return(
        <React.Fragment>
        <label className="block">
        <span className="text-gray-700">{label}{required && '*'}</span>
        <input type='text' {...register(name, { required, ...validation })} className='mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0' />
        </label>
        </React.Fragment>
    );
};

const TextArea = (props) => {
    const { name, label, register, required } = props;
    return(
        <React.Fragment>
        <label className="block">
        <span className="text-gray-700">{label}{required && '*'}</span>
        <textarea {...register(name, { required })} className='mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0' />
        </label>
        </React.Fragment>
    );
};

const Select = (props) => {
    const { name, label, optionsList = [], register, required } = props;
    return(
        <React.Fragment>
        <label className="block">
        <span className="text-gray-700">{label}{required && '*'}</span>
        <select {...register(name, { required })} className='mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0' >
            {optionsList.map(item => {
                const {value, label} = item;
                return (
                <option value={value} key={`${value}-opt-key`}>{label}</option>
                )
            }
            )}
        </select>
        </label>
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

function TaskCreatorDialog(props) {
    const {
        type='Add', 
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
            title = {`${type} Task`}
            description = 'Fill-up required (*) fields.'
        >
            {/* form */}
        <form className='flex flex-col gap-2 m-1' >
            <TextInput name='title' label="Title" register={register} validation={{minLength: {value: 3,message: 'Title should be atleast 3 char long.'}}} required />
            <TextArea name='description' label="Description" register={register} />
            <TextInput name='status' label="Status" register={register} />
            <TextInput name='categories' label="Categories (comma-separated)" register={register} />
            <Select name='taskgroup' label="Task Group" optionsList={taskGroupList} register={register} required />
            {/* Error messages */}
            {errors && Object.entries(errors).map(([key,val]) => (
                <p key={`${key}-errmsg`} className='font-light text-xs text-red-500 mt-2 capitalize'>{(val.message && val.message.length > 0) ? val.message: `${key} is required.`}</p>
            ))}
        </form>
        </Dialog>
    );
}

export default TaskCreatorDialog;