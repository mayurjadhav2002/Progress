import axios from "axios";
import Cookies from "js-cookie";
axios.defaults.headers.common['Authorization'] = `${Cookies.get('access_token')}`;

export const registerUser = async(props) =>{
    try {
        const result =  await axios.post('/register', {
            name: props.name,
            email: props.email,
            password: props.password,
            tc: props.tc
        });
        return result
        
    } catch (error) {
        
    }
}

export const registerWithGoogle = async(props) => {
    try {
        const result = await axios.post('/create-session', {credentials: props.credential})
        return result
    } catch (error) {
        
    }
}




export const getprojects = async (userId) => {
    console.log("userid",userId)
    try {
        const response = await axios.post('/project/getprojects',{ created_by: userId });

        if (response.status === 200) {
            return response.data; // Return the actual data instead of true
        }

        return null; // Return null instead of false if the status is not 200
    } catch (error) {
        console.log("Some error occurred: ", error);
        return null;
    }
};


export const getKanban = async(id) =>{
    console.log("id",id)

    try {
        const response = await axios.post('/kanban/getboard',{projectid: id });
        if (response.status === 200) {
            return response.data; // Return the actual data instead of true
        }

        return null; // Return null instead of false if the status is not 200
    } catch (error) {
        console.log("Some error occurred: ", error);
        return null;
    }
}