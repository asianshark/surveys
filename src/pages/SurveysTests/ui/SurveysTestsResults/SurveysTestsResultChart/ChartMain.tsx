import { Chart as ChartJS, CategoryScale, Title, LinearScale, BarElement, Legend, Tooltip } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import AnalyticsCharts from "../../../../../widgets/graph-analytics/AnalyticsCharts";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { t } from "i18next";
import { getSurveysResCharts } from "../../../services/surveysTests";
type QuestionChartMain = {
    questionId: number;
    questionNameRu: string;
    questionNameKz: string;
    answers: {
        answerId: number;
        answerNameRu: string;
        answerNameKz: string;
    }[];
    departments: {
        departmentName: string;
        choosenAnswers: number[]
    }[];
};
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);
const ChartMain = () => {
    const params = useParams();
    const [questions, setQuestions] = useState<QuestionChartMain[]>([]);
    const [yAxisMaxs, setYAxisMaxs] = useState<number[]>([]);
    const max = useMemo(() => {
        return questions.map(question =>
            question.departments.reduce((accd, vald) =>
                vald.choosenAnswers.reduce((acc, val) => acc + val, 0) + accd, 0
            )
        );
    }, [questions]);
    useEffect(() => {
        setYAxisMaxs(max)
    }, [max])
    useEffect(() => {
        if (params.id)
            getSurveysResCharts(params.id).then((res) => {
                setQuestions(res.questions)
            })
    }, [])
    return (
        <div className="flex flex-col items-center gap-6">
            {questions.length === 0 ? <div className="text-[16px] text-[#455560]">{t('Нет данных для отображения')}</div> :
                questions.map((item, i) => (
                    <AnalyticsCharts yMax={yAxisMaxs[i]} key={item.questionId} question={item} />
                ))}
        </div>
    );
};

export default ChartMain