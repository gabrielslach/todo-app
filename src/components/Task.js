import React from 'react';

import {WriteIcon, DeleteIcon, MoveIcon} from './IconBtn';

function Task(props) {
    const {categories=[{color: 'green', label:'sample'}], title='Title', description='Description', status='Status'} = props;
    return(
        <div className='rounded-lg p-3 mb-3 min-w-full bg-white'>
            <div className='flex flex-row flex-auto'>
            <h6 className='flex-1 mb-1 font-normal'>{title}</h6>
            {/* Drag Icon */}
            <MoveIcon/>
            </div>
            <p className='font-light text-sm'>{description}</p>
            {/* Categories */}
            <div className='flex flex-row flex-wrap mt-2 mb-1'>
                {categories.map(item=> (
                    <div className={`flex-initial bg-${item.colorVariant.color}-${item.colorVariant.level} px-1 mb-1 mr-2`} key={`${item.label}-cat`}>
                        <p className={`text-${item.colorVariant.color}-700 font-bold text-sm`}>{item.label}</p>
                    </div>
                ))
                }
            </div>
            <hr/>
            <div className='flex flex-row pt-2 items-center gap-2'>
                <p className='flex-grow text-statusGray text-xs'>{status}</p>
                {/* Actions */}
                <WriteIcon/>
                <DeleteIcon/>
            </div>
        </div>
    )
};

export default Task;