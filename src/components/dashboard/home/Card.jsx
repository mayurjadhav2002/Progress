import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../utils/UserContext/UserContext";
import { getProjectCounts } from "../../../utils/Queries";
import { MdDashboard } from "react-icons/md";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { SiGoogledocs } from "react-icons/si";
import { MdOutlineStorage } from "react-icons/md";
import { GrStorage } from "react-icons/gr";
import { Link } from "react-router-dom";

import { Loading } from "../../Misc/Loadings";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Typography } from "@material-tailwind/react";

const CardComponent = (props) => {
  const { user, userActivityCount, setUserActivityCount } = useUserContext();
  const [DataFetched, setDataFetched] = useState(false);
  if (!DataFetched) {
    try {
      if (user?._id) {
        getProjectCounts(user._id)
          .then((res) => {
            setUserActivityCount(res);
          })
          .then((data) => setDataFetched(true))

          .catch((error) => {
            setDataFetched(true);
            console.error("Error fetching user activity counts:", error);
          });
        const timeoutId = setTimeout(() => {
          setDataFetched(false);
        }, 5 * 60 * 1000); // 5 minutes in milliseconds

        // Cleanup the timeout on component unmount
        return () => clearTimeout(timeoutId);
      }
    } catch (error) {
      console.log("Some error occured", error);
    }
  }
  if (!userActivityCount || !userActivityCount.success) {
    return (
      <>
        <Loading />
      </>
    );
  }

  console.log(userActivityCount);
  return (
    <section>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 py-2 pt-5">
            <CardTitle className="text-md font-medium">Boards</CardTitle>
            <MdDashboard className="dark:text-white " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userActivityCount.projectCount}
            </div>
            <p className="text-xs text-muted-foreground">
              boards created by you
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 py-2 pt-5">
            <CardTitle className="text-md font-medium">
              Documentations
            </CardTitle>
            <SiGoogledocs className="dark:text-white " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userActivityCount.documentCount}
            </div>
            <p className="text-xs text-muted-foreground">
              Documents written by you
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 py-2 pt-5">
            <CardTitle className="text-md font-medium">Space 1</CardTitle>
            <MdOutlineStorage className="dark:text-white " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(userActivityCount.projectStorageStats / 1024).toFixed(2)} Mb
            </div>
            <p className="text-xs text-muted-foreground">
              Storage utilized for Boards
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 py-2 pt-5">
            <CardTitle className="text-md font-medium">Space 2</CardTitle>
            <GrStorage className="dark:text-white " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(userActivityCount.documentsStorageStats / 1024).toFixed(2)} Mb
            </div>
            <p className="text-xs text-muted-foreground">
              Storage utilized for Documentation
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-5">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Shared with you</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {userActivityCount.sharedProjects
                ? userActivityCount.sharedProjects.map((project, index) => (
                    <Link
                      to={`/dashboard/user/board/${project._id}`}
                      key={index}
                      className="flex w-full flex-col gap-1 bg-gray-50 hover:bg-muted p-5 rounded-md"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold">{project.title}</div>
                        </div>
                        <div
                          className={"ml-auto text-xs text-muted-foreground"}
                        >
                          3 day ago
                        </div>
                      </div>
                      <div className="text-xs font-medium flex gap-1">
                        Created by{" "}
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={project.created_by.avatar} />{" "}
                        </Avatar>{" "}
                        <b>{project.created_by.name}</b>{" "}
                      </div>
                      <div className="line-clamp-1 text-xs text-muted-foreground">
                        {project.description}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>{project.keyword}</Badge>
                      </div>
                    </Link>
                  ))
                : "No Projects Created"}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recently Edited </CardTitle>
            <CardDescription>
              You made {userActivityCount.recentlyEditedDocs.length} edits this
              month.
            </CardDescription>
          </CardHeader>
          <CardContent>
           

            {userActivityCount.recentlyEditedDocs 
              ? userActivityCount.recentlyEditedDocs.map((docs,index)=> (
                <div className="py-2 hover:bg-muted -px-2" key={index}>
                <Link to={`/dashboard/user/documentation/doc/${docs.docID}`}>
                  <Typography variant="h7">
                    {docs.document_title}
                    <small className="ml-2">Edited on 12 Feb</small>
                  </Typography>
                </Link>
              </div>
              ))
              : "No Documentations Created Yet"}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CardComponent;
