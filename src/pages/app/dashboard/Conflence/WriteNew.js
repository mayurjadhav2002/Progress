import React from 'react'
import { ConfluenceContextProvider } from '../../../../utils/WriteContext/ConfluenceContext'
import WriteDoc from '../../../../components/dashboard/Confluence/WriteDoc'
import {
    Button, Typography, Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from '@material-tailwind/react'
import { TbSettings } from "react-icons/tb";
import { Combobox } from '@headlessui/react'
import { useState } from 'react';
const people = [
    'Durward Reynolds',
    'Kenton Towne',
    'Therese Wunsch',
    'Benedict Kessler',
    'Katelyn Rohan',
]

function WriteNew() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    const [selectedPerson, setSelectedPerson] = useState(people[0])
    const [query, setQuery] = useState('')

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                return person.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <ConfluenceContextProvider>

            <div>
                <div className='flex justify-between items-start'>


                    <Typography variant='h4' className='flex gap-2'>
                        New Doc</Typography>
                    <div className='flex items-center gap-5'>
                        <Button onClick={handleOpen}>Publish</Button>
                        <TbSettings className='h-8 w-8' />
                    </div>
                </div>
                <div class="my-5">
                    <label for="base-input" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Headline/Title of Documentation</label>
                    <input type="text" id="base-input" placeholder='e.g. Frontend Testing Module Guide' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div>
                    <WriteDoc />
                </div>

            </div>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className='bg-gray-50'>Additional Info...</DialogHeader>
                <DialogBody>
                    <div>

                        <label for="email" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" id="email" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 
  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="e.g. frontend" />

                        <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">keywords are helpful identifying the teams. you can assign keywords based on a team you're working.</p>
                    </div>
                    <div className='my-5'>
                        <label for="email" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Save in Folder</label>

                        <Combobox value={selectedPerson} onChange={setSelectedPerson}>
                            <Combobox.Input onChange={(event) => setQuery(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <Combobox.Options className={'overflow-y-scroll max-h-32 bg-gray-100 rounded-e-lg'}>
                                {filteredPeople.map((person) => (
                                    <Combobox.Option key={person} value={person} className="px-5 py-2 text-black hover:text-primary hover:bg-blue-100 cursor-pointer">
                                        {person}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Options>
                        </Combobox>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </ConfluenceContextProvider>
    )
}

export default WriteNew