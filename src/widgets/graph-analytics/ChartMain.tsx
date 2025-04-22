import { Chart as ChartJS, CategoryScale, Title, LinearScale, BarElement, Legend, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Answer } from "../../entities/Survey";
import questions from './questions.json'
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);
const ChartMain = ({ answers }: { answers?: Answer[] }) => {
    const lang = localStorage.getItem('lang') || 'Рус';

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: questions[0].nameRu,
                position: 'top',
                align: 'start',
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
                    label: (tooltipItem: { dataset: { label: string; }; raw: string; }) => {
                        return `${tooltipItem.dataset.label} (${tooltipItem.raw}%)`;
                    },
                },
            },
            legend: {
                display: true,
                position: "top",
                align: 'end',
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
                anchor: 'center',
                font: {
                    size: 14,
                },
                formatter: (value: string) => `${value}`,
            },
        },
        responsive: true,
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
                    stepSize: 20,
                    callback: (value: string) => `${value}%`,
                    font: { size: 14 },
                    color: '#1A3353',
                },
                max: 100,
                beginAtZero: true,
            },
        },
    };
    const data = {
        labels: questions[0].answers?.map(item => lang === 'Рус' ? item.nameRu : item.nameKz),
        datasets: [
            {
                label: questions[0].nameRu,
                data: questions[0].answers?.map(() => Math.floor(Math.random() * 100)),
                backgroundColor: '#1DBCDE',
                borderRadius: 4
            }
        ],
    };
    return (
        <div className="bg-white h-full flex flex-col rounded-[10px] p-5" style={{ height: '350px', width: '100%' }}>
            <Bar options={options} data={data}></Bar>
        </div>
    );
};

export default ChartMain