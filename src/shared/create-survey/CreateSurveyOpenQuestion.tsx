import {Input} from "antd"
import { useEffect, useState } from "react"

const CreateSurveyOpenQuestion = () =>{
    const [answer, setAnswer] = useState<string>("")
    useEffect(()=>{
        setAnswer(answer)
    }, [answer])
    return (
        <div>
            <Input variant="filled" placeholder="Ответ" size='large' className="text-[#72849A66] bg-[#FAFAFA]" value={answer} onChange={e => setAnswer(e.target.value)}></Input>
        </div>
    )
}

export default CreateSurveyOpenQuestion