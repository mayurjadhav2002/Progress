import React, { useState } from "react";
import { Label } from "../../../ui/label";
import { Separator } from "../../../ui/separator";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { useUserContext } from "../../../../utils/UserContext/UserContext";
import { toast } from "react-toastify";

function Account() {
  const { HandleAccountDelete } = useUserContext();
  const [input, setInput] = useState("");
  const HandleDelete = () => {
    if (input === "DELETE") {
      HandleAccountDelete();
    } else {
      toast.warning("Confirm Entering DELETE properly");
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Delete your Account.
        </p>
      </div>

      <Separator />

      <div>
        <Label>Delete Account </Label>
        <Input
          placeholder={"Enter DELETE to Remove your account permanently"}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
      <Button variant="destructive" onClick={HandleDelete}>
        Delete Account permanently
      </Button>
    </div>
  );
}

export default Account;
