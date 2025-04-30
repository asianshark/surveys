import { Button, Tabs } from "antd"
import CreateSurvey from "./CreateSurvey/CreateSurvey"
import { useState } from "react"
import axios from "axios"
import SurveySettings from "./CreateSurveySettings/SurveySettings"
import SurveyCalendar from "./CreateSurveyCalendar/SurveyCalendar"
import { checkValid, checkValidCalendar, checkValidSettings } from "../../hooks/CheckValidCreatedSyrvey"
import { useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next";
import { Calendar } from "../../../../entities/SurveysTests/Quiz/CalendarSchema"
import { Survey } from "../../../../entities/SurveysTests/Quiz/SurveySchema"
import { Jurisdiction } from "../../../../entities/SurveysTests/Quiz/SettingsSchema"

const CreateSurveyMain = () => {
    const { t } = useTranslation();
    const navigate = useNavigate()
    const quizzType = useParams().type
    const surveyName = quizzType === 'test' ? t('creating-test') : quizzType === 'competence' ? t('creating-competence-blank') : t('creating-survey')
    const [surveyQuestions, setSurveyQuestions] = useState<Survey>({
        nameRu: "",
        description: "",
        questions: [{  nameRu: "",nameKz: "", required: false, key: 0 }]
    })
    const [currentTab, setCurrentTab] = useState<string>('create')
    const [surveyCalendar, setSurveyCalendar] = useState<Calendar>()
    const [surveySettings, setSurveySettings] = useState<string[]>(['multilang', 'randomQuestions', 'type', 'feedback'])
    const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction>()
    const dayOfWeek = surveyCalendar?.everyWeek ? {dayOfWeek : surveyCalendar?.dayOfWeek} : {}
    const sendRequest = () => {
        const error = checkValid(surveyQuestions?.questions, surveyQuestions?.nameRu, surveyQuestions.nameKz, surveySettings.includes('multilang'), quizzType)
        if (error.valid && checkValidCalendar(surveyCalendar) && checkValidSettings(selectedJurisdiction?.division))
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/quizzes/v2`, {
                ...surveyQuestions,
                status: "DRAFT",
                authorId: "1",
                test: quizzType === 'test',
                type: true,
                startDate: surveyCalendar?.startDate,
                endDate: surveyCalendar?.endDate,
                everyDay: surveyCalendar?.everyDay,
                everyWeek: surveyCalendar?.everyWeek,
                everyMonth: surveyCalendar?.everyMonth,
                divisions: [
                    selectedJurisdiction?.division
                ],
                ...dayOfWeek
            }
            ).then(response => {
                console.log(response.data)
                navigate('/surveys-tests')
            }
            )
        else {
            sendReport()
            if (error.warning)
                alert(`Вы пропустили поле ${error.warning} ${error.lang ? `(${error.lang})` : ''} \n${error.questionKey ? `Вопрос №${error.questionKey}` : ''} \n${error.answerkey ? `Ответ №${error.answerkey}` : ''}`)
            else if (error.error)
                alert(error.error)
        }
    }
    const onChange = (key: string) => {
        setCurrentTab(key)
    };

    const items = [
        {
            key: 'create',
            label: surveyName,
        },
        {
            key: 'settings',
            label: t('settings'),
        },
        {
            key: 'calendar',
            label: t('calendar'),
        },
    ];

    const sendReport = () => {
        console.log("Incorrect survey");
    }
    const cancel = () => {
        navigate('/surveys-tests')
    }
    return (
        <div className="flex flex-col h-full text-[#1A3353]">
            <div className="px-6 pt-4 bg-white z-10">
                <div className="flex justify-between">
                    <p className="text-xl font-medium">{items.find(i => i.key === currentTab)?.label}</p>
                    <div className="flex gap-2">
                        <Button onClick={cancel}>{t('cancel')}</Button>
                        <Button disabled onClick={sendReport}>Черновик</Button>
                        <Button onClick={sendRequest} type="primary">{t('save')}</Button>
                    </div>
                </div>
                <div>
                    <Tabs style={{ marginBottom: '-16px' }} activeKey={currentTab} items={items} onChange={onChange} />
                </div>
            </div>
            {currentTab === 'create' ?
                <CreateSurvey quizzType={quizzType} surveyQuestions={surveyQuestions} settings={surveySettings} setSurveyQuestions={setSurveyQuestions} /> :
                (currentTab === 'settings' ?
                    <SurveySettings quizzType={quizzType} selectedJurisdiction={selectedJurisdiction} setSelectedJurisdiction={setSelectedJurisdiction} surveySettings={surveySettings} setSurveySettings={setSurveySettings} /> :
                    <SurveyCalendar surveyCalendar={surveyCalendar} setSurveyCalendar={setSurveyCalendar} />)}

        </div>
    )
}

export default CreateSurveyMain;