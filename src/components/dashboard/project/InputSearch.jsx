import { Input } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi'
const InputSearch = ({ value: initValue, debounce = 500, onChange, ...props }) => {
    const [value, setValue] = useState(initValue);

    useEffect(() => {
        setValue(initValue);
    }, [initValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);
        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <Input
            {...props}
            value={value}
            icon={<FiSearch className='active:text-blue-500' />}
            label={"Search"}
            variant="standard"
            className='border-b-2 focus:border-b-primary active:border-b-blue-500'
            onChange={(e) => setValue(e.target.value)}
        />
    );
};

export default InputSearch;
