import { Avatar, Typography, avatar } from "@material-tailwind/react";
import React from "react";
import { useState } from "react";

import { useUserContext } from "../../../utils/UserContext/UserContext";

import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { ImageUploader } from "../../../utils/Queries";

function Profile(props) {
  const { user, setUser, HandleAccountUpdate } = useUserContext();
  var img;
  const [file, setFile] = useState(user?.avatar);
  const ImgChange = async (e) => {
    img = await e.target.files[0];
    await setFile(URL.createObjectURL(img));

    handleImageUpload();
  };

  const HandleChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
  };

  const handleImageUpload = async () => {
    try {
      const res = await ImageUploader(img);
      if (res.success) {
        setUser({ ...user, avatar: res.imageUrl });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col gap-5 mt-5">
      <div>
        <Label>Name </Label>
        <Input name="name" value={user?.name} onChange={HandleChange} />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Avatar</Label>
        <div className="flex items-center gap-5 ">
          <Avatar src={file} className="w-10 h-10" />{" "}
          <Input id="picture" type="file" onChange={ImgChange} />
        </div>
      </div>
      <div>
        <Label>Email </Label>
        <Input name="email" value={user?.email} onChange={HandleChange} />
      </div>
      <div>
        <Label>Bio </Label>
        <Textarea
          name="bio"
          onChange={HandleChange}
          placeholder="Tell us a little bit about yourself"
          className="resize-none"
        />
      </div>
      <Button onClick={HandleAccountUpdate}>Update Profile</Button>
    </div>
  );
}

export default Profile;
