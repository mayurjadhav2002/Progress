import React, { useEffect, useState } from 'react'
import { AiOutlineStar, AiOutlineClockCircle, AiOutlineShareAlt, AiOutlineFullscreen } from 'react-icons/ai'
import Settings from './settings'
import { differenceInDays } from 'date-fns';
import { useProjectContext } from '../../../utils/ProjectContext/ProjectContext';

function Countdown({ targetDate }) {
    const [remainingDays, setRemainingDays] = useState(null);

    useEffect(() => {
        const calculateRemainingDays = () => {
            const daysRemaining = differenceInDays(new Date(targetDate), new Date());
            setRemainingDays(Math.max(0, daysRemaining));
        };

        calculateRemainingDays();

        // You may want to update the remaining days periodically, for example, every minute
        const intervalId = setInterval(calculateRemainingDays, 60000);

        return () => clearInterval(intervalId);
    }, [targetDate]);

    return (
        <div>
            {remainingDays !== null ? (
                <p>{remainingDays === 0 ? 'Today is the deadline' : `${remainingDays} days remaining`}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}


function Header(props) {
    const {saving,timeline, title} =useProjectContext()
    return (
        <div className='flex flex-row items-end justify-between'>
            <div className='flex flex-col gap-2'>
                <ol class="flex items-center gap-1 text-sm text-gray-600">
                    <li>
                        <a href="#" class="block transition hover:text-gray-700">
                            <span class="sr-only"> Home </span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                        </a>
                    </li>

                    <li class="rtl:rotate-180">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </li>

                    <li>
                        <a href="#" class="block transition hover:text-gray-700"> Dashboard </a>
                    </li>

                    <li class="rtl:rotate-180">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </li>

                    <li>
                        <a href="#" class="block transition hover:text-gray-700">Project</a>
                    </li>
                </ol>

                <h1 className='text-2xl font-bold '>{title}</h1>
            </div>
            <div className='flex items-center gap-3'>
                {saving && <Loader />}
                <AiOutlineStar className='w-6 h-6 hover:text-yellow-700 dark:text-white' />
                <span className='flex items-center gap-2 hover:bg-gray-50 p-2 rounded-lg'><AiOutlineClockCircle className='w-6 h-6  dark:text-white' />
                    <Countdown targetDate={timeline} />
                </span>
                <AiOutlineShareAlt className='w-6 h-6 hover:text-blue-700 dark:text-white' />
                <AiOutlineFullscreen className='w-6 h-6 hover:text-blue-700 dark:text-white cursor-pointer' />

                <Settings />
            </div>
        </div>
    )
}


const Loader = () => {
    return (
        <>
            <div className='flex items-center gap-2 relative -mt-1.5'>
                <div class="loadingio-spinner-bean-eater-0knfrtq0p9df"><div class="ldio-ivfsphy3f1h">
                    <div><div></div><div></div><div></div></div><div><div></div><div></div><div></div></div>
                </div></div>
                <span className='font-semibold text-primary text-sm'>Saving</span>
            </div>

        </>
    )
}

export default Header