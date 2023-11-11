import { Input } from '@material-tailwind/react'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

function Search() {
    return (
        <div className="p-2">
            <Input icon={<AiOutlineSearch className="h-5 w-5" />} label="Search" />
        </div>)
}

export default Search