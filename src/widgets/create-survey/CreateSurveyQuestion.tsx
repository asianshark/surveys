import { Input, Select, Space, Switch } from "antd"
import { useEffect, useState } from "react";
import SurveyTableTab from "../../shared/surveys/SurveyTableTab";
import CreateSurveyQuestionRadioCheckbox from "../../shared/create-survey/CreateSurveyQuestionRadioCheckbox/CreateSurveyQuestionRadioCheckbox";
import { SettingOutlined, CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { Answer, Question } from "../../entities/Survey";
import CreateSurveyOpenQuestion from "../../shared/create-survey/CreateSurveyOpenQuestion";
import CreateSurveyScale from "../../shared/create-survey/CreateSurveyScale";
import QuestionSettingsModal from "../../shared/create-survey/QuestionSettingsModal/QuestionSettingsModal";
type CreateSurveyQuestionProps = {
    disabled?: boolean;
    quizzType?: string;
    settings?: string[];
    valid?: {
        valid: boolean;
        questionId: number | undefined;
    };
    type: string;
    questionP: Question;
    setQuestionP?: (question: Question) => void;
    duplicateQuestion?: () => void;
    deleteQuestionP?: () => void;
    selectedAns?: (ans: number[]) => void;
    onClick?: (key: number | undefined) => void;
};
const CreateSurveyQuestion: React.FC<CreateSurveyQuestionProps> = ({
    disabled,
    quizzType,
    settings,
    valid,
    type,
    questionP,
    setQuestionP,
    duplicateQuestion,
    deleteQuestionP,
    selectedAns,
    onClick,
}) => {
    const [lang, setLang] = useState("Рус")
    const [question, setQuestion] = useState<Question>(questionP)
    const [answers, setAnswers] = useState<Answer[]>([{ nameRu: "Неизвестный ответ",nameKz: "Белгісіз жауап", correct: true, key: 0 }]);
    const [questionType, setQuestionType] = useState(questionP.multipleAns ? 'multiplechoices' : 'singlechoice')
    const [isRequired, setIsRequired] = useState(questionP.required)
    const [visible, setVisible] = useState(false)

    const handleChange = (value: string) => {
        setQuestionType(value)
    };
    const options = quizzType === 'survey' ? [
        {
            labelRu: 'Текст',
            labelKz: 'Мәтін',
            value: 'text'
        },
        {
            labelRu: "Один из списка",
            labelKz: "Тізімнен біреу",
            value: 'singlechoice'
        },
        {
            labelRu: "Несколько из списка",
            labelKz: "Тізімнен бірнешеу",
            value: "multiplechoices"
        },
        {
            labelRu: 'Шкала',
            labelKz: "Шкала",
            value: "scale"
        }
    ] : [
        {
            labelRu: "Один из списка",
            labelKz: "Тізімнен біреу",
            value: 'singlechoice'
        },
        {
            labelRu: "Несколько из списка",
            labelKz: "Тізімнен бірнешеу",
            value: "multiplechoices"
        }]

    useEffect(() => {
        if (setQuestionP)
            setQuestionP({ multipleAns: questionType === 'multiplechoices', required: isRequired, nameRu: question?.nameRu, nameKz: question?.nameKz, active: true, answers: answers })
    }, [question, answers, isRequired, questionType])

    const deleteQuestion = () => {
        if (deleteQuestionP)
            deleteQuestionP()
    }
    const onClose = () => {
        setVisible(false)
    }
    const setSettingsModal = (value: string, key: number, diagram: boolean, lang: string) => {
        setAnswers((prev) => {
            return prev.map(answer =>
                answer.key === key
                    ? { ...answer, [lang === "Рус" ? (diagram ? "diagramsNameRu" : 'noteNameRu') : (diagram ? "diagramsNameKz" : 'noteNameKz')]: value }
                    : answer
            );
        });
    }
    return (
        <div onClick={() => onClick && onClick(question.key)} className={"bg-white rounded-[10px] border-1 p-5 flex flex-col gap-4 w-3/4 " + (valid && !valid?.valid && valid?.questionId === questionP.id ? 'border-red-500 border-2' : 'border-[#E6EBF1]')}>
            <div className="flex gap-2">
                <div className="flex gap-2 w-full text-[16px] text-[#455560] items-center">
                    {type === 'create' && !disabled ?
                        (lang === "Рус" ?
                            <Input style={{ fontFamily: 'Roboto' }} size={'large'} value={question?.nameRu} placeholder="Вопрос" onChange={e => setQuestion({ nameRu: e.target.value, nameKz: question?.nameKz, required: question?.required, key: question.key })} /> :
                            <Input style={{ fontFamily: 'Roboto' }} size={'large'} value={question?.nameKz} placeholder="Сұрақ" onChange={e => setQuestion({ nameRu: question?.nameRu, nameKz: e.target.value, required: question?.required, key: question.key })} />)
                        :
                        <div className="flex gap-1">{lang === "Рус" ? question?.nameRu : question?.nameKz} <p className={isRequired ? 'text-red-500' : 'hidden'}>*</p></div>}
                    <Select
                        style={{ width: '100%', display: (type !== 'create' || disabled) ? 'none' : 'block' }}
                        size={'large'}
                        value={questionType}
                        defaultValue={'multiplechoices'}
                        onChange={handleChange}
                        options={options.map(opt => ({
                            label: lang === "Рус" ? opt.labelRu : opt.labelKz,
                            value: opt.value,
                        }))}
                        optionRender={(option) => (
                            <Space>
                                <span role="img" aria-label={option.data.label}>
                                    {option.data.label}
                                </span>
                            </Space>
                        )}
                    />
                </div>
                <SurveyTableTab disabled={!settings?.includes('multilang')} tabs={["Рус", "Қаз"]} onChange={setLang} activeTab={lang} />
            </div>
            {questionType === "text" ? <CreateSurveyOpenQuestion /> : (
                questionType === "scale" ? <CreateSurveyScale /> :
                    <CreateSurveyQuestionRadioCheckbox disabled={disabled} quizzType={quizzType} surveyType={type} setSelectedAns={selectedAns} answersP={question?.answers} lang={lang} type={questionType} getAnswer={setAnswers} />
            )}
            {
                (type === 'create' && !disabled) &&
                < div className="flex justify-end">
                    <div className="flex gap-6 items-center justify-between">
                        <div>
                            <div className="text-2xl flex gap-6">
                                {settings?.includes('feedback') && <SettingOutlined onClick={() => setVisible(true)} />}
                                <CopyOutlined onClick={duplicateQuestion} />
                                <DeleteOutlined onClick={deleteQuestion} />
                            </div>
                        </div>

                        {quizzType === 'survey' && <hr className="w-[24px] text-[#E6EBF1] rotate-90" />}
                        {quizzType === 'survey' &&
                            <div className="flex items-center gap-4">
                                <div>
                                    {lang === "Рус" ? 'Обязательный вопрос' : 'Міндетті сұрақ'}
                                </div>
                                <Switch value={isRequired} onChange={e => setIsRequired(e)} />
                            </div>}
                    </div>
                </div>
            }
            <QuestionSettingsModal answers={answers} onClose={onClose} onSettingsChange={setSettingsModal} settings={settings} visible={visible} />
        </div >)
}

export default CreateSurveyQuestion