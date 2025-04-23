import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { Survey } from "../../entities/Survey";
import axios from "axios";
import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";
import UsersSurveyResultsList from "./UsersSurveyResultsList";
import ChartMain from "../../widgets/graph-analytics/ChartMain";

const SurveyResultsMain = () => {
    const [currentTab, setCurrentTab] = useState<string>("analyse");
    const [survey, setSurvey] = useState<Survey>();
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        { key: 'analyse', label: 'Сводка' },
        { key: 'questions', label: 'Вопросы' },
        { key: 'user-result', label: 'Отдельный пользователь' },
    ];

    const onChange = (key: string) => {
        navigate(`/surveys-tests/${params.id}`);
        setCurrentTab(key);
    };

    useEffect(() => {
        axios.get(`/quizzes/${params.id}`).then((res) => {
            setSurvey(res.data)
        })
    }, [params.id])

    const choosenResult = (userId: string, attemptNumber: number) => {
        navigate('result', { state: { userId, attemptNumber } });
    };

    const isResultPage = location.pathname.includes('result');

    return (
        <div className="flex flex-col h-full text-[#1A3353]">
            <div className="px-6 pt-4 bg-white z-10">
                <div className="flex justify-between">
                    <p className="text-xl font-medium">{survey?.nameRu}</p>
                </div>
                <Tabs style={{ marginBottom: '-16px' }} activeKey={currentTab} items={items} onChange={onChange} />
            </div>
            <div className="flex flex-col h-full overflow-y-auto p-6 ">
                {currentTab === 'user-result' && !isResultPage && (
                    <UsersSurveyResultsList choosenResult={choosenResult} quizId={params.id} />
                )}
                {currentTab === 'analyse' && !isResultPage &&
                    <ChartMain />}
                <Outlet context={{ questions: survey?.questions, quizId: params.id }} />
            </div>
        </div>
    );
};

export default SurveyResultsMain;
