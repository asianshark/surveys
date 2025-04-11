/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useLayoutEffect, useEffect, forwardRef } from "react";
import ReactQuill from "react-quill";
const { Quill } = ReactQuill;
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";


const Editor = forwardRef(({ readOnly, defaultValue, onTextChange, onSelectionChange, setContent }: any, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const onTextChangeRef = useRef(onTextChange);
  const onSelectionChangeRef = useRef(onSelectionChange);

  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange;
    onSelectionChangeRef.current = onSelectionChange;
  });

  useEffect(() => {
    (ref as any).current?.enable(!readOnly);
  }, [ref, readOnly]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Очистка контейнера перед созданием редактора
    container.innerHTML = "";
    const editorContainer = document.createElement("div");
    container.appendChild(editorContainer);

    const quill = new Quill(editorContainer, {
        modules: {
            syntax: {
            highlight: (text: string) => hljs.highlightAuto(text).value,
          },
          
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true
    },
            toolbar: '.toolbar-container',
          },
      theme: "snow",
    });

    (ref as any).current = quill;

    if (defaultValueRef.current) {
      quill.setContents(defaultValueRef.current);
    }
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
    quill.on(Quill.events.TEXT_CHANGE, (...args) => {
      onTextChangeRef.current?.(...args);
      setContent(quill.getContents())
    });
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
    quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
      onSelectionChangeRef.current?.(...args);
    });
    return () => {
      (ref as any).current = null;
      container.innerHTML = "";
    };
  }, [ref]);

  return (
    <div>
    <div className="toolbar-container">
        <span className="ql-formats">
            <select className="ql-font"></select>
            <select className="ql-size"></select>
        </span>
        <span className="ql-formats">
            <button className="ql-bold"></button>
            <button className="ql-italic"></button>
            <button className="ql-underline"></button>
            <button className="ql-strike"></button>
        </span>
        <span className="ql-formats">
            <select className="ql-color"></select>
            <select className="ql-background"></select>
        </span>
        <span className="ql-formats">
            <button className="ql-blockquote"></button>
            <button className="ql-code-block"></button>
        </span>
        <span className="ql-formats">
            <button className="ql-list" value="ordered"></button>
            <button className="ql-list" value="bullet"></button>
            <button className="ql-indent" value="-1"></button>
            <button className="ql-indent" value="+1"></button>
        </span>
        <span className="ql-formats">
            <button className="ql-clean"></button>
        </span>
    </div>
      <div ref={containerRef}></div>
    </div>
  );
});

export default Editor;
