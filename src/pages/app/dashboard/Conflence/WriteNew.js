import React from "react";
import {
  ConfluenceContextProvider,
  useConfluenceContext,
} from "../../../../utils/WriteContext/ConfluenceContext";
import WriteDoc from "../../../../components/dashboard/Confluence/WriteDoc";
import { Button, Typography } from "@material-tailwind/react";
import { TbSettings } from "react-icons/tb";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import CSettings from "../../../../components/dashboard/Confluence/CSettings";
import { Loading } from "../../../../components/Misc/Loadings";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Separator } from "../../../../components/ui/separator";
import Editor from "../../../../components/dashboard/Confluence/Editor";
import { Input } from "../../../../components/ui/input";
import { GetDocumentbyID } from "../../../../utils/Queries";
import { useUserContext } from "../../../../utils/UserContext/UserContext";

const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "Start writing from here!",
        level: 3,
      },
    },
  ],
};
function WriteNew() {
  const { id } = useParams();
  const location = useLocation();
  const { user } = useUserContext();
  const [data, setData] = useState(INITIAL_DATA);
  const {
    document_title,
    setDocument_title,
    HandleGetFolders,
    folders,
    setChange,
    published,
    setFolder,
    loading,
    setLoading,
    group,
    setGroup,
    setDocId,
    doc_id,
    HandleUpdate,
  } = useConfluenceContext();

  const [query, setQuery] = useState("");

  useEffect(() => {
    setDocId(id);
    const handleUpdateRoute = async () => {
      const res = await GetDocumentbyID(id, user?._id);
      if(res.success){
        setData(res.data.document);
        setDocument_title(res.data.document_title);
        setGroup(res.data.group)
      }
   

    };

    // Check if the route contains "update/:id"
    if (location.pathname.includes("/doc/pm ") && id) {
      handleUpdateRoute();
    }
  }, [id, location.pathname, user]);

  const HandlePublish = async () => {
    HandleUpdate({ published: true });
  };

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <>
      <div className="px-5">
        <div className="flex justify-between items-start">
          <Typography variant="h4" className="flex gap-2">
            New Doc
          </Typography>
          <div className="flex items-center gap-5">
            <Button variant="text">Saved a Draft</Button>
            <button
              className="text-white bg-gradient-to-r from-blue-700 via-blue-800 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={HandlePublish}
            >
              {published ? "Published" : "Publish"}
            </button>

            <Dialog>
              <DialogTrigger>
                <TbSettings className="h-10 w-10 cursor-pointer hover:bg-blue-gray-50 rounded-md hover:scale-105 p-1 duration-150" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Additional Settings</DialogTitle>
                  <Separator />
                  <DialogDescription>
                    <CSettings
                      setQuery={setQuery}
                      HandlePublish={HandlePublish}
                    />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="bg-gray-100 py-2 px-2 my-3 rounded-t-2xl dark:bg-[#111115ee]">
          <div className="my-5">
            <Input
              placeholder="Headline or Title of the Document"
              className="border-0 border-b-2 dark:border-[#1e1e1e] dark:bg-[#1e1e1e] text-xl bg-transparent"
              value={document_title}
              onChange={(e) => {
                setDocument_title(e.target.value);
                setChange(true);
              }}
            />
          </div>
          <div className=" px-20 rounded dark:bg-[#1e1e1e] dark:text-white">
            <Editor
              data={data|| INITIAL_DATA}
              onChange={setData}
              editorblock="editorjs-container"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default WriteNew;
