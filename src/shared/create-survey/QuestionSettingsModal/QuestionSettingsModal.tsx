import React, { useState } from 'react';
import { Modal, Checkbox, Button, Table, Input, Collapse } from 'antd';
import SurveyTableTab from '../../surveys/SurveyTableTab';
import { CloseOutlined } from '@ant-design/icons';
import { Answer } from '../../../entities/Survey';
import styles from './QuestionSettingsModal.module.css';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend,
} from 'chart.js';

interface QuestionSettingsModalProps {
    visible: boolean;
    answers: Answer[] | undefined;
    onClose: () => void;
    settings: string[] | undefined;
    settingsModal?: string[];
    onSettingsChange: (value: string, key: number, diagram: boolean, lang: string) => void;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Legend);

const modalStyles = {
    content: { padding: '0px' },
    header: { margin: '0px', padding: '16px 20px' },
    body: { padding: '20px' },
    footer: { margin: '0px', padding: '10px 16px' },
};

const options = {
    plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
    },
    scales: {
        x: {
            grid: { display: false },
            ticks: {
                font: { size: 14 },
                color: "#000",
                autoSkip: false,
            },
            border: { display: false },
        },
        y: {
            border: { display: false },
            grid: { display: false },
            ticks: { display: false },
        },
    },
};

const QuestionSettingsModal: React.FC<QuestionSettingsModalProps> = ({
    answers,
    visible,
    onClose,
    settings,
    onSettingsChange
}) => {
    const [randomizeAnswers, setRandomizeAnswers] = useState<boolean>(true);
    const [lang, setLang] = useState("Рус");

    const data = {
        labels: answers?.map(item => lang === 'Рус' ? item.diagramsNameRu : item.diagramsNameKz),
        datasets: [
            {
                data: answers?.map(() => Math.floor(Math.random() * 3 + 1)),
                backgroundColor: 'rgba(0, 80, 179, 1)',
                borderRadius: 4
            }
        ],
    };

    return (
        <Modal
            centered
            width={{
                xs: '95%', sm: '90%', md: '80%', lg: '70%', xl: '60%', xxl: '50%',
            }}
            styles={modalStyles}
            title={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'Roboto' }}>
                    <span style={{ fontWeight: 'bold' }}>Настройка параметров вопроса</span>
                    <div className='flex gap-3'>
                        <SurveyTableTab
                            disabled={!settings?.includes('multilang')}
                            tabs={["Рус", "Қаз"]}
                            onChange={setLang}
                            activeTab={lang}
                        />
                        <CloseOutlined style={{ color: '#72849A', cursor: 'pointer' }} onClick={onClose} />
                    </div>
                </div>
            }
            closeIcon={null}
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>Отмена</Button>,
                <Button key="save" type="primary" onClick={onClose}>Сохранить</Button>
            ]}
        >
            <div className={`flex flex-col gap-5 ${styles.settingsModule}`}>
                <Checkbox
                    checked={randomizeAnswers}
                    onChange={(e) => setRandomizeAnswers(e.target.checked)}
                    style={{ fontFamily: 'Roboto' }}
                >
                    Перемешивать ответы
                </Checkbox>

                <Table
                    className="custom-table"
                    columns={[
                        {
                            title: '',
                            dataIndex: lang === 'Рус' ? 'nameRu' : 'nameKz',
                            key: 'name',
                        },
                        {
                            title: 'Описание в диаграммах',
                            dataIndex: 'diogramm',
                            key: 'diogramm',
                            render: (_, record) => (
                                <Input style={{ fontFamily: 'Roboto' }}
                                    onChange={e => onSettingsChange(e.target.value, record.key, true, lang)}
                                    size='large'
                                    key={record.id}
                                />
                            )
                        },
                        {
                            title: 'Описание в справке',
                            dataIndex: 'description',
                            key: 'description',
                            render: (_, record) => <Input
                            placeholder='считают, что...'
                                style={{ fontFamily: 'Roboto' }}
                                onChange={e => onSettingsChange(e.target.value, record.key, false, lang)}
                                size='large'
                                key={record.id} />
                        },
                    ]}
                    dataSource={answers}
                    pagination={false}
                />

                <Collapse size="small" style={{ fontFamily: 'Roboto' }}
                    items={[{
                        key: '1', label: 'Примеры отображения', children:
                            <div className='flex flex-col p-1 gap-6'>
                                <div className='flex flex-col gap-3'>
                                    <div>Отчетность</div>
                                    <div className="w-full relative">
                                        <Bar options={options} data={data} />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-3 text-[#1A3353]'>
                                    <div className='font-medium text-sm leading-5'>Справка</div>
                                    <div className="flex flex-col gap-2 font-normal text-sm leading-tight">
                                        <div>{Math.floor(Math.random() * 100)}% {answers ? (lang === 'Рус' ? answers[0].noteNameRu : answers[0].noteNameKz) : 'Здесь будут отображатся описание в справке'}</div>
                                        <div>{Math.floor(Math.random() * 100)}% {answers ? (lang === 'Рус' ? answers[answers.length - 1].noteNameRu : answers[answers.length - 1].noteNameKz) : 'Здесь будут отображатся описание в справке'}</div>
                                    </div>
                                </div>
                            </div>
                    }]}
                />
            </div>
        </Modal>
    );
};

export default QuestionSettingsModal;
