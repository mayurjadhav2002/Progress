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

  const handleDelete = () => {
    if (input.toLowerCase() === "delete") {
      HandleAccountDelete();
    } else {
      toast.warning("Please enter 'DELETE' to confirm account deletion.");
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
        <Label>Delete Account</Label>
        <Input
          placeholder="Enter 'DELETE' to remove your account permanently"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <Button variant="destructive" onClick={handleDelete}>
        Delete Account Permanently
      </Button>
    </div>
  );
}

export default Account;
