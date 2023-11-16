import React, { useEffect, useRef } from 'react'

const IndeterminateCheckbox = ({ indeterminate = false, ...rest }) => {
    const defaultRef = useRef();
    const resolvedRef = useRef();

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
        <>
            <input type="checkbox" ref={resolvedRef} {...rest}
            
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
            />
        </>
    );
};

export default IndeterminateCheckbox
