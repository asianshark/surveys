import { Button, Tabs } from "antd"
import CreateSurvey from "../../widgets/create-survey/CreateSurvey"
import { useState } from "react"
import { Calendar, Survey } from "../../entities/Survey"
import axios from "axios"
import SurveySettings from "./SurveySettings"
import SurveyCalendar from "./SurveyCalendar"
import { checkValid, checkValidCalendar, checkValidSettings } from "../../shared/create-survey/CheckValidCreatedSyrvey"
import { useNavigate } from "react-router"

const CreateSurveyMain = () => {
    const navigate = useNavigate()

    const [surveyQuestions, setSurveyQuestions] = useState<Survey>({
        nameRu: "",
        description: "",
        questions: [{ nameRu: "", required: false, key: 0 }]
    })
    const [currentTab, setCurrentTab] = useState<string>("create")
    const [surveyCalendar, setSurveyCalendar] = useState<Calendar>()
    const [surveySettings, setSurveySettings] = useState<string[]>(['multilang', 'randomQuestions', 'type', 'feedback'])
    const [selectedDevesion, setSelectedDevesion] = useState<{ id: number | undefined, divisionName: string | undefined }>()
    const sendRequest = () => {
        const error = checkValid(surveyQuestions?.questions, surveyQuestions?.nameRu, surveyQuestions.nameKz, surveySettings.includes('multilang'))
        if (error.valid && checkValidCalendar(surveyCalendar) && checkValidSettings(selectedDevesion))
            axios.post("/quizzes", {
                ...surveyQuestions,
                status: "DRAFT",
                authorId: "1",
                type: true,
                startDate: surveyCalendar?.startDate,
                endDate: surveyCalendar?.endDate,
                everyDay: surveyCalendar?.everyDay,
                everyWeek: surveyCalendar?.everyWeek,
                everyMonth: surveyCalendar?.everyMonth,
                dayOfWeek: surveyCalendar?.dayOfWeek ? surveyCalendar?.dayOfWeek : "MONDAY",
                divisions: [
                    selectedDevesion
                ],
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
            else if(error.error)
                alert(error.error)
        }
    }
    // ( error.error.slice(-2) === 'Kz' ? '' : '')
    const onChange = (key: string) => {
        setCurrentTab(key)
    };

    const items = [
        {
            key: 'create',
            label: 'Создание опрос',
        },
        {
            key: 'settings',
            label: 'Настройки',
        },
        {
            key: 'calendar',
            label: 'Календарь',
        },
    ];

    const sendReport = () => {
        console.log("Incorrect survey");
    }
    return (
        <div className="flex flex-col h-full text-[#1A3353]">
            <div className="px-6 pt-4 bg-white">
                <div className="flex justify-between">
                    <p className="text-xl font-medium">{items.find(i => i.key === currentTab)?.label}</p>
                    <div className="flex gap-2">
                        <Button disabled>Отмена</Button>
                        <Button disabled onClick={sendReport}>Черновик</Button>
                        <Button onClick={sendRequest} type="primary">Сохранить</Button>
                    </div>
                </div>
                <div>
                    <Tabs style={{ marginBottom: '-16px' }} activeKey={currentTab} items={items} onChange={onChange} />
                </div>
            </div>
            {currentTab === 'create' ?
                <CreateSurvey surveyQuestions={surveyQuestions} settings={surveySettings} setSurveyQuestions={setSurveyQuestions} /> :
                (currentTab === 'settings' ?
                    <SurveySettings selectedDivisionP={selectedDevesion} setSelectedDivisionP={setSelectedDevesion} surveySettings={surveySettings} setSurveySettings={setSurveySettings} /> :
                    <SurveyCalendar surveyCalendar={surveyCalendar} setSurveyCalendar={setSurveyCalendar} />)}

        </div>
    )
}

export default CreateSurveyMain;