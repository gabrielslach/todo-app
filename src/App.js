import React, {useState, useEffect} from 'react';

import GroupPaper from './components/GroupPaper';
import TaskCreatorDialog from './components/TaskCreatorDialog';
import TaskDeleteDialog from './components/TaskDeleteDialog';

import useTasks from './util/useTasks';

const dialogState = {
  taskCreator: false,
  taskDelete: false
};

const dialogType = {
  taskCreator: 'taskCreator',
  taskDelete: 'taskDelete'
};

function App() {
  const [isOpen, setIsOpen] = useState(dialogState);

  const {queueTasks, doingTasks, doneTasks, setTasks} = useTasks();

  const handleToggleIsOpen = (type, isOpen_) => {
    setIsOpen(isOpen=> ({...isOpen, [type]: isOpen_}));
  };

  useEffect(()=> {
    setTasks('get');
  }, [])

  return (
    <div className='root'>
      {/* App Bar */}
      <div className='flex flex-row flex-auto items-center py-4 px-7 bg-appBarBlue'>
        <p className='flex-grow self-auto font-bold font-roboto text-white text-xl'>HOT LIST</p>
        <button 
          className='py-2 px-3 rounded bg-btnBlue hover:bg-btnHovBlue text-white font-medium text-sm'
          onClick={()=>handleToggleIsOpen(dialogType.taskCreator, true)}
          >
            Add Task
          </button>
      </div>
      {/* App Body */}
      <div className='p-7 flex flex-row gap-10'>
        <GroupPaper
          groupName='Queue'
          taskList={queueTasks}
          onAddTask={()=>handleToggleIsOpen(dialogType.taskCreator, true)}
          />
        <GroupPaper
          groupName='Doing'
          taskList={doingTasks}
          onAddTask={()=>handleToggleIsOpen(dialogType.taskCreator, true)}
          />
        <GroupPaper
          groupName='Done'
          taskList={doneTasks}
          onAddTask={()=>handleToggleIsOpen(dialogType.taskCreator, true)}
          />
      </div>
      {/* Dialog */}
      <TaskCreatorDialog 
        isOpen={isOpen.taskCreator} 
        handleClose={()=>handleToggleIsOpen(dialogType.taskCreator, false)}
        />
      <TaskDeleteDialog isOpen={isOpen.taskDelete}/>
    </div>
  );
}

export default App;
