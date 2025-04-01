import { Button, Tabs } from "antd"
import CreateSurvey from "../../widgets/create-survey/CreateSurvey"
import { useState } from "react"
import { Survey } from "../../entities/Survey"
import axios from "axios"
import SurveySettings from "./SurveySettings"
import SurveyCalendar from "./SurveyCalendar"
import { checkValid } from "../../shared/create-survey/CheckValidCreatedSyrvey"

const CreateSurveyMain = () => {
    const [surveyQuestions, setSurveyQuestions] = useState<Survey>()
    const [currentTab, setCurrentTab] = useState<string>("create")
    const [surveyCalendar, setSurveyCalendar] = useState()
    const sendRequest = () => {
        if (checkValid(surveyQuestions?.questions, surveyQuestions?.nameRu))
            axios.post("/quizzes", {
                ...surveyQuestions,
                status: "DRAFT",
                authorId: "1",
                type: true,
                everyDay: true,
                everyWeek: true,
                everyMonth: true,
                dayOfWeek: "MONDAY",
                divisions: [
                    {
                        id: 1,
                        divisionName: "1 Dep"
                    }
                ],
            }
            ).then(response => console.log(response.data))
        else sendReport()
    }

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
            {currentTab === 'create' ? <CreateSurvey setSurveyQuestions={setSurveyQuestions} />
                : (currentTab === 'settings' ? <SurveySettings /> : <SurveyCalendar />)}

        </div>
    )
}

export default CreateSurveyMain;