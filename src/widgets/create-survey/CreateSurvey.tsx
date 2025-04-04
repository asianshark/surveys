import { Input } from "antd"
import CreateSurveyQuestion from "./CreateSurveyQuestion"
import { useEffect, useState } from "react"
import { Question, Survey } from "../../entities/Survey"
import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined"
import SurveyTableTab from "../../shared/surveys/SurveyTableTab"
import TextArea from "antd/es/input/TextArea"

const CreateSurvey = ({ multilang, setSurveyQuestions, surveyQuestions }: { surveyQuestions: Survey, multilang: boolean, setSurveyQuestions: (survey: Survey) => void }) => {
    const [lang, setLang] = useState("Рус")
    const [surveyName, setSurveyName] = useState<{ nameRu: string, nameKz: string }>({ nameRu: surveyQuestions.nameRu, nameKz: surveyQuestions.nameKz || '' })
    const [surveyDescription, setSurveyDescription] = useState(surveyQuestions.description)
    const [questions, setQuestions] = useState<Question[]>(surveyQuestions.questions)
    const [keys, setKeys] = useState(1)

    const setQuestion = (question: Question, key: number | undefined) => {
        const ind = questions.findIndex((item) => item.key === key);
        if (ind !== -1)
            setQuestions((prev) =>
                prev.map((ques, index) =>
                    ind === index
                        ? { ...question, key: key }
                        : ques
                )
            );

    }
    const addVariant = () => {
        setKeys(keys + 1)
        setQuestions((prev) => [...prev, { key: keys, nameRu: "", required: false }])
        console.log(questions);
    }
    const deleteQuestion = (key: number | undefined) => {
        const ind = questions.findIndex((item) => item.key === key);
        if (ind !== -1)
            setQuestions((prev) => prev.filter((_, index) => index !== ind));
    }
    useEffect(() => {
        setSurveyQuestions({ questions: questions, nameRu: surveyName.nameRu, nameKz: surveyName.nameKz, description: surveyDescription })
    }, [questions, surveyName, surveyDescription])
    return (
        <div className="flex flex-col items-center bg-[#E6E6FA] h-full overflow-y-auto gap-6 pt-3">
            <div className="bg-white rounded-[10px] border-[#E6EBF1] border-1 p-5 flex flex-col gap-4 w-3/4">
                <div className="flex justify-between items-center">
                    <div>Основное</div>
                    <SurveyTableTab disabled={!multilang} tabs={["Рус", "Қаз"]} onChange={setLang} activeTab={lang} />
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="text-[14px]">Наименование опроса</div>
                        <Input size="large" value={lang === "Рус" ? surveyName.nameRu : surveyName.nameKz} onChange={e => setSurveyName({ ...surveyName, [lang === "Рус" ? 'nameRu' : 'nameKz']: e.target.value })} placeholder="Новый опрос"></Input>

                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-[14px]">Описание</div>
                        <TextArea size="large" value={surveyDescription} onChange={e => setSurveyDescription(e.target.value)} placeholder="Описание (необязательно)"/>
                    </div>
                </div>
            </div>
            {questions.map((item) =>
                <CreateSurveyQuestion multilang={multilang} type="create" questionP={item} key={item.key} deleteQuestionP={() => deleteQuestion(item.key)} setQuestionP={e => setQuestion(e, item.key)} />
            )}
            <div className="pb-4">
                <button onClick={addVariant} className="text-2xl text-[#72849A] p-5 rounded-[10px] bg-white flex border-[#E6EBF1] border-1"><PlusCircleOutlined /></button>
            </div>
        </div>
    )
}

export default CreateSurvey