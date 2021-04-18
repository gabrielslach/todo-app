import React from 'react';

function IconBtn(props) {
    const {fill='none', size='5', onClick=null} = props;
    return(
        <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" className={`h-${size} w-${size} text-statusGray hover:text-blue-500 cursor-pointer`} fill={fill} viewBox="0 0 24 24" stroke="currentColor">
            {props.children}
        </svg>
    )
}

export function WriteIcon(props) {
    const {onClick} = props;
    return(
        <IconBtn onClick={onClick}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </IconBtn>
    )
}

export function DeleteIcon(props) {
    const {onClick} = props;
    return(
        <IconBtn onClick={onClick}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </IconBtn>
    )
}

export function MoveIcon(props) {
    const {onClick} = props;
    return(
        <IconBtn fill='currentColor'  onClick={onClick}>
            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </IconBtn>
    )
}

export function AddIcon(props) {
    const {onClick} = props;
    return(
        <IconBtn size='8'  onClick={onClick}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </IconBtn>
    )
}