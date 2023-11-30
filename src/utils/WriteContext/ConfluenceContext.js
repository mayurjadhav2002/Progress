import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const ConfluenceContext = createContext();

// Create the context provider component
export function ConfluenceContextProvider({ children }) {
    const [doc_id, setDocId] = useState('')
    const [document_title, setDocument_title] = useState('')
    const [document, setDocument] = useState('')
    const [group, setGroup] = useState('')
    const [published, setPublished] = useState(false)
    const [shared_with, setShared_with] = useState('')

    const HandleGetDoc = async(props)=>{
        try {
            console.log("Fetching new Blog")
        } catch (error) {
            console.log("Error while Fetching new Blog")
            throw new Error()
        }
    }
    const HandleCreateNew = async(props)=>{
        try {
            console.log("Creating new Blog")
        } catch (error) {
            console.log("Error while Creating new Blog")
            throw new Error()
        }
    }

    const HandleUpdate = async(props) =>{
        try {
            console.log("Updating new Blog")

        } catch (error) {
            console.log("Error while Updating new Blog")
            throw new Error()
        }
    }

    const HandleDelete = async(props) =>{
        try {
            console.log("Delete blog")
        } catch (error) {
            console.log("Error while Deleting new Blog")
            throw new Error()
        }
    }

    const HandleShare = async(props)=>{
        try {
            console.log("Shared doc with User")
        } catch (error) {
            console.log("Error while Sharing Doc")
            throw new Error()
        }
    }

    const exportValues = {
        document_title, setDocument_title,
        document, setDocument,
        group, setGroup,
        published, setPublished,
        shared_with, setShared_with,
        HandleCreateNew, HandleGetDoc, HandleUpdate, HandleDelete, HandleShare
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
