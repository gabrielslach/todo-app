import React from 'react';

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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-statusGray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
        </div>
    );
};

export default GroupPaper;