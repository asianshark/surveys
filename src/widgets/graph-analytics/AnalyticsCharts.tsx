import { Chart as ChartJS, CategoryScale, Title, LinearScale, BarElement, Legend, Tooltip, TooltipItem } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useTranslation } from "react-i18next";

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
const AnalyticsCharts = ({ question }: { question: Question }) => {
    const { i18n } = useTranslation();
    const lang = i18n.language;
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: lang === 'ru' ? question.questionNameRu : question.questionNameKz,
                position: 'top' as const,
                align: 'start' as const,
                font: {
                    size: 24,
                    weight: 500,
                    family: 'Roboto',
                },
                color: '#1A3353',
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                bodyColor: '#000',
                borderColor: '#ccc',
                borderWidth: 0.5,
                usePointStyle: true,
                pointStyle: 'circle',
                bodyFont: {
                    family: 'Roboto'
                },
                callbacks: {
                    title: () => '',
                    label: (tooltipItem: TooltipItem<'bar'>) => {
                        const label = tooltipItem.dataset.label ?? '';
                        const value = tooltipItem.raw ?? '';
                        return `${label} (${value}%)`;
                    }
                },
            },
            legend: {
                display: true,
                position: 'top' as const,
                align: 'end' as const,
                labels: {
                    color: '#1A3353',
                    font: {
                        family: 'Roboto',
                        size: 16,
                    },
                },
            },
            datalabels: {
                color: '#fff',
                anchor: 'center' as const,
                font: {
                    size: 14,
                },
                formatter: (value: string) => `${value}`,
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    font: {
                        size: 14,
                        decoration: 'underline',
                    },
                    color: "#1A3353",
                    autoSkip: false,
                },
                border: { display: false },
            },
            y: {
                ticks: {
                    stepSize: 1,
                    font: { size: 14 },
                    color: '#1A3353',
                },
                max: question.departments[0].choosenAnswers.reduce((acc, val) => acc + val, 0),
                beginAtZero: true,
            },
        },
    };
    const data = {
        labels: question.answers?.map(item => lang === 'ru' ? item.answerNameRu : item.answerNameKz),
        datasets: question.departments?.map((item) => {
            return {
                label: item.departmentName,
                data: item.choosenAnswers,
                backgroundColor: '#1DBCDE',
                borderRadius: 4,
            }
        }
        )
    };
    return (
        <div className="bg-white h-full flex flex-col rounded-[10px] w-5/6 p-5" style={{ height: '350px' }}>
            <Bar options={options} data={data}></Bar>
        </div>
    );
};

export default AnalyticsCharts