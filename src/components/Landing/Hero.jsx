import React from 'react'
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 justify-between pt-[80px] pb-[50px] container mx-auto'>
                <div className="w-full px-4 bg-red">
                    <div className="hero-content">
                        <h1 className="mb-5 text-4xl font-bold !leading-[1.208] text-dark dark:text-white sm:text-[42px] lg:text-[40px] xl:text-5xl">
                        Empower Your Agile Journey with <span className='text-primary'>Progress</span>
                        </h1>
                        <p className="mb-8 max-w-[480px] text-base text-body-color dark:text-dark-6">
                        Experience a complete project management solution for agile teams, featuring dynamic sprint planning, team collaboration, and an intuitive interface.
                        </p>
                        <ul className="flex flex-wrap items-center">
                            <li>
                                <Link
                                    to="/login"
                                    className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-center text-base font-medium text-white hover:bg-blue-dark lg:px-7"
                                >
                                    Get Started
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to=""
                                    className="inline-flex items-center justify-center px-5 py-3 text-center text-base font-medium text-[#464646] hover:text-primary dark:text-white"
                                >
                                    <span className="mr-2">
                                        <svg
                                            width="24"
                                            height="25"
                                            viewBox="0 0 24 25"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="12" cy="12.6152" r="12" fill="#3758F9" />
                                            <rect
                                                x="7.99893"
                                                y="14.979"
                                                width="8.18182"
                                                height="1.63636"
                                                fill="white"
                                            />
                                            <rect
                                                x="11.2717"
                                                y="7.61523"
                                                width="1.63636"
                                                height="4.09091"
                                                fill="white"
                                            />
                                            <path
                                                d="M12.0898 14.1606L14.9241 11.0925H9.25557L12.0898 14.1606Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </span>
                                    Install Locally
                                </Link>
                            </li>
                        </ul>
                        <div className="clients pt-16 ">
                            <h6 className="mb-2 flex items-center text-xs font-normal text-body-color dark:text-dark-6">
                                Made using
                                <span className="ml-3 inline-block h-px w-8 bg-body-color"></span>
                            </h6>

                            <div className="flex items-center space-x-4">
                                <SingleImage
                                    href="#"
                                    imgSrc="https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.svg"
                                />

                                <SingleImage
                                    href="#"
                                    imgSrc="https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg"
                                />

                                <SingleImage
                                    href="#"
                                    imgSrc="https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full right-0  mx-auto">
                    <div className="lg:ml-auto lg:text-right">
                        <div className="relative z-10 inline-block pt-11 lg:pt-0">
                            <img
                                src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/5VDoR9Xwf3wIf4MhUsz5Gv/8749f91c89d10b51cdefb2c8895dc671/0xwgCJLg.jpeg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000&h="
                                alt="hero image by coursera"
                                title="Image by Coursera | All credits own by coursera"
                                className="max-w-full h-auto object-cover rounded-s-lg lg:ml-auto hover:saturate-100"
                            />
                            <span className="absolute -bottom-8 -left-8 z-[-1]">
                                <svg
                                    width="93"
                                    height="93"
                                    viewBox="0 0 93 93"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="2.5" cy="2.5" r="2.5" fill="#3056D3" />
                                    <circle cx="2.5" cy="24.5" r="2.5" fill="#3056D3" />
                                    <circle cx="2.5" cy="46.5" r="2.5" fill="#3056D3" />
                                    <circle cx="2.5" cy="68.5" r="2.5" fill="#3056D3" />
                                    <circle cx="2.5" cy="90.5" r="2.5" fill="#3056D3" />
                                    <circle cx="24.5" cy="2.5" r="2.5" fill="#3056D3" />
                                    <circle cx="24.5" cy="24.5" r="2.5" fill="#3056D3" />
                                    <circle cx="24.5" cy="46.5" r="2.5" fill="#3056D3" />
                                    <circle cx="24.5" cy="68.5" r="2.5" fill="#3056D3" />
                                    <circle cx="24.5" cy="90.5" r="2.5" fill="#3056D3" />
                                    <circle cx="46.5" cy="2.5" r="2.5" fill="#3056D3" />
                                    <circle cx="46.5" cy="24.5" r="2.5" fill="#3056D3" />
                                    <circle cx="46.5" cy="46.5" r="2.5" fill="#3056D3" />
                                    <circle cx="46.5" cy="68.5" r="2.5" fill="#3056D3" />
                                    <circle cx="46.5" cy="90.5" r="2.5" fill="#3056D3" />
                                    <circle cx="68.5" cy="2.5" r="2.5" fill="#3056D3" />
                                    <circle cx="68.5" cy="24.5" r="2.5" fill="#3056D3" />
                                    <circle cx="68.5" cy="46.5" r="2.5" fill="#3056D3" />
                                    <circle cx="68.5" cy="68.5" r="2.5" fill="#3056D3" />
                                    <circle cx="68.5" cy="90.5" r="2.5" fill="#3056D3" />
                                    <circle cx="90.5" cy="2.5" r="2.5" fill="#3056D3" />
                                    <circle cx="90.5" cy="24.5" r="2.5" fill="#3056D3" />
                                    <circle cx="90.5" cy="46.5" r="2.5" fill="#3056D3" />
                                    <circle cx="90.5" cy="68.5" r="2.5" fill="#3056D3" />
                                    <circle cx="90.5" cy="90.5" r="2.5" fill="#3056D3" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

const SingleImage = ({ href, imgSrc }) => {
    return (
        <>
            <a href={href} className="flex w-full items-center justify-center">
                <img src={imgSrc} alt="brand image" className="w-full object-scale-down" />
            </a>
        </>
    );
};
export default Hero