import React, { useEffect, useState } from "react";
import {
  AiOutlineStar,
  AiOutlineClockCircle,
  AiOutlineShareAlt,
  AiOutlineFullscreen,
  AiFillHome,
} from "react-icons/ai";
import Settings from "./settings";
import { differenceInDays } from "date-fns";
import { useProjectContext } from "../../../utils/ProjectContext/ProjectContext";
import SavingLoader from "../../Misc/SavingLoader";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

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
        <p>
          {remainingDays === 0
            ? "Today is the deadline"
            : `${remainingDays} days remaining`}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

function Header(props) {
  const { saving, timeline, title } = useProjectContext();

  return (
    <div className="flex flex-row items-start lg:flex-row justify-between ">
      <div className="flex flex-col gap-2">
        <ol className="flex items-center gap-1 text-sm text-gray-600">
          <li>
            <Link to="/" className="block transition hover:text-gray-700">
              <span className="sr-only">Home</span>

              <AiFillHome />
            </Link>
          </li>

          <li className="rtl:rotate-180">
            <MdKeyboardArrowRight />
          </li>

          <li>
            <Link
              to="/dashboard"
              className="block transition hover:text-gray-700"
            >
              Dashboard
            </Link>
          </li>

          <li className="rtl:rotate-180">
            <MdKeyboardArrowRight />
          </li>

          <li>
            <Link
              to="/project"
              className="block transition hover:text-gray-700"
            >
              Project
            </Link>
          </li>
        </ol>

        <h1 className="text-2xl font-bold ">{title}</h1>
      </div>
      <div className="flex items-center gap-3 ">
        {saving && (
          <div className="w-10 ">
            <SavingLoader />
          </div>
        )}
        <AiOutlineStar className="w-3.5 h-3.5 lg:w-6 lg:h-6 hover:text-yellow-700" />
        <span className="hidden lg:flex xl:flex items-center gap-2 p-2 rounded-lg">
          <AiOutlineClockCircle className="w-3.5 h-3.5 lg:w-6 lg:h-6 dark:text-white" />
          <Countdown targetDate={timeline} />
        </span>
        <AiOutlineShareAlt className="w-3.5 h-3.5 lg:w-6 lg:h-6 hover:text-blue-700 dark:text-white" />
        <AiOutlineFullscreen className="w-3.5 h-3.5 lg:w-6 lg:h-6 hover:text-blue-700 dark:text-white cursor-pointer" />

        <Settings />
      </div>
    </div>
  );
}

export default Header;
