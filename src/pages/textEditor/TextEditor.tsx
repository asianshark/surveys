import { useState, useRef } from "react"
import { Quill } from "react-quill"
import Editor from "../../widgets/editor/Editor"
import TextEditerTabBar from "../../shared/editor/TextEditerTabBar"

// type Text = {
//     ops: [
//         {
//             attributes?: {
//                 header?: number,
//                 color?: string,
//                 bold?: boolean,
//                 link?: string,
//                 underline? : boolean,
//                 strike? : boolean,
//                 font? : string,
//                 size? : string,
//                 background? : string,
//                 blockquote? : boolean,
//                 'code-block'? : boolean,
//                 list? : string,
//                 indent? : number,
//                 token? : string
//             }
//             insert: string | { image: string },
//         }
//     ]
// }
const TextEditor = () => {
    const tabButtonStyle = {
        fontFamily: 'Roboto',
    }

    const [content, setContent] = useState("")
    const saveText = () => {
        console.log(content);
    }

    const [range, setRange] = useState();
    const [lastChange, setLastChange] = useState();
    const [readOnly, setReadOnly] = useState(false);
    console.log(range,lastChange, setReadOnly);
    
    // Use a ref to access the quill instance directly
    const quillRef = useRef(null);
    const Delta = Quill.import('delta');
    const getContent = (value: string) => {
        setContent(value)
    }

    return (
        <div className="flex flex-col">
            <div className='container border border-solid text-lg border-stone-200 rounded-lg'>
                <TextEditerTabBar></TextEditerTabBar>
                <Editor
                    ref={quillRef}
                    readOnly={readOnly}
                    defaultValue={new Delta()
                        .insert('Hello')
                        .insert('\n', { header: 1 })
                        .insert('Some ')
                        .insert('initial', { bold: true })
                        .insert(' ')
                        .insert('content', { underline: true })
                        .insert('\n')}
                    onSelectionChange={setRange}
                    onTextChange={setLastChange}
                    setContent={getContent}
                ></Editor>
                {/* <TextInput setParText={setText}></TextInput> */}
            </div>
            <div className='w-full mt-4 flex justify-end'>
                <button style={tabButtonStyle} onClick={saveText} className='mr-2 bg-white text-md text-blue-900 border border-gray-300 hover:text-gray-900 hover:border-gray-400 focus:ring-gray-400 rounded-lg px-4 py-1.5 item-center'>Сохранить</button>
                <button style={tabButtonStyle} className='bg-blue-500 text-sm text-white border border-gray-300 hover:bg-blue-700 focus:ring-gray-500 rounded-lg px-4 py-1.5 item-center'>Подписать и отправить на согласование</button>
            </div>
        </div>
    )
}

export default TextEditor