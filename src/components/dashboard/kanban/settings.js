import React, { useEffect, useState } from "react";

import { GiSettingsKnobs } from "react-icons/gi";
import { format } from "date-fns";

import { IoSettings } from "react-icons/io5";
import Team from "./subComponents/Team";
import { useUserContext } from "../../../utils/UserContext/UserContext";
import {
  InviteCollaborator,
  InviteUser,
  UpdateProject,
} from "../../../utils/Queries";
import { useProjectContext } from "../../../utils/ProjectContext/ProjectContext";
import {  toast } from "react-toastify";
import {
  Dialog,
  DialogContent,

  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import DeleteProject from "./subComponents/DeleteProject";
import InviteUsers from "./subComponents/InviteUsers";
import ProjectSetting from "./subComponents/ProjectSetting";
import { Separator } from "../../ui/separator";
import { RiSettings3Fill } from "react-icons/ri";
function Settings(props) {
  const { create_by, collaborators } = useProjectContext();

  const { user } = useUserContext();
  const [open, setOpen] = React.useState(false);

  const [changesList, setChangesList] = useState([]);
  const [owner, setOwner] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  useEffect(() => {
    if (user && create_by === user._id) {
      setOwner(true);
    }
  }, [owner, create_by]);
  const handleOpen = () => setOpen(!open);

  const { title, inviteCode } = useProjectContext();
  const HandleinviteNewEditor = async () => {
    try {
      // Assuming InviteUser returns a promise resolving to an object with a status property
      const invite = await InviteUser({
        userId: user._id,
        sharing: "board",
        shared_with: inviteEmail,
        project_name: title,
        token: inviteCode.toString(),
        userName: user.name,
      });

      console.log(invite); // Log for debugging

      // Check if the status code is 200 (or adjust based on your API response)
      if (invite.status === 200) {
        toast.success("Invitation Sent");
      } else {
        toast.error("Some Error occurred while sending Invite");
      }
    } catch (error) {
      console.error("Error occurred while inviting:", error);
      toast.error("Error occurred while sending Invite");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant="secondary" title={"Setting"}>
            <RiSettings3Fill className="w-4 h-4 lg:w-6 lg:h-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Tabs defaultValue="Project" className="w-full">
            <TabsList>
              <TabsTrigger value="Project">Project</TabsTrigger>
              <TabsTrigger value="Share">Invite </TabsTrigger>
              <TabsTrigger value="Delete" className="text-red-500">
                Delete{" "}
              </TabsTrigger>
            </TabsList>
            <Separator className="my-2" />
            <TabsContent value="Project">
              <ProjectSetting />
            </TabsContent>
            <TabsContent value="Share">
              <InviteUsers
                collaborators={collaborators}
                owner={owner}
                HandleinviteNewEditor={HandleinviteNewEditor}
                setInviteEmail={setInviteEmail}
                inviteEmail={inviteEmail}
              />
            </TabsContent>
            <TabsContent value="Delete">
              <DeleteProject owner={owner} />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Settings;
