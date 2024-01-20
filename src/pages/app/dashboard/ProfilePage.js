import React from "react";
import { useUserContext } from "../../../utils/UserContext/UserContext";
import Profile from "../../../components/dashboard/user/Profile";
import { Separator } from "../../../components/ui/separator";

function ProfilePage() {
  const { user } = useUserContext();
  return (
    <div>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <Separator />
      </div>

      <Profile user={user} />
    </div>
  );
}

export default ProfilePage;
