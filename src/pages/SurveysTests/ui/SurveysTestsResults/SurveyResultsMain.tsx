import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { Survey } from "../../../../entities/Survey";
import axios from "axios";
import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";
import UsersSurveyResultsList from "./SurveysTestsResultByUsers/UsersSurveyResultsList";
import ChartMain from "./SurveysTestsResultChart/ChartMain";
import SpecificQuestionResult from "./SurveysTestsResultByQuestion/SpecificQuestionResult";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const SurveyResultsMain = () => {
    const location = useLocation();
    const tab = location.state;
    const [currentTab, setCurrentTab] = useState<string>(tab?.tab || 'analyse');
    const [survey, setSurvey] = useState<Survey>();
    const { i18n } = useTranslation();
    const lang = i18n.language;
    const params = useParams();
    const navigate = useNavigate();
    const items = [
        { key: 'analyse', label: t('general-summary') },
        { key: 'specific-questions', label: t('specific-issue') },
        { key: 'user-result', label: t('by-individual-user') },
    ];
    const onChange = (key: string) => {
        if (isResultPage) {
            navigate(`/surveys-tests/${params.id}`);
        }
        setCurrentTab(key);
    };
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/quizzes/${params.id}`).then((res) => {
            setSurvey(res.data)
        })
    }, [params.id])
    const choosenResult = (userId: string, attemptNumber: number) => {
        navigate('result', { state: { userId, attemptNumber } });
    };
    const isResultPage = location.pathname.includes('result');
    useEffect(() => {
        if (isResultPage) {
            setCurrentTab('user-result')
        }
    }, [isResultPage])

    return (
        <div className="flex flex-col h-full text-[#1A3353]">
            <div className="px-6 pt-4 bg-white z-10">
                <div className="flex justify-between">
                    <p className="text-xl font-medium">{lang === 'ru' ? survey?.nameRu : survey?.nameKz}</p>
                </div>
                <Tabs style={{ marginBottom: '-16px' }} activeKey={currentTab} items={items} onChange={onChange} />
            </div>
            <div className="flex flex-col h-full overflow-y-auto p-6 ">
                {currentTab === 'user-result' && !isResultPage && (
                    <UsersSurveyResultsList choosenResult={choosenResult} quizId={params.id} />
                )}
                {currentTab === 'analyse' && !isResultPage &&
                    <ChartMain />}
                {currentTab === 'specific-questions' && !isResultPage && <SpecificQuestionResult quizId={params.id} questions={survey?.questions} />}
                <Outlet context={{ questions: survey?.questions, quizId: params.id }} />
            </div>
        </div>
    );
};

export default SurveyResultsMain;
