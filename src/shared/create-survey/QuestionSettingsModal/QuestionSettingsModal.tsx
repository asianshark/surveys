import React, { useState } from 'react';
import { Modal, Checkbox, Button, Table, Input } from 'antd';
import SurveyTableTab from '../../surveys/SurveyTableTab';
import { CloseOutlined } from '@ant-design/icons';
import { Answer } from '../../../entities/Survey';
import './QuestionSettingsModal.module.css';
// filepath: d:/app/survey/src/shared/create-survey/QuestionSettingsModal.tsx

interface QuestionSettingsModalProps {
    visible: boolean;
    answers: Answer[] | undefined;
    onClose: () => void;
    settings: string[] | undefined;
    settingsModal?: string[];
    onSettingsChange: (updatedSettings: string[] | undefined) => void;
}
const modalStyles = {
    content: {
        padding: '0px'
    },
    header: {
        margin: '0px',
        padding: '16px 20px'
    },
    body: {
        padding: '20px'
    },
    footer: {
        margin: '0px',
        padding: '10px 16px'
    }
}
const QuestionSettingsModal: React.FC<QuestionSettingsModalProps> = ({ answers, visible, onClose, settings, onSettingsChange }) => {
    const [randomizeAnswers, setRandomizeAnswers] = useState<boolean>(true);
    const [lang, setLang] = useState("Рус")

    return (
        <Modal
            centered
            width={{
                xs: '95%',
                sm: '90%',
                md: '80%',
                lg: '70%',
                xl: '60%',
                xxl: '50%',
            }}
            styles={modalStyles}
            title={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 'bold' }}>Настройка параметров вопроса</span>
                    <div className='flex gap-3'>
                        <SurveyTableTab disabled={!settings?.includes('multilang')} tabs={["Рус", "Қаз"]} onChange={setLang} activeTab={lang} />
                        <CloseOutlined style={{ color: '#72849A', cursor: 'pointer' }} onClick={onClose} />
                    </div>
                </div>
            }
            closeIcon={null}
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Отмена
                </Button>,
                <Button key="save" type="primary" onClick={onClose}>
                    Сохранить
                </Button>,
            ]}
        >
            <div className='flex flex-col gap-5'>
                <Checkbox
                    checked={randomizeAnswers}
                    onChange={(e) => setRandomizeAnswers(e.target.checked)}
                >Перемешивать ответы</Checkbox>
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
                            render: (_, record) => <Input size='large' key={record.id} />
                        },
                        {
                            title: 'Описание в справке',
                            dataIndex: 'description',
                            key: 'description',
                            render: (_, record) => <Input size='large' key={record.id} />
                        },
                    ]}
                    dataSource={answers}
                    pagination={false}/>
            </div>

        </Modal>
    );
};

export default QuestionSettingsModal;