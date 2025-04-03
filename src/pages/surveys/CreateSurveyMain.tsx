import { Button, Tabs } from "antd"
import CreateSurvey from "../../widgets/create-survey/CreateSurvey"
import { useEffect, useState } from "react"
import { Calendar, Survey } from "../../entities/Survey"
import axios from "axios"
import SurveySettings from "./SurveySettings"
import SurveyCalendar from "./SurveyCalendar"
import { checkValid, checkValidCalendar } from "../../shared/create-survey/CheckValidCreatedSyrvey"

const CreateSurveyMain = () => {
    const [surveyQuestions, setSurveyQuestions] = useState<Survey>()
    const [currentTab, setCurrentTab] = useState<string>("create")
    const [surveyCalendar, setSurveyCalendar] = useState<Calendar>()
    const [surveySettings, setSurveySettings] = useState<string>()
    const [questionsError, setQuestionError] = useState<{ error: string, key?: number }>()
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
            setQuestionError({error: error.error, key: error.key})
    }

    useEffect(()=>{
        setQuestionError(undefined)
    }, [surveyQuestions])

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
                <CreateSurvey error={questionsError} setSurveyQuestions={setSurveyQuestions} /> :
                (currentTab === 'settings' ?
                    <SurveySettings setSurveySettings={setSurveySettings} /> :
                    <SurveyCalendar setSurveyCalendar={setSurveyCalendar} />)}

        </div>
    )
}

export default CreateSurveyMain;