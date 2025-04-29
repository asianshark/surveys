import { Input } from "antd"
import { useEffect, useState } from "react"
import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined"
import TextArea from "antd/es/input/TextArea"
import CreateSurveyQuestion from "../../../../../shared/Survey/CreateSurveyQuestion"
import SurveyTableTab from "../../../../../shared/surveys/SurveyTableTab"
import { Question } from "../../../../../entities/SurveysTests/Quiz/QuestionSchema"
import { Survey } from "../../../../../entities/SurveysTests/Quiz/SurveySchema"

const CreateSurvey = ({ quizzType, settings, setSurveyQuestions, surveyQuestions }: { quizzType: string | undefined, surveyQuestions: Survey, settings: string[], setSurveyQuestions: (survey: Survey) => void }) => {
    const [lang, setLang] = useState("Рус")
    const [surveyName, setSurveyName] = useState<{ nameRu: string, nameKz: string }>({ nameRu: surveyQuestions.nameRu, nameKz: surveyQuestions.nameKz || '' })
    const [surveyDescription, setSurveyDescription] = useState(surveyQuestions.description)
    const [questions, setQuestions] = useState<Question[]>(surveyQuestions.questions)
    const [keys, setKeys] = useState(1)
    const [focused, setFocused] = useState<number | undefined>(keys)

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
        setQuestions((prev) => [...prev, { key: keys, nameRu: "", nameKz: "", required: false }])
        setFocused(keys)
    }
    const deleteQuestion = (key: number | undefined) => {
        const ind = questions.findIndex((item) => item.key === key);
        if (ind !== -1)
            setQuestions((prev) => prev.filter((_, index) => index !== ind));
    }
    const duplicateQuestion = (key: number | undefined) => {
        setKeys(keys + 1)
        const ind = questions.findIndex((item) => item.key === key);
        if (ind !== -1)
            setQuestions((prev) => [...prev, { ...questions[ind], key: keys }])
    }
    useEffect(() => {
        setSurveyQuestions({ questions: questions, nameRu: surveyName.nameRu, nameKz: surveyName.nameKz })
    }, [questions, surveyName, surveyDescription])
    const quizName = (name: string) => {
        if (name === 'plaseholder')
            return lang === "Рус" ? ('Новый ' + (quizzType === 'survey' ? 'опрос' : 'тест')) : ('Жаңа ' + (quizzType === 'survey' ? 'сауалнама' : 'тест'))
        return lang === "Рус" ? ('Наименование ' + (quizzType === 'survey' ? 'опроса' : 'теста')) : ((quizzType === 'survey' ? 'Сауалнама' : 'Тест') + ' аты')
    }
    return (
        <div className="flex flex-col items-center bg-[#E6E6FA] h-full overflow-y-auto gap-6 pt-3">
            <div className="bg-white rounded-[10px] border-[#E6EBF1] border-1 p-5 flex flex-col gap-4 w-3/4">
                <div className="flex justify-between items-center">
                    <div>{lang === "Рус" ? 'Основное' : 'Бастысы'}</div>
                    <SurveyTableTab disabled={!settings?.includes('multilang')} tabs={["Рус", "Қаз"]} onChange={setLang} activeTab={lang} />
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="text-[14px]">{quizName('name')}</div>
                        <Input style={{ fontFamily: 'Roboto' }} size="large" value={lang === "Рус" ? surveyName.nameRu : surveyName.nameKz} onChange={e => setSurveyName({ ...surveyName, [lang === "Рус" ? 'nameRu' : 'nameKz']: e.target.value })} placeholder={quizName('placeholder')}></Input>

                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-[14px]">Описание</div>
                        <TextArea style={{ fontFamily: 'Roboto' }} size="large" value={surveyDescription} onChange={e => setSurveyDescription(e.target.value)} placeholder="Описание (необязательно)" />
                    </div>
                </div>
            </div>
            {questions.map((item, i) =>
                <CreateSurveyQuestion onClick={e => e !== undefined ? setFocused(e) : setFocused(keys)} disabled={i !== focused} quizzType={quizzType} duplicateQuestion={() => duplicateQuestion(item.key)} settings={settings} type="create" questionP={item} key={item.key} deleteQuestionP={() => deleteQuestion(item.key)} setQuestionP={e => setQuestion(e, item.key)} />
            )}
            <div className="pb-4">
                <button onClick={addVariant} className="text-2xl text-[#72849A] p-5 rounded-[10px] bg-white flex border-[#E6EBF1] border-1"><PlusCircleOutlined /></button>
            </div>
        </div>
    )
}

export default CreateSurvey