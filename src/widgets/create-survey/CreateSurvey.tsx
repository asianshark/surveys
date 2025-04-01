import { Input } from "antd"
import CreateSurveyQuestion from "./CreateSurveyQuestion"
import { useEffect, useState } from "react"
import { Question, Survey } from "../../entities/Survey"
import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined"

const CreateSurvey = ({ setSurveyQuestions }: { setSurveyQuestions: (survey: Survey) => void }) => {

    const [surveyName, setSurveyName] = useState("")
    const [surveyDescription, setSurveyDescription] = useState("")
    const [questions, setQuestions] = useState<Question[] | []>([])
    const setQuestion = (question: Question, ind: number) => {
        setQuestions((prev) => {
            const questions = [...prev];
            questions[ind] = question;
            return questions; 
        });
    }
    const addVariant = () =>{
        const question = {nameRu: "", required: false}
        setQuestions((prev) => {
            const questions = [...prev];
            questions[questions.length] = question;
            return questions;
        });
    }
    useEffect(() => {
        setSurveyQuestions({ questions: questions, nameRu: surveyName, nameKz: surveyDescription })
    }, [questions, surveyName, surveyDescription])
    return (
        <div className="flex flex-col items-center bg-[#E6E6FA] h-full overflow-y-auto gap-6 pt-3">
            <div className="bg-white rounded-[10px] border-[#E6EBF1] border-1 p-5 flex flex-col gap-4 w-3/4">
                <div>Основное</div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="text-[14px]">Наименование опроса</div>
                        <Input size="large" value={surveyName} onChange={e => setSurveyName(e.target.value)} placeholder="Новый опрос"></Input>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-[14px]">Описание</div>
                        <Input size="large" value={surveyDescription} onChange={e => setSurveyDescription(e.target.value)} placeholder="Описание (необязательно)"></Input>
                    </div>
                </div>
            </div>
            {questions.length ?  questions.map((item, ind) =>
                <CreateSurveyQuestion key={ind} setQuestionP={e => setQuestion(e, ind)} />
            ) : <CreateSurveyQuestion setQuestionP={e => setQuestion(e, 0)}/>}
            <div className="pb-4">
                <button onClick={addVariant} className="text-2xl text-[#72849A] p-5 rounded-[10px] bg-white flex border-[#E6EBF1] border-1"><PlusCircleOutlined/></button>
            </div>
        </div>
    )
}

export default CreateSurvey