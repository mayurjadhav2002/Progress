import { Avatar, Typography } from "@material-tailwind/react";
import React from "react";
import { useState } from "react";

import { useUserContext } from "../../../utils/UserContext/UserContext";
import { TfiEmail } from "react-icons/tfi";
import { GoOrganization } from "react-icons/go";
import { RxCalendar } from "react-icons/rx";
import moment from "moment";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";

function Profile(props) {
  const { user } = useUserContext();

  const [file, setFile] = useState(user?.avatar);
  function handleChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
      // You may want to save the selected file to use it when updating the avatar on the server
      // For example: uploadAvatar(selectedFile);
    }
  }
  return (
    <div className="flex flex-col gap-5 mt-5">


      <div>
        <Label>Name </Label>
        <Input value={user?.name} />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Avatar</Label>
        <div className="flex items-center gap-5 ">
          <Avatar
            src={file || user?.avatar}
      
            className="w-10 h-10"
          />{" "}
          <Input id="picture" type="file" onChange={handleChange} />
        </div>
      </div>
      <div>
        <Label>Email </Label>
        <Input value={user?.email} />
      </div>
      <div>
        <Label>Bio </Label>
        <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                />
      </div>
      <Button>Update Profile</Button>
    </div>
  );
}

export default Profile;
