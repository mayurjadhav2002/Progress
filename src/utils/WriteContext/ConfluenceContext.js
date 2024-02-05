import React, { createContext, useContext, useEffect, useState } from "react";
import {
  CreateOrUpdateDoc,
  GetDocumentbyID,
  GetFolderDoc,
  fetchAllDocuments,
} from "../Queries";
import { useUserContext } from "../UserContext/UserContext";
import { toast } from "react-toastify";

const ConfluenceContext = createContext();

export function ConfluenceContextProvider({ children }) {
  const { user } = useUserContext();
  const [confluenceState, setConfluenceState] = useState({
    doc_id: "",
    document_title: "",
    doc: "",
    group: { name: "main", color: "#1565cf" },
    published: false,
    shared_with: "",
    folders: [],
    loading: true,
    saving: false,
    change: false,
    folderFetched: false,
    docCreate: false,
    userAllDocs: [],
    deleted: false,
  });

  const {
    doc_id,
    document_title,
    doc,
    group,
    published,
    folders,
    loading,
    saving,
    change,
    folderFetched,
    docCreate,
    userAllDocs,
    deleted,
  } = confluenceState;

  const setConfluenceStateValues = (values) => {
    setConfluenceState((prevState) => ({ ...prevState, ...values }));
  };

  const HandleGetFolders = async () => {
    const res = await GetFolderDoc({ userId: user._id });
    if (res) {
      setConfluenceStateValues({ folders: res.data });
    } else {
      console.log("Some error occurred");
    }
  };

  const HandleUpdate = async (props) => {
    try {
      setConfluenceStateValues({ saving: true });
      const res = await CreateOrUpdateDoc({
        doc_id: doc_id,
        created_by: user._id,
        document_title: document_title,
        document: props.doc,
        group: group,
        published: props.published,
        deleted: deleted,
      });

      setConfluenceStateValues({ published: props.published });

      if (res) {
        console.log("New blog Created/Updated", res);
      } else {
        console.log("Some error occurred");
      }

      setConfluenceStateValues({ saving: false });
    } catch (error) {
      console.log("Unexpected error occurred", error);
    }
  };

  const HandleGetDocs = async (props) => {
    try {
      const Doc = await GetDocumentbyID(props.id, props.userId);
      if (Doc.status === 200) {
        
        return Doc;
      }else{
        toast.error("Error Fetching your Doc! please try after some time!")
      }
    } catch (error) {
      toast.error("Some Expected Error Occured!")

      console.log("Some error occurred", error);
    }
  };

  const HandleFetchAllDocuments = async () => {
    try {
      setConfluenceStateValues({ loading: true });

      if (user._id) {
        const alldoc = await fetchAllDocuments(user._id);
        setConfluenceStateValues({ userAllDocs: alldoc });
      } else {
        console.log("Cannot fetch user Data.");
      }

      setConfluenceStateValues({ loading: false });
    } catch (error) {
      toast.error("Some Expected Error Occured!")

      console.log("Error while fetching documents", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!folderFetched) {
        await HandleGetFolders();
        setConfluenceStateValues({ loading: false, folderFetched: true });
      }

      if (change) {
        await HandleUpdate();
        setConfluenceStateValues({ change: false });
      }
    };

    const timeoutId = setTimeout(fetchData, 10000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    change,
    folderFetched,
    HandleUpdate,
    setConfluenceStateValues,
    HandleGetFolders,
  ]);

  const exportValues = {
    ...confluenceState,
    confluenceState,
    setConfluenceState,
    setConfluenceStateValues,
    HandleGetFolders,
    HandleUpdate,
    HandleGetDocs,

    HandleFetchAllDocuments,
  };

  return (
    <ConfluenceContext.Provider value={exportValues}>
      {children}
    </ConfluenceContext.Provider>
  );
}

export function useConfluenceContext() {
  return useContext(ConfluenceContext);
}
