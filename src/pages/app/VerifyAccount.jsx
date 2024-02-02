import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestNewVerification, verifyemail } from "../../utils/Queries";
import { Loading } from "../../components/Misc/Loadings";
import { Button } from "../../components/ui/button";
import { toast } from "react-toastify";
import { useUserContext } from "../../utils/UserContext/UserContext";

function VerifyAccount() {
  const params = useParams();
  const { user } = useUserContext();
  const [msg, setmsg] = useState("");
  const [verified, setVerified] = useState();

  useEffect(() => {
    if (user && user.email) {
      verifyemail(params.verification_token, user.email)
        .then((res) => {
          setVerified(res.success);
          setmsg(res.msg);
          user.verified_account = res.success;
        })
        .catch((e) => {
          setVerified(false);
          setmsg("Some Unexpected Error Occurred ☢");
        });
    }
  }, [params, user]);

  const RequestNewVerificationLink = async () => {
    if (user && user._id && user.email) {
      requestNewVerification(user._id, user.name, user.email).then((res) => {
        if (res) {
          toast.success(
            "New verification Email sent 💌, Please check your inbox"
          );
        }
      });
    }
  };

  return (
    <div className="relative flex min-h-full flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white dark:bg-dark" >
      <div className="max-w-xl px-5 text-center">
        {verified ? (
          <>
            {" "}
            <h2 className="mb-2 text-[42px] font-bold text-zinc-800 dark:text-blue-700">
              {msg.length > 0 ? msg : "Your Account is Now Verified"}
            </h2>
            <p className="mb-2 text-lg text-zinc-500">
            We are glad that you're making progress! Email Verified 🌟 
              <span className="font-medium text-indigo-500">{user.email}</span>.
            </p>
          </>
        ) : (
          <>
            <h2 className="mb-2 text-3xl dark:text-white font-bold text-zinc-800">
              {msg} <br />
            </h2>
            <h5 className="py-2 dark:text-white">
              Cannot verify your account, please recheck your email or request
              new verification.
            </h5>
            <Button onClick={RequestNewVerificationLink}>
              New Verification Link
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyAccount;
