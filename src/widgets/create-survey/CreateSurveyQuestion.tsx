import { Input, Select, Space, Switch } from "antd"
import { useEffect, useState } from "react";
import SurveyTableTab from "../../shared/surveys/SurveyTableTab";
import CreateSurveyQuestionRadioCheckbox from "../../shared/create-survey/CreateSurveyQuestionRadioCheckbox";
import { SettingOutlined, CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { Answer, Question } from "../../entities/Survey";
import CreateSurveyOpenQuestion from "../../shared/create-survey/CreateSurveyOpenQuestion";
import CreateSurveyScale from "../../shared/create-survey/CreateSurveyScale";
const CreateSurveyQuestion = ({ setQuestionP }: { setQuestionP: (question: Question) => void }) => {
    const [questionType, setQuestionType] = useState('singlechoice')
    const [isRequired, setIsRequired] = useState(false)
    const handleChange = (value: string) => {
        setQuestionType(value)
    };
    const options = [
        {
            label: 'Текст',
            value: 'text'
        },
        {
            label: "Один из списка",
            value: 'singlechoice'
        },
        {
            label: "Несколько из списка",
            value: "multiplechoices"
        },
        {
            label: 'Шкала',
            value: "scale"
        }
    ]
    const [lang, setLang] = useState("Рус")
    const [question, setQuestion] = useState<{ nameRu: string, nameKz: string }>({ nameRu: "", nameKz: "" })
    const [answers, setAnswers] = useState<Answer[]>([{ nameRu: "", nameKz: "", correct: true }]);
    useEffect(() => {
        setQuestionP({ multipleAns: questionType === 'multiplechoices', required: isRequired, nameRu: question.nameRu, nameKz: question.nameKz,active: true, answers: answers })
    }, [question, answers, isRequired, questionType])
    return (
        <div className="bg-white rounded-[10px] border-[#E6EBF1] border-1 p-5 flex flex-col gap-4 w-3/4">
            <div className="flex gap-2">
                <div className="flex gap-2 w-full">
                    {lang === "Рус" ?
                        <Input value={question.nameRu} placeholder="Вопрос" onChange={e => setQuestion({ nameRu: e.target.value, nameKz: question.nameKz })} /> :
                        <Input value={question.nameKz} placeholder="Вопрос" onChange={e => setQuestion({ nameRu: question.nameRu, nameKz: e.target.value })} />}
                    <Select
                        style={{ width: '100%' }}
                        size={'large'}
                        value={questionType}
                        defaultValue={'multiplechoices'}
                        onChange={handleChange}
                        options={options}
                        optionRender={(option) => (
                            <Space>
                                <span role="img" aria-label={option.data.label}>
                                    {option.data.label}
                                </span>
                            </Space>
                        )}
                    />
                </div>
                <SurveyTableTab tabs={["Рус", "Қаз"]} onChange={setLang} activeTab={lang} />
            </div>
            {questionType === "text" ? <CreateSurveyOpenQuestion/> : (
                questionType === "scale" ? <CreateSurveyScale/> :
                    <CreateSurveyQuestionRadioCheckbox lang={lang} type={questionType} getAnswer={setAnswers} />
            )}
            <div className="flex justify-end">
                <div className="flex gap-6 items-center justify-between">
                    <div>
                        <div className="text-2xl flex gap-6">
                            <SettingOutlined />
                            <CopyOutlined />
                            <DeleteOutlined />
                        </div>
                    </div>
                    <hr className="w-[24px] text-[#E6EBF1] rotate-90" />
                    <div className="flex items-center gap-4">
                        <div>
                            Обязательный вопрос
                        </div>
                        <Switch onChange={e => setIsRequired(e)} />
                    </div>
                </div>
            </div>

        </div>)
}

export default CreateSurveyQuestion