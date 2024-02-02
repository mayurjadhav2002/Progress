import React, { useEffect, useState } from 'react'
import {
    Card,
    Input,
    Checkbox,
    Typography,
} from "@material-tailwind/react";
import { GoogleLogin } from '@react-oauth/google';
import { LoginWithGoogle, LoginWithoutGoogle, registerUser, registerWithGoogle } from '../../utils/Queries';
import { useUserContext } from '../../utils/UserContext/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';

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
        try {
            const result = await LoginWithGoogle(response);
            console.log("Result: ", result);
    
            if (result.data.success) {
                const userData = result.data.data;
    
                setUser(userData);
                handleAccessToken({
                    access_token: result.data.data.access_token,
                    user: userData,
                });
                handleLoggedin(true);
            } else {
                console.log("Some Unexpected error occurred");
            }
        } catch (error) {
            console.error("Error in LoginWithGoogle:", error);
        }
    };
    
    const errorMessage = (error) => {
        console.error("Error in GoogleLogin:", error);
    };

    const handleSubmit = async () => {
        try {
            if (tc) {
                const res = await LoginWithoutGoogle({ email: email, password: password })
                if (res.data.success == false && res.data.code == "unverified") {
                    toast.error("Email not Verified! please check your inbox to verify mail.")
                }
                if (res.data.success == false && res.data.code == "oauth") {
                    toast.error("Looks like you created account using Google. Please Login with Google.")
                }
                if (res.data.success == false && res.data.code == "invalid") {
                    toast.error("Login Failed! Please Check your Email and password again.")
                }
                if (res.data.success == false && res.data.code == "error") {
                    toast.error("Sorry, Error from our Side ! Please hang in while we solve this issues. ")
                }
                if (res.data.success == true) {
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

            <section className="bg-white dark:bg-dark ">
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
                                    <img src='https://www.svgrepo.com/show/115206/letter-p.svg' className='rounded-full dark:border-white dark:border-2'/>
                                </a>

                                <h1
                                    className="mt-2 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl"
                                >
                                    Welcome to Progress
                                </h1>

                            </div>
                            <div className='my-5 mx-auto'>


                                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} className="flex items-center 
                                bg-white border border-gray-300 rounded-lg shadow-md px-6 py-4 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"/>
                            </div>



                            <div className="inline-flex items-center justify-center w-full">
                                <hr className="w-full h-2 bg-gray-200 border-0 dark:bg-gray-700" />
                                <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">OR</span>
                            </div>
                            <div className="mt-8 mb-2 w-full">
                                <div className="mb-1 flex flex-col gap-6">

                                    <Label className="-mb-3 dark:text-white">
                                        Your Email <span className='text-red-500'>&#42;</span>
                                    </Label>
                                    <Input
                                        size="lg"
                                        placeholder="name@mail.com"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        onChange={(e) => { setEmail(e.target.value); }}
                                        type='email'

                                    />
                                    <Label className="-mb-3 dark:text-white">
                                        Password <span className='text-red-500'>&#42;</span>
                                    </Label>

                                    <Input
                                        type="password"
                                        size="lg"
                                        placeholder="********"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
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
                                            className="flex items-center font-normal dark:text-white"
                                        >
                                            I agree the
                                            <Link
                                                href="#"
                                                className="font-medium transition-colors hover:text-gray-900 dark:text-blue-500 "
                                            >
                                                &nbsp;Terms and Conditions
                                            </Link>
                                        </Typography>
                                    }
                                    containerProps={{ className: "-ml-2.5" }}
                                    onChange={(e) => { setTc(!tc) }}
                                />
                                <Button className="mt-6 w-full" onClick={handleSubmit}>
                                    Sign In
                                </Button>
                                <Typography className="mt-4 text-center font-normal dark:text-white">
                                    Dont have an account?{" "}
                                    <Link to="/register" className="font-medium text-blue-500 underline">
                                        Sign Up Now
                                    </Link>
                                </Typography>
                            </div>
                        </Card>

                    </main>
                </div>
            </section>
        </div>
    )
}

export default Login