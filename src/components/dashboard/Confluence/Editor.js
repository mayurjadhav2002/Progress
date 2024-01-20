import React, { memo, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import CodeTool from "@calumk/editorjs-codeflask";
import styles from "../../../styles/editorjs.module.css"; 

const Editor = ({ data, onChange, editorblock }) => {
  const ref = useRef();
  useEffect(() => {
    //Initialize editorjs if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorblock,

        tools: {
          embed: Embed,
          table: Table,
          list: List,
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
        //   code: CodeTool,

          warning: Warning,
          code: CodeTool,
          linkTool: LinkTool,
          image: {
            class: ImageTool,
            inlineToolbar: true,

            config: {
              endpoints: {
                byFile: `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL}/uploadImage/uploadFile`,
                byUrl: `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL}/uploadImage/uploadFile`,
              },
            },
          },
          raw: Raw,
          header: Header,
          quote: Quote,
          marker: Marker,
          checklist: CheckList,
          delimiter: Delimiter,
          inlineCode: InlineCode,
          simpleImage: SimpleImage,
        },
        data: data,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
        },
      });
      ref.current = editor;
      if (!ref.current) {
        ref();
      }
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);
  return <div id={editorblock} className={styles.editorContainer}  />;
};

export default memo(Editor);
