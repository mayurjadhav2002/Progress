import React, { useEffect, useState } from 'react'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { GoogleLogin } from '@react-oauth/google';
import { LoginWithGoogle, LoginWithoutGoogle, registerUser, registerWithGoogle } from '../../utils/Queries';
import { useUserContext } from '../../utils/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [tc, setTc] = useState(false)
    const { loggedin, handleLoggedin, setUser, handleAccessToken } = useUserContext()
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedin) {
            navigate('/dashboard');
        }
    }, [loggedin])

    const responseMessage = async (response) => {
        const result = await LoginWithGoogle(response)
        console.log("Result: ", result.data)
        if (result.data.success) {
            const userData = result.data.data; // Assuming user information is in data

            await setUser(userData)
            await handleAccessToken({ access_token: result.data.data.access_token, user: userData });
            await handleLoggedin(true)
        }
        else {
            console.log("Some Unexpected error occured")
        }

    };
    const errorMessage = (error) => {
        console.log(error);
    };


    const handleSubmit = async () => {
        try {
            if (tc) {
                const res = await LoginWithoutGoogle({ email: email, password: password })
                if(res.data.success == false && res.data.code == "unverified"){
                    toast.error("Email not Verified! please check your inbox to verify mail.")
                }
                if(res.data.success == false && res.data.code == "oauth"){
                    toast.error("Looks like you created account using Google. Please Login with Google.")
                }
                if(res.data.success == false && res.data.code == "invalid"){
                    toast.error("Login Failed! Please Check your Email and password again.")
                }
                if(res.data.success == false && res.data.code == "error"){
                    toast.error("Sorry, Error from our Side ! Please hang in while we solve this issues. ")
                }
                
                if(res.data.success == true){
                    await setUser(res.data.data)
                    await handleAccessToken({ access_token: res.data.data.access_token, user: res.data.data });
                    await handleLoggedin(true)
                    toast.success("Logged into your Account")
                }
            }
            else {
                toast.warning("Please Check the T&C to continue")
            }

        } catch (error) {
            toast.error("Sorry! this time error from our side. Fixing the Issue.", error)
        }
    }
    return (
        <div>

            {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

            <section className="bg-white">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <aside
                        className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6"
                    >
                        <img
                            alt="Pattern"
                            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </aside>

                    <main
                        className="flex flex-col items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                    >

                        <Card color="transparent" shadow={false} className='w-full md:w-9/12 '>
                            <div className="relative -mt-16  items-center  flex flex-col">
                                <a
                                    className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
                                    href="/"
                                >
                                    <span className="sr-only">Home</span>
                                    <svg
                                        className="h-8 sm:h-10"
                                        viewBox="0 0 28 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </a>

                                <h1
                                    className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
                                >
                                    Welcome to Progress 
                                </h1>

                            </div>
                            <div className='my-5 mx-auto'>


                                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} className="flex items-center
                                bg-white border border-gray-300 rounded-lg shadow-md px-6 py-4 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"/>
                            </div>



                            <div class="inline-flex items-center justify-center w-full">
                                <hr class="w-full h-2 bg-gray-200 border-0 dark:bg-gray-700" />
                                <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">OR</span>
                            </div>
                            <form className="mt-8 mb-2 w-full">
                                <div className="mb-1 flex flex-col gap-6">

                                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        Your Email <span className='text-red-500'>&#42;</span>
                                    </Typography>
                                    <Input
                                        size="lg"
                                        placeholder="name@mail.com"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        onChange={(e) => { setEmail(e.target.value); }}
                                        type='email'

                                    />
                                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        Password <span className='text-red-500'>&#42;</span>
                                    </Typography>
                                    <Input
                                        type="password"
                                        size="lg"
                                        placeholder="********"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        onChange={(e) => { setPassword(e.target.value); }}

                                    />
                                </div>
                                <Checkbox
                                    label={
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="flex items-center font-normal"
                                        >
                                            I agree the
                                            <a
                                                href="#"
                                                className="font-medium transition-colors hover:text-gray-900"
                                            >
                                                &nbsp;Terms and Conditions
                                            </a>
                                        </Typography>
                                    }
                                    containerProps={{ className: "-ml-2.5" }}
                                    onChange={(e) => { setTc(!tc) }}
                                />
                                <Button className="mt-6" fullWidth onClick={handleSubmit}>
                                    sign in
                                </Button>
                                <Typography color="gray" className="mt-4 text-center font-normal">
                                    Dont have an account?{" "}
                                    <a href="#" className="font-medium text-gray-900">
                                        Sign UP
                                    </a>
                                </Typography>
                            </form>
                        </Card>

                    </main>
                </div>
            </section>
        </div>
    )
}

export default Login