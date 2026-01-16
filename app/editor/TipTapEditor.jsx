"use client";

import { useEffect, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { FiCornerUpLeft, FiCornerUpRight } from "react-icons/fi";
import Highlight from "@tiptap/extension-highlight";


import {
    FiBold,
    FiItalic,
    FiUnderline,
    FiList,
    FiAlignLeft,
    FiAlignCenter,
    FiAlignRight,
    FiLink,
} from "react-icons/fi";
import { AiOutlineFontColors } from "react-icons/ai";
import { FaStrikethrough } from "react-icons/fa";
import { TfiListOl } from "react-icons/tfi";
import { AiOutlineBgColors } from "react-icons/ai";

export default function TipTapEditor({ value, onChange }) {
    const colorInputRef = useRef(null);
    const highlightInputRef = useRef(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Highlight.configure({
                multicolor: true,
            }),
            Strike,
            TextStyle,
            Color,
            Link.configure({ openOnClick: false }),
            TextAlign.configure({ types: ["paragraph"] }),
            Placeholder.configure({
                placeholder: "Click here and start typing",
            }),
        ],
        content: value?.trim() ? value : "<p><br /></p>",
        immediatelyRender: false,
        onUpdate({ editor }) {
            onChange(editor.getText());
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getText()) {
            editor.commands.setContent(value?.trim() ? value : "<p><br /></p>");
        }
    }, [value, editor]);

    if (!editor) return null;

    const btn = (active) =>
        `relative group p-2 rounded-md transition-all duration-200
      text-[16px] !text-gray-600  hover:!text-[#800080]
     ${active ? "bg-[#f6efff] text-[#800080]" : "text-gray-600"}
     hover:text-[#800080] hover:bg-[#f6efff]`;

    const Tooltip = ({ text }) => (
        <span
            className="pointer-events-none z-50 absolute -top-5  left-1/2 -translate-x-1/2
      whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white
      opacity-0 group-hover:opacity-100 transition"
        >
            {text}
        </span>
    );
    return (
        <div className="border rounded-md text-sm bg-white">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 border-b px-2 py-1 bg-gray-50">

                <button className={btn(editor.isActive("bold"))}
                    onClick={() => editor.chain().focus().toggleBold().run()}>
                    <FiBold />
                    <Tooltip text="Bold" />
                </button>

                <button className={btn(editor.isActive("italic"))}
                    onClick={() => editor.chain().focus().toggleItalic().run()}>
                    <FiItalic />
                    <Tooltip text="Italic" />
                </button>

                <button className={btn(editor.isActive("underline"))}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}>
                    <FiUnderline />
                    <Tooltip text="Underline" />
                </button>

                <button className={btn(editor.isActive("strike"))}
                    onClick={() => editor.chain().focus().toggleStrike().run()}>
                    <FaStrikethrough />
                    <Tooltip text="Strikethrough" />
                </button>

                <span className="w-px h-4 bg-gray-500" />

                {/* Bullet list */}
                <button
                    className={btn(editor.isActive("bulletList"))}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <FiList />
                    <Tooltip text="Bullet list" />
                </button>

                {/* Ordered list */}
                <button
                    className={btn(editor.isActive("orderedList"))}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    <TfiListOl />
                    <Tooltip text="Numbered list" />
                </button>
                <span className="w-px h-4 bg-gray-500" />
                <button className={btn(editor.isActive({ textAlign: "left" }))}
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}>
                    <FiAlignLeft />
                    <Tooltip text="Align left" />
                </button>

                <button className={btn(editor.isActive({ textAlign: "center" }))}
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}>
                    <FiAlignCenter />
                    <Tooltip text="Align center" />
                </button>

                <button className={btn(editor.isActive({ textAlign: "right" }))}
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}>
                    <FiAlignRight />
                    <Tooltip text="Align right" />
                </button>

                <button className={btn(editor.isActive("link"))}
                    onClick={() => {
                        const url = prompt("Enter URL");
                        if (url) editor.chain().focus().setLink({ href: url }).run();
                    }}>
                    <FiLink />
                    <Tooltip text="Insert link" />
                </button>

                <span className="w-px h-4 bg-gray-500" />

                <button
                    type="button"
                    className={btn(false)}
                    onClick={() => colorInputRef.current?.click()}
                >
                    <AiOutlineFontColors />
                    <Tooltip text="Text color" />
                </button>

                <input
                    ref={colorInputRef}
                    type="color"
                    className="hidden"
                    onChange={(e) =>
                        editor.chain().focus().setColor(e.target.value).run()
                    }
                />
                <button
                    type="button"
                    className={btn(editor.isActive("highlight"))}
                    onClick={() => highlightInputRef.current?.click()}
                >
                    <AiOutlineBgColors />
                    <Tooltip text="Highlight" />
                </button>

                <input
                    ref={highlightInputRef}
                    type="color"
                    className="hidden"
                    onChange={(e) =>
                        editor
                            .chain()
                            .focus()
                            .toggleHighlight({ color: e.target.value })
                            .run()
                    }
                />

                <span className="w-px h-4 bg-gray-500" />
                <button
                    className={btn(false)}
                    onClick={() => editor.chain().focus().undo().run()}
                >
                    <FiCornerUpLeft />
                    <Tooltip text="Undo" />
                </button>

                <button
                    className={btn(false)}
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    <FiCornerUpRight />
                     <Tooltip text="Redo" />
                </button>

            </div>

            {/* Editor */}
            <div
                className="editor-wrapper p-3 min-h-[250px] text-sm font-medium text-gray-500 bg-[#eff2f9] cursor-text"
                onClick={() => editor.commands.focus()}
            >
                <EditorContent editor={editor} spellCheck={true} />
            </div>

        </div>
    );
}
