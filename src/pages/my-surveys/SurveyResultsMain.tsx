import { Tabs } from "antd";
import { useEffect, useState } from "react";
import UserSurveyResult from "./UserSurveyResult";
import { Survey } from "../../entities/Survey";
import axios from "axios";
import { useParams } from "react-router";
import UsersSurveyResultsList from "./UsersSurveyResultsList";

const SurveyResultsMain = () => {
    const [currentTab, setCurrentTab] = useState<string>("user-result")
    const [survey, setSurvey] = useState<Survey>()
    const params = useParams()
    const items = [
        {
            key: 'analyse',
            label: 'Сводка',
        },
        {
            key: 'questions',
            label: 'Вопросы',
        },
        {
            key: 'user-result',
            label: 'Отдельный пользователь',
        },
    ];

    const onChange = (key: string) => {
        setCurrentTab(key)
    };

    useEffect(() => {
        axios.get(`/quizzes/${params.id}`).then((res) => {
            setSurvey(res.data)
        })
    }, [])
    return (
        <div className="flex flex-col h-full text-[#1A3353]">
            <div className="px-6 pt-4 bg-white">
                <div className="flex justify-between">
                    <p className="text-xl font-medium">{survey?.nameRu}</p>
                </div>
                <Tabs style={{ marginBottom: '-16px' }} activeKey={currentTab} items={items} onChange={onChange} />
            </div>
            <div className="flex flex-col h-full overflow-y-auto mb-6">
                {currentTab === 'user-result' ? <><UsersSurveyResultsList/> <UserSurveyResult questions={survey?.questions} quizId={params.id} /></> : <></>}
            </div>
        </div>
    )
}
export default SurveyResultsMain