import { useEffect, useMemo, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Autosave,
  Essentials,
  Paragraph,
  List,
  TodoList,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Highlight
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

const LICENSE_KEY = "GPL";

const CkEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig = useMemo(() => {
    if (!isLayoutReady) return {};

    return {
      licenseKey: LICENSE_KEY,
      toolbar: {
        items: [
          "undo",
          "redo",
          "|",
          "fontSize",
          "fontFamily",
          "fontColor",
          "fontBackgroundColor",
          "|",
          "bold",
          "italic",
          "underline",
          "|",
          "highlight",
          "|",
          "bulletedList",
          "numberedList",
          "todoList"
        ]
      },
      plugins: [
        Autosave,
        Essentials,
        Paragraph,
        List,
        TodoList,
        Bold,
        Italic,
        Underline,
        Strikethrough,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        Highlight
      ]
    };
  }, [isLayoutReady]);

  return (
    <>
      {editorConfig && (
        <CKEditor
          editor={ClassicEditor}
          data={value}
          config={editorConfig}
          onChange={(event, editor) => {
            onChange(editor.getData());
          }}
        />
      )}
    </>
  );
};

export default CkEditor;
