import axios from "axios";
import Cookies from "js-cookie";
axios.defaults.headers.common['Authorization'] = `${Cookies.get('access_token')}`;

export const registerUser = async (props) => {
    try {
        const result = await axios.post('/register', {
            name: props.name,
            email: props.email,
            password: props.password,
            tc: props.tc
        });
        return result

    } catch (error) {

    }
}

export const registerWithGoogle = async (props) => {
    try {
        const result = await axios.post('/create-session', { credentials: props.credential })
        return result
    } catch (error) {

    }
}




export const getprojects = async (userId) => {
    console.log("userid", userId)
    try {
        const response = await axios.post('/project/getprojects', { created_by: userId });

        if (response.status === 200) {
            return response.data; // Return the actual data instead of true
        }

        return null; // Return null instead of false if the status is not 200
    } catch (error) {
        console.log("Some error occurred: ", error);
        return null;
    }
};

// //             title: req.body.title,
// description: req.body.description,
// AddedGitRepo: req.body.addedgitrepo,
// timeline: new Date(formattedTimeline), // Parse the timeline string to Date
// keyword: req.body.keyword,
// // color: req.body.color
export const createProject = async(props) =>{
    console.log(props)
    try {
        const response = await axios.post('/project/newproject', { created_by: props.created_by, title: props.title, description: props.description, timeline: props.timeline, keyword: props.keyword,
        collaborators: [{userId:  props.created_by}, {userId:  props.created_by}]
        });

        if (response.status === 200) {
            return response // Return the actual data instead of true
        }   
    } catch (error) {
        
    }
}

export const getKanban = async (id) => {
    console.log("id", id)

    try {
        const response = await axios.post('/kanban/getboard', { projectid: id });
        if (response.status === 200) {
            console.log("Data updated to db")
            return response.data; // Return the actual data instead of true
        }

        return null; // Return null instead of false if the status is not 200
    } catch (error) {
        console.log("Some error occurred: ", error);
        return null;
    }
}


export const updateBoard = async (projectid, board) => {
    try {
        const response = await axios.put('/kanban/updateboard', { projectid: projectid, board: board })
        if (response.status === 200) {
            return response; // Return the actual data instead of true
        }
    } catch (error) {

    }
}