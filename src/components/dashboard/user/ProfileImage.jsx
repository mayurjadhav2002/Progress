import { useState } from "react";

 const ProfileImage = (props) => {
    const [previewImage, setPreviewImage] = useState(props?.image);
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleUploadImage = () => {
        const data = new FormData();
        data.append('files[]', previewImage);

        fetch(process.env.REACT_APP_IMGBB_CRED, { method: 'POST', body: data }).then(async (response) => {
            const imageResponse = await response.json();
            setUploadedImage(imageResponse);
        }).catch((err) => {
console.log("Some Error Occured while Uploading the Image")
alert("Some Error Occured while Uploading the Image")
        });
    }

    const handleSelectImage = (event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
            setPreviewImage(fileReader.result);
        });
        fileReader.readAsDataURL(file);
        handleUploadImage()
    }

    return (
        <>
        <div className="relative rounded-full cursor-pointer" title="Change Profile Image"> 

            <input type="file" onChange={handleSelectImage} className="w-full h-full absolute opacity-0" />
         
            
               <img
               className="h-32 w-32 rounded-full border-4 object-cover border-white dark:border-gray-800 mx-auto my-4"
               src={previewImage || props?.image}
               alt=""
             />
             </div>
            
        </>
    );
}
export default ProfileImage