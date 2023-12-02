import React, { createContext, useContext, useEffect, useState } from 'react';
import { CreateDoc, CreateOrUpdateDoc, GetDocumentbyID, GetFolderDoc, getDocumentByFolder } from '../Queries';
import { useUserContext } from '../UserContext/UserContext';

// Create the context
const ConfluenceContext = createContext();

// Create the context provider component
export function ConfluenceContextProvider({ children }) {
    const { user } = useUserContext()
    const [doc_id, setDocId] = useState('')
    const [document_title, setDocument_title] = useState('')
    const [doc, setDocument] = useState('')
    const [group, setGroup] = useState({name: 'main', color: '#1565cf'})
    const [published, setPublished] = useState(false)
    const [shared_with, setShared_with] = useState('')
    const [folders, setFolder] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [change, setChange] = useState(false)
    const [folderFetched, setFolderFetched] = useState(false)
    const [docCreate, setDocCreate]=useState(false)
    const HandleGetFolders = async () => {

        const res = await GetFolderDoc({ userId: user?._id })
        if (res) {
            setFolder(res.data.data)
        } else {
            console.log("Some error occured")
        }
    }

    const HandleCreateNew = async (props) => {
        try {
            console.log("Creating new Blog")
        } catch (error) {
            console.log("Error while Creating new Blog")
            throw new Error()
        }
    }


    const HandleUpdate = async (props) => {
        try {
            setSaving(true)
            const res = await CreateOrUpdateDoc({doc_id: doc_id, created_by: user._id, 
                document_title:document_title,
                document: doc,
                group: group,
                published: props?.published ? props?.published : false
            })
            if (res) {
                console.log("new blog Created /Updated")
            } else {
                console.log("Some error occured")
            }
            setSaving(false)
             
        } catch (error) {
            console.log("unexpected error occured", error)
        }
    }

    const HandleDelete = async (props) => {
        try {
            console.log("Delete blog")
        } catch (error) {
            console.log("Error while Deleting new Blog")
            throw new Error()
        }
    }

    const HandleGetDocs = async(props) =>{
        try {
            const Doc = await GetDocumentbyID(props?.doc_id, user?._id)
            if(Doc){
                console.log(Doc)
            }
        } catch (error) {
            console.log("Some error occured", error)
        }
    }

    const HandleShare = async (props) => {
        try {
            console.log("Shared doc with User")
        } catch (error) {
            console.log("Error while Sharing Doc")
            throw new Error()
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            if (!folderFetched) {
                await HandleGetFolders();
                setLoading(false);
                setFolderFetched(true)
            }

            if (change) {
                await HandleUpdate()
                setChange(false)
            }
        };


        // Set a timeout to delay the data fetching
        const timeoutId = setTimeout(fetchData, 10000); // Adjust the delay time as needed (e.g., 1000 milliseconds)

        // Cleanup function to clear the timeout if the component unmounts
        return () => {
            clearTimeout(timeoutId);
        };

    }, [change, folderFetched, setFolderFetched, HandleUpdate, setChange, HandleGetFolders]);

    const exportValues = {
        document_title, setDocument_title, HandleGetFolders, folders, setFolder,
        doc, setDocument, loading, setLoading,
        group, setGroup,saving, setSaving,
        published, setPublished,doc_id, setDocId,
        shared_with, setShared_with, change, setChange,setDocCreate, docCreate,
        HandleCreateNew, HandleUpdate, HandleDelete, HandleShare,HandleGetDocs
    }
    return (
        <ConfluenceContext.Provider value={exportValues}>
            {children}
        </ConfluenceContext.Provider>
    );
}

// Custom hook to use the context
export function useConfluenceContext() {
    return useContext(ConfluenceContext);
}