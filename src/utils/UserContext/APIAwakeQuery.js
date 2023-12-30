import axios from "axios";
import Cookies from "js-cookie";
const currentTime = new Date().getTime();


export const APIAwakeQuery = (APIAwake, setAPIAwake) => {
  try {
    if (!APIAwake) {
      axios
        .get(process.env.REACT_APP_BACKEND_URL)
        .then((res) => {
          setAPIAwake(true);
          console.log(res);
          Cookies.set('APIAwake', currentTime, { expires: new Date(currentTime + 3600000) }); // 1 hour

        })
        .catch((error) => {
          console.log(
            "API might not be awake, recalling function again.\nError: ",
            error
          );
          setTimeout(() => {
            APIAwakeQuery(APIAwake, setAPIAwake);
          }, 5000);
        });
    }
  } catch (error) {
    console.log("Error occurred while sending API requests");
  }
};
