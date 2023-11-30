import React from 'react'

function Profile() {
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
 
  return (
    <div>
        
        Profile page
    </div>
  )
}

export default Profile