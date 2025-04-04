import { Button, Tabs } from "antd"
import CreateSurvey from "../../widgets/create-survey/CreateSurvey"
import { useState } from "react"
import { Calendar, Survey } from "../../entities/Survey"
import axios from "axios"
import SurveySettings from "./SurveySettings"
import SurveyCalendar from "./SurveyCalendar"
import { checkValid, checkValidCalendar } from "../../shared/create-survey/CheckValidCreatedSyrvey"

const CreateSurveyMain = () => {
    const [surveyQuestions, setSurveyQuestions] = useState<Survey>({
        nameRu: "",
        description: "",
        questions: [{ nameRu: "", required: false, key: 0 }]
    })
    const [currentTab, setCurrentTab] = useState<string>("create")
    const [surveyCalendar, setSurveyCalendar] = useState<Calendar>()
    const [surveySettings, setSurveySettings] = useState<string[]>(['multilang', 'randomQuestions', 'type'])
    const sendRequest = () => {
        const error = checkValid(surveyQuestions?.questions, surveyQuestions?.nameRu)
        if (error.valid)
            if (checkValidCalendar(surveyCalendar))
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
                        {
                            id: 1,
                            divisionName: "1 Dep"
                        }
                    ],
                }
                ).then(response => console.log(response.data))
            else sendReport()
        else
            alert(`Вы пропустили поле ${error.answerkey ? 'ответа' : 'вопроса'} (${error.error.slice(-2)}) \nВопрос №${error.questionKey} \n${error.answerkey ? `Ответ №${error.answerkey}` : ''}`)
    }
    // ( error.error.slice(-2) === 'Kz' ? '' : '')


    const onChange = (key: string) => {
        setCurrentTab(key)
    };

    const items = [
        {
            key: 'create',
            label: 'Create Survey',
        },
        {
            key: 'settings',
            label: 'Settings',
        },
        {
            key: 'calendar',
            label: 'Calendar',
        },
    ];

    const sendReport = () => {
        console.log("Incorrect survey");
    }
    return (
        <div className="flex flex-col h-full text-[#1A3353]">
            <div className="px-6 pt-4 bg-white">
                <div className="flex justify-between">
                    <p className="text-xl">{items.find(i => i.key === currentTab)?.label}</p>
                    <div className="flex gap-2">
                        <Button>Cancel</Button>
                        <Button onClick={sendReport}>Draft</Button>
                        <Button onClick={sendRequest} type="primary">Save</Button>
                    </div>
                </div>
                <div>
                    <Tabs style={{ marginBottom: '-16px' }} defaultActiveKey="1" items={items} onChange={onChange} />
                </div>
            </div>
            {currentTab === 'create' ?
                <CreateSurvey surveyQuestions={surveyQuestions} multilang={surveySettings?.includes('multilang')} setSurveyQuestions={setSurveyQuestions} /> :
                (currentTab === 'settings' ?
                    <SurveySettings surveySettings={surveySettings} setSurveySettings={setSurveySettings} /> :
                    <SurveyCalendar setSurveyCalendar={setSurveyCalendar} />)}

        </div>
    )
}

export default CreateSurveyMain;