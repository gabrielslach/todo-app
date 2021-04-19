import React, {useState, useEffect} from 'react';

import GroupPaper from './components/GroupPaper';
import TaskCreatorDialog from './components/TaskCreatorDialog';
import TaskDeleteDialog from './components/TaskDeleteDialog';
import TaskChangeGroupDialog from './components/TaskChangeGroupDialog';

import useTasks from './util/useTasks';

const dialogState = {
  taskCreator: false,
  taskEditor: false,
  taskDelete: false
};

const dialogType = {
  taskCreator: 'taskCreator',
  taskEditor: 'taskEditor',
  taskDelete: 'taskDelete',
  taskChangeGroup: 'taskChangeGroup'
};

const formFields = [
  'title',
  'description',
  'categories',
  'status',
  'taskgroup'
];

function App() {
  const [isOpen, setIsOpen] = useState(dialogState);
  const [selected, setSelected] = useState(null);

  const {queueTasks, doingTasks, doneTasks, isLoading, setTasks} = useTasks();

  const handleToggleIsOpen = (type, isOpen_) => () => {    
    setIsOpen(isOpen=> ({...isOpen, [type]: isOpen_}));
  };

  const onAddTask = (fields) => {
    if (fields && fields.groupName) {
      setSelected({taskgroup: fields.groupName});
    } else {
      setSelected(null);
    };

    handleToggleIsOpen(dialogType.taskCreator, true)();
  };

  const onEditTask = (fields) => {
    if (fields && !isNaN(fields.id)) {
      setSelected(fields);
    } else {
      setSelected(null);
    };

    handleToggleIsOpen(dialogType.taskEditor, true)();
  };

  const onDeleteTask = (fields) => {
    if (fields && !isNaN(fields.id)) {
      setSelected(fields);
    } else {
      setSelected(null);
    };

    handleToggleIsOpen(dialogType.taskDelete, true)();
  };
  
  const onTaskChangeGroup = (fields) => {
    if (fields && !isNaN(fields.id)) {
      setSelected(fields);
    } else {
      setSelected(null);
    };

    handleToggleIsOpen(dialogType.taskChangeGroup, true)();
  };

  const handleCreateTask = (formData, resetFormCallback) => {
    const callback = () => {
      handleToggleIsOpen(dialogType.taskCreator, false)();
      handleToggleIsOpen(dialogType.taskEditor, false)();
      handleToggleIsOpen(dialogType.taskChangeGroup, false)();
      resetFormCallback();
    };
    setTasks('add', formData, callback);
  };

  const handleDeleteTask = (id) => {
    const callback = () => {
      handleToggleIsOpen(dialogType.taskDelete, false)();
    }
    setTasks('delete', {id}, callback);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filterTxt = e.target.filterTxt.value;
    const field = e.target.field.value;
    setTasks('filter', {field, filterTxt});
  };

  const handleSearchChange = (e) => {
    const filterTxt = e.target.value;
    if (filterTxt === ''){
    setTasks('filter', {filterTxt});
  };
  };

  useEffect(()=> {
    setTasks('get');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='root'>
      {/* App Bar */}
      <div className='flex flex-row flex-auto items-center py-4 px-7 bg-appBarBlue'>
        <p className='flex-grow self-auto font-bold font-roboto text-white text-xl'>HOT LIST</p>
        <button 
          className='py-2 px-3 rounded bg-btnBlue hover:bg-btnHovBlue text-white font-medium text-sm'
          onClick={handleToggleIsOpen(dialogType.taskCreator, true)}
          >
            Add Task
          </button>
      </div>
      {/* Filter Field */}
      <form onSubmit={handleSearch} onChange={handleSearchChange}>
      <div className='m-2 mt-4 sm:mt-7 sm:ml-7 flex flex-col sm:flex-row gap-3 md:max-w-lg'>
      <div className='max-w flex flex-row flex-grow gap-0 rounded-md border-2 border-gray-400 focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-200 focus-within:ring-opacity-50  overflow-hidden'>
        <input name='filterTxt' type='text' placeholder='Search' className='flex-grow rounded-md rounded-r-none border-0 focus:ring-0' />
        <select name='field' className='rounded-md rounded-l-none border-0 focus:ring-0' style={{textAlignLast: 'right'}} >
          {formFields.map(item => (
            <option key={`${item}-fieldOpt`} value={item}>{item.toUpperCase()}</option>
          ))}
        </select>
      </div>
      <button type='submit' className='px-4 rounded-md bg-btnBlue p-2 text-white' >Search</button>
      </div>
      </form>
      {/* App Body */}
      <div className='mx-3 my-4 sm:m-7 flex flex-col md:flex-row gap-10'>
        <GroupPaper
          groupName='queue'
          taskList={queueTasks}
          onAddTask={onAddTask}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onTaskChangeGroup={onTaskChangeGroup}
          />
        <GroupPaper
          groupName='doing'
          taskList={doingTasks}
          onAddTask={onAddTask}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onTaskChangeGroup={onTaskChangeGroup}
          />
        <GroupPaper
          groupName='done'
          taskList={doneTasks}
          onAddTask={onAddTask}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onTaskChangeGroup={onTaskChangeGroup}
          />
      </div>
      {/* Dialog */}
      <TaskCreatorDialog
        type='Add'
        isOpen={isOpen.taskCreator}
        isLoading={isLoading}
        onSubmit={handleCreateTask}
        handleClose={handleToggleIsOpen(dialogType.taskCreator, false)}
        selected={selected}
        />
      <TaskCreatorDialog
        type='Edit'
        isOpen={isOpen.taskEditor}
        isLoading={isLoading}
        onSubmit={handleCreateTask}
        handleClose={handleToggleIsOpen(dialogType.taskEditor, false)}
        selected={selected}
        />
        <TaskChangeGroupDialog
          isOpen={isOpen.taskChangeGroup}
          isLoading={isLoading}
          onSubmit={handleCreateTask}
          handleClose={handleToggleIsOpen(dialogType.taskChangeGroup, false)}
          selected={selected}
          />
      <TaskDeleteDialog 
        isOpen={isOpen.taskDelete}
        isLoading={isLoading}
        taskTitle={selected && selected.title}
        handleClose={handleToggleIsOpen(dialogType.taskDelete, false)}
        handleConfirm={() => handleDeleteTask(selected.id)}
        />
    </div>
  );
}

export default App;
