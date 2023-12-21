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
        throw new Error()

    }
}


export const LoginWithoutGoogle = async (props) => {
    try {
        const result = await axios.post('/login', props);
        console.log(result)
        return result
    } catch (error) {
        throw new Error()
    }
}

export const LoginWithGoogle = async (props) => {
    try {
        const result = await axios.post('/create-session', { credentials: props.credential })
        return result
    } catch (error) {
        throw new Error()

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
export const createProject = async (props) => {
    console.log(props)
    try {
        const response = await axios.post('/project/newproject', {
            created_by: props.created_by, title: props.title, description: props.description, timeline: props.timeline, keyword: props.keyword,
            collaborators: [{ userId: props.created_by }, { userId: props.created_by }]
        });

        if (response.status === 200) {
            return response // Return the actual data instead of true
        }
    } catch (error) {

    }
}
export const UpdateProject = async (props) => {
    try {
        console.log(props);
        const res = await axios.put(`/project/updateproject/${props.id}`, props.data);

        if (res.status === 200) {
            return res.data; // Return the response data
        } else {
            console.error("Some error occurred while updating the project");
        }
    } catch (error) {
        console.error(`Error updating project: ${error.message}`);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error(`Server response data: ${JSON.stringify(error.response.data)}`);
            console.error(`Server response status: ${error.response.status}`);
            console.error(`Server response headers: ${JSON.stringify(error.response.headers)}`);
        }
        throw new Error(`Error updating project: ${error.message}`);
    }
};


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
        console.log("Board updating")
        const response = await axios.put('/kanban/updateboard', { projectid: projectid, board: board })
        if (response.status === 200) {
            return response; // Return the actual data instead of true
        }
    } catch (error) {

    }
}

export const InviteCollaborator = async (props) => {
    try {
        const response = await axios.put(`/project/invite`, { email: props.email, id: props.id })
        if (response.status === 200) {
            console.log(response)
            return response; // Return the actual data instead of true
        }
        return null; // Return null instead of false if the status is not 200

    } catch (error) {
        console.log("Some error occurred: ", error);
        return null;
    }
}

export const UpdateCard = async (props) => {
    try {
        const response = await axios.put(`/kanban/updatecard?projectId=${props.projectId}&id=${props.id}&cardId=${props.cardId}`, props.card)
        if (response.status === 200) {
            console.log(response)
            return response; // Return the actual data instead of true
        }
        return null
    } catch (error) {

    }
}

export const GetFolderDoc = async (props) => {
    try {
        console.log(props)
        const response = await axios.put('/document/getfolder', {userId: props.userId});
        if (response.status === 200) {
            return response; // Return the actual data instead of true
        }
        return null
    } catch (error) {

    }
}

export const getSharedDocs = async (props) => {
    try {
        const response = await axios.get('/document/getSharedDocument', props);
        if (response.status === 200) {
            console.log(response)
            return response; // Return the actual data instead of true
        }
        return null
    } catch (error) {

    }
}


export const getDocumentByFolder = async (props) => {
    try {
        const response = await axios.post('/document/getDocumentByFolder',
            { userId: props.userId, folder: props.folder },
        );

        if (response.status === 200) {
            console.log(response); // Assuming your data is in the response.data property
            return response; // Return the actual data instead of the whole response
        }

        return null;
    } catch (error) {
        console.error('Error while fetching documents by folder:', error);
        throw error; // Re-throw the error so that the calling code can handle it if needed
    }
};



export const CreateOrUpdateDoc = async (props) => {
    console.log(props)
    try {
        const response = await axios.put('/document/updateDoc', props);
        if (response.status === 200) {
            console.log(response);
            return response.data.data; // Return the actual data instead of true
        }
        return null;
    } catch (error) {
        console.error("Error creating doc:", error);
    }
};


export const GetDocumentbyID = async (doc_id, userId) => {
    try {
        const response = await axios.post('/document/getDocumentById', {doc_id: doc_id, created_by:userId});
        if (response.status === 200) {
            console.log(response);
            return response.data; // Return the actual data instead of true
        }
    } catch (error) {
        console.error('Error while fetching documents by folder:', error);
        throw error; 
    }
}

export const fetchAllDocuments = async (userId) =>{
    console.log(userId)
    try {
        
        const res = await axios.post('/document/getAllDocuments', {userId:userId})
        if(res.status === 200){
            console.log(res)
            return res.data;
        }
    } catch (error) {
        console.log("Error while fetching the documents", error)
        throw new Error()
    }
}