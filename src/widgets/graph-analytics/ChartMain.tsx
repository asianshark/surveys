import { Chart as ChartJS, CategoryScale, Title, LinearScale, BarElement, Legend, Tooltip } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import AnalyticsCharts from "./AnalyticsCharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
export type Question = {
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
    const [questions, setQuestions] = useState<Question[]>([]);
    useEffect(()=>{
        axios.get(`/analytics/quizzes/${params.id}/answers-by-department`).then((res) => {
            setQuestions(res.data.questions)
            console.log(res.data.questions);
            
        })
    }, [])
    return (
        <div className="flex flex-col items-center gap-6">
            {questions.map(item => (
                <AnalyticsCharts question={item} />
            ))}
        </div>
    );
};

export default ChartMain