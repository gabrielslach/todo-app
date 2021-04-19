import React from 'react';
import { AddIcon } from './IconBtn';

import Task from './Task';

function GroupPaper(props) {
    const {taskList = [], onAddTask = ()=> {}, groupName=''} = props;
    return(
        <div className='flex flex-col w-96' id='root' key={`${groupName}-groupPaper`}>
            <h6 className='text-statusGray text-sm mb-2 uppercase'>{groupName}</h6>
            <div className='p-4 bg-groupGray rounded-lg flex flex-col items-center'>
                {
                    taskList.map(item => (
                        <Task 
                          key={`${item.id}-task`}
                          title={item.title}
                          description={item.description}
                          status={item.status}
                          categories={item.categories}
                         />
                    ))
                }
                <AddIcon onClick={onAddTask} />
            </div>
        </div>
    );
};

export default GroupPaper;