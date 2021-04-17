import React from 'react';

function Task(props) {
    const {categories=[{color: 'green', label:'sample'}], title='', description=''} = props;
    return(
        <div className='rounded-lg p-3 mb-3 bg-white'>
            <div className='flex flex-row flex-auto'>
            <h6 className='flex-1 mb-1 font-normal'>Task Title</h6>
            {/* Drag Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-statusGray" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            </div>
            <p className='font-light text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam commodo.</p>
            {/* Categories */}
            <div className='flex flex-row flex-wrap mt-2 mb-1'>
                {categories.map(item=> (
                    <div className={`flex-initial bg-${item.color}-100 px-1 mb-1 mr-2`}>
                        <p className={`text-${item.color}-500 font-bold text-sm`}>{item.label}</p>
                    </div>
                ))
                }
            </div>
            <hr/>
            <div className='flex flex-row pt-1 items-center gap-2'>
                <p className='flex-grow mt-2 text-statusGray text-xs'>Status</p>
                {/* Actions */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-statusGray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-statusGray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </div>
        </div>
    )
};

export default Task;