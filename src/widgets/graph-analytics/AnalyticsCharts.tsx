import { Chart as ChartJS, CategoryScale, Title, LinearScale, BarElement, Legend, Tooltip, TooltipItem } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useTranslation } from "react-i18next";
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
const AnalyticsCharts = ({ question, yMax }: { yMax: number, question: QuestionChartMain }) => {
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
                        return `${label} (${value})`;
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
                        size: 14,
                    },
                },
            },
            datalabels: {
                color: '#fff',
                anchor: 'center' as const,
                font: {
                    size: 14,
                },
                formatter: (value: string) => `${value ? value : ''}`,
            },
        },
        scales: {
            x: {
                grid: { display: false },
                stacked: true,
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
                beginAtZero: true,
                stacked: true,
                ticks: {
                    stepSize: 1,
                    font: { size: 14 },
                    color: '#1A3353',
                    precision: 0,
                },
                max: yMax,
            },
        },
    };
    const backgroundColors = ['rgba(29, 188, 222, 0.7)', // #1DBCDE
        'rgba(199, 79, 228, 0.7)', // #C74FE4
        'rgba(241, 94, 157, 0.7)', // #F15E9D
        'rgba(241, 109, 54, 0.7)', // #F16D36
        'rgba(245, 179, 72, 0.7)', // #F5B348
        'rgba(241, 226, 27, 0.7)', // #F1E21B
        'rgba(163, 217, 58, 0.7)', // #A3D93A
        'rgba(76, 201, 104, 0.7)', // #4CC968
        'rgba(45, 196, 76, 0.7)', // #2DC44C
        'rgba(29, 156, 61, 0.7)', // #1D9A3D
        'rgba(35, 141, 142, 0.7)', // #238D8E
        'rgba(30, 109, 150, 0.7)', // #1E6D96
        'rgba(58, 75, 206, 0.7)',  // #3A4BCE
        'rgba(91, 71, 184, 0.7)',  // #5B47B8
        'rgba(154, 72, 167, 0.7)'  // #9A48A7
    ];
    const data = {
        labels: question.answers?.map(item => lang === 'ru' ? item.answerNameRu : item.answerNameKz),
        datasets: question.departments?.map((item, i) => {
            return {
                label: item.departmentName,
                data: item.choosenAnswers,
                backgroundColor: backgroundColors[i],
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