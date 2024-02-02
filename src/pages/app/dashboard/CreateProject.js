import React from "react";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { useUserContext } from "../../../utils/UserContext/UserContext";
import { createProject } from "../../../utils/Queries";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Label } from "../../../components/ui/label";
import { FaArrowRight, FaCircleInfo } from "react-icons/fa6";

function CreateProject() {
  const { user } = useUserContext();
  const [props, setProps] = useState({
    created_by: user?._id,
    title: "",
    description: "",
    timeline: "",
    keyword: "",
  });
  const navigate = useNavigate();
  const OnSubmit = async () => {
    if (!user.verified_account) {
      toast.error("⚠️ Sorry, you can't create any new Project.");
      toast.error(
        "📧 Looks like your account is not verified, please check email to verify."
      );
      return;
    }
    const response = await createProject(props);
    if (response) {
      toast.success("Project Created SuccessFully");
      navigate(`/dashboard/user/board/${response.data.data._id}`);
    } else {
      console.log("error", response);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold">
        Managing Project is gonna be easy now!
      </h1>

      <div className="py-5">
        <div class="mb-6">
          <Label variant="h7" color="blue-gray">
            Project Name
          </Label>
          <input
            type="text"
            id="default-input"
            onChange={(e) => {
              setProps((prevProps) => ({
                ...prevProps,
                title: e.target.value,
              }));
            }}
            placeholder="e.g. frontend-google-chrome"
            className="bg-gray-50 mt-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
                            p-2.5 dark:bg-gray-900 dark:border-gray-800 dark:placeholder-gray-400
     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div class="mb-6">
          <Label>Project Description</Label>
          <input
            type="text"
            id="default-input"
            onChange={(e) => {
              setProps((prevProps) => ({
                ...prevProps,
                description: e.target.value,
              }));
            }}
            placeholder="e.g. refer this for frontend work of chrome"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                             dark:bg-gray-900 dark:border-gray-800 mt-1 dark:placeholder-gray-400
     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div class="mb-6 grid grid-cols-1  lg:grid-cols-3 lg:gap-12">
          <div className="">
            <Label variant="h7" color="blue-gray">
              Project Deadline
            </Label>
            <input
              type="date"
              id="default-input"
              onChange={(e) => {
                setProps((prevProps) => ({
                  ...prevProps,
                  timeline: e.target.value,
                }));
              }}
              placeholder="e.g. refer this for frontend work of chrome"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-800 mt-1 dark:placeholder-gray-400
     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            <Label
              variant="small"
              color="gray"
              className="mt-2 flex items-center gap-1 font-normal"
            >
              <FaCircleInfo />
              You can update this anytime
            </Label>
          </div>

          <div className="">
            <Label variant="h7" color="blue-gray">
              Team
            </Label>
            <input
              type="text"
              id="default-input"
              onChange={(e) => {
                setProps((prevProps) => ({
                  ...prevProps,
                  keyword: e.target.value,
                }));
              }}
              placeholder="e.g. Marketing, Frontend etc"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-800 mt-1 dark:placeholder-gray-400
dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        <Button
          onClick={OnSubmit}
          type="button"
          size="lg"
          className="flex items-center gap-2 mt-20"
        >
          Create Project <FaArrowRight />
        </Button>
      </div>
    </>
  );
}

export default CreateProject;
