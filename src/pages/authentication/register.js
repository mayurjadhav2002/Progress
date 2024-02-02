import React, { useEffect, useState } from "react";
import { Card, Input, Checkbox, Typography } from "@material-tailwind/react";
import { GoogleLogin } from "@react-oauth/google";
import { registerUser, registerWithGoogle } from "../../utils/Queries";
import { useUserContext } from "../../utils/UserContext/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tc, setTc] = useState(false);
  const {
    user,
    loggedin,
    handleLoggedin,
    setUser,
    accessToken,
    handleAccessToken,
  } = useUserContext();
  const [isEmailValid, setIsEmailValid] = useState(true);

  const navigate = useNavigate();
  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      setIsEmailValid(true);
      return true;
    } else {
      setIsEmailValid(false);
      return false;
    }
  };
  useEffect(() => {
    if (loggedin) {
      navigate("/dashboard");
    }
  }, [loggedin]);

  const responseMessage = async (response) => {
    try {
      if (tc) {
        const result = await registerWithGoogle(response);
        if (result.data.success) {
          const userData = result.data.data; // Assuming user information is in data
          await setUser(userData);
          await handleAccessToken({
            access_token: result.data.data.access_token,
            user: userData,
          });
          await handleLoggedin(true);
          toast.success("New Account Created");
        } else {
          toast.error("Some error occured, please try after some time");
        }
      } else {
        toast.warning("Please Accept Terms and Conditions");
      }
    } catch (error) {
      toast.error("Sorry! Error from our side");
    }
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  const handleSubmit = async () => {
    try {
      const isEmailValid = validateEmail(email);

      if (!isEmailValid) {
        toast.warning("Email is not valid");
        return;
      }
      if (tc) {
        const res = await registerUser({
          name: name,
          email: email,
          password: password,
          tc: tc,
        });
        if (res.data.success == false && res.data.code == "exists") {
          toast.error("User with This Email already Exists, please login");
        }

        if (res.data.success == false && res.data.code == "error") {
          toast.error("Some error occured, please try after some time");
        }

        if (res.data.success == true && res.data.code == "success") {
          const userData = res.data.data; // Assuming user information is in data
          await setUser(userData);
          await handleAccessToken({
            access_token: res.data.data.access_token,
            user: userData,
          });
          await handleLoggedin(true);
          toast.success("New Account Created");
        }
      } else {
        toast.warning("Please Accept Terms and Conditions");
      }
    } catch (error) {
      toast.error("Sorry! Error from our side");
    }
  };
  return (
    <div className="flex justify-center items-center">
      <section className="bg-white  dark:bg-dark">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Night"
              src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <a className="block text-white" href="/">
                <span className="sr-only">Home</span>
                <img
                  src="https://www.svgrepo.com/show/115206/letter-p.svg"
                  className="h-16 w-16 bg-blue-200 p-2 rounded-sm"
                />
              </a>

              <h2 className="mt-6 text-2xl font-bold text-white dark:text-white sm:text-3xl md:text-4xl">
                Welcome to Progress
              </h2>

              <p className="mt-4 leading-relaxed text-white/90 dark:text-white">
                Elevate project management with our agile tool, providing
                Kanban-based sprint tracking, collaborative features, and
                efficient documentation.
              </p>
            </div>
          </section>

          <main className="flex items-center mx-auto justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <Card color="transparent" shadow={false} className="w-full ">
              <div className="relative -mt-16  items-center  flex ">
                <a
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
                  href="/"
                >
                  <span className="sr-only">Home</span>
                  <img
                    src="https://www.svgrepo.com/show/115206/letter-p.svg"
                    className="h-10 w-10 mx-2"
                  />
                </a>

                <h1 className="mt-2 mx-2 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
                  Welcome to Progress
                </h1>
              </div>
              <div className="my-5 mx-auto">
                <GoogleLogin
                  onSuccess={responseMessage}
                  onError={errorMessage}
                  className="flex items-center
                                bg-white border border-gray-300 rounded-lg shadow-md px-6 py-4 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                />
              </div>

              <div class="inline-flex items-center justify-center w-full">
                <hr class="w-full h-2 bg-gray-200 border-0 dark:bg-gray-700" />
                <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
                  OR
                </span>
              </div>
              <div className="mt-8 mb-2 w-full">
                <div className="mb-1 flex flex-col gap-6">
                  <Label className="-mb-3 dark:text-white">Your Name</Label>
                  <Input
                    size="lg"
                    type="text"
                    placeholder="John Doe"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <Label className="-mb-3 dark:text-white">Your Email</Label>
                  <Input
                    size="lg"
                    type="email"
                    placeholder="name@mail.com"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <Label className="-mb-3 dark:text-white">Password</Label>
                  <Input
                    type="password"
                    size="lg"
                    placeholder="********"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
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
                        to="/"
                        className="font-medium transition-colors hover:text-gray-900 text-blue-500"
                      >
                        &nbsp;Terms and Conditions
                      </Link>
                    </Typography>
                  }
                  containerProps={{ className: "-ml-2.5" }}
                  onChange={(e) => {
                    setTc(!tc);
                  }}
                />
                <Button
                  className="mt-6 w-full"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Sign up
                </Button>
                <Typography
                  color="gray"
                  className="mt-4 text-center font-normal dark:text-white"
                >
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium  text-blue-500">
                    Sign In
                  </Link>
                </Typography>
              </div>
            </Card>
          </main>
        </div>
      </section>
    </div>
  );
}

export default Register;
