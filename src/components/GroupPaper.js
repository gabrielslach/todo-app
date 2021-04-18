import React from 'react';
import { AddIcon } from './IconBtn';

import Task from './Task';

function GroupPaper(props) {
    const {taskList = [1,2]} = props;
    return(
        <div className='flex flex-col w-96' id='root'>
            <h6 className='text-statusGray text-sm mb-2 uppercase'>Group Name</h6>
            <div className='p-4 bg-groupGray rounded-lg flex flex-col items-center'>
                {
                    taskList.map(item => (
                        <Task/>
                    ))
                }
                <AddIcon/>
            </div>
        </div>
    );
};

export default GroupPaper;