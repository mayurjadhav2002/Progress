import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { TbSettings } from "react-icons/tb";
import { useLocation, useParams } from "react-router-dom";
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
import { useConfluenceContext } from "../../../../utils/WriteContext/ConfluenceContext";
import { GetDocumentbyID } from "../../../../utils/Queries";
import { useUserContext } from "../../../../utils/UserContext/UserContext";
import { toast } from "react-toastify";



function WriteNew() {
  const { user } = useUserContext();
  const { id } = useParams();
  const location = useLocation();
  let Update = "Publish";
  const {
    setDocument_title,
    HandleGetFolders,
    setChange,
    published,
    setLoading,
    group,
    setGroup,
    setDocId,
    HandleGetDocs,
    doc_id,
    loading,
    confluenceState,
    setConfluenceStateValues,
    HandleUpdate,
  } = useConfluenceContext();
  const [data, setData] = useState();
  const [query, setQuery] = useState("");

  useLayoutEffect(() => {
    const fetchData = async (id, userId) => {
      try {
        setConfluenceStateValues({ doc_id: id });
        const res = await HandleGetDocs({ id: id, userId: userId });
        if (res && res.success) {
          setData(res.data.document);
          setConfluenceStateValues({
            document_title: res.data.document_title,
            group: res.data.group,
            doc: data,
          });
          toast.success("Documentation Fetched")
        }
      } catch (error) {
        // console.error("Error fetching data:", error);
        toast.error("Some Expected Error Occured!")
      }
    };
    
    if (location?.pathname.includes("/doc/") && id) {
      fetchData(id, user?._id);
      Update = "Update";
    }
  }, [id, location]);

  const HandlePublish = async () => {
    HandleUpdate({ published: true, doc: data });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="px-5">
      <div className="flex justify-between items-start">
        <Typography variant="h4" className="flex gap-2">
          {Update == "Update" ? confluenceState.document_title : "New Document"}
        </Typography>
        <div className="flex items-center gap-5">
          <Button variant="text">Saved a Draft</Button>
          <button
            className="text-white bg-gradient-to-r from-blue-700 via-blue-800 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={HandlePublish}
          >
            {published ? Update + "ed" : Update}
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
            value={confluenceState.document_title}
            onChange={(e) => {
              setDocument_title(e.target.value);
              setChange(true);
            }}
          />
        </div>
        <div className="px-20 rounded dark:bg-[#1e1e1e] dark:text-white">
          <Editor
            data={data}
            onChange={setData}
            editorblock="editorjs-container"
          />
        </div>
      </div>
    </div>
  );
}

export default WriteNew;
