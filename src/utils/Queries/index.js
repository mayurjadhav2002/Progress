import axios from "axios";

export const registerUser = async(props) =>{
    try {
        const result =  await axios.post('/register', {
            name: props.name,
            email: props.email,
            password: props.password,
            tc: props.tc
        })
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