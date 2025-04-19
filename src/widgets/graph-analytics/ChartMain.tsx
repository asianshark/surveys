import { Chart as ChartJS, CategoryScale, Title, LinearScale, BarElement, Legend, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Answer } from "../../entities/Survey";
import questions from './questions.json'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const ChartMain = ({ answers }: { answers: Answer[] }) => {
    const lang = localStorage.getItem('lang') || 'Рус';

    const options = {
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
                backgroundColor: '#FFFFFF',
                bodyColor: '#112E49',
                callbacks: {
                    title: () => '',
                    label: (tooltipItem) => {
                        // You can customize the label content here
                        return `${tooltipItem.dataset.label} (${tooltipItem.raw}%)`;
                    },
                },
            },
            legend: {
                display: true,
                position: "top",
                align: 'end'
            }
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
                    color: "#000",
                    autoSkip: false,
                },
                border: { display: false },
            },
            y: {
                ticks: {
                    stepSize: 20,
                    callback: (value) => `${value}%`, // 👈 add % here
                    font: { size: 14 },
                    color: '#000',
                },
                max: 100,
                beginAtZero: true,
                grid: {
                    color: '#eee',
                },
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
        <div className="bg-white h-full flex flex-col rounded-[10px] p-5">
            <div>Graph Main</div>
            <Bar options={options} data={data}></Bar>
        </div>
    );
};

export default ChartMain