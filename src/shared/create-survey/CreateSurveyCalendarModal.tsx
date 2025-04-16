import React, { useState } from 'react';
import { Modal, DatePicker, TimePicker, Select, Button } from 'antd';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useTranslation } from 'react-i18next';

dayjs.extend(customParseFormat);
interface ScheduleModalProps {
    visible: boolean;
    onClose: (repeat: string) => void;
    selectedDate: [Dayjs | null, Dayjs | null];
}

const CreateSurveyCalendarModal: React.FC<ScheduleModalProps> = ({ visible, onClose, selectedDate }) => {
    const { t } = useTranslation();
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [endTime, setEndTime] = useState<Dayjs | null>(null);
    const [repeat, setRepeat] = useState<string>('never');
    const dateFormat = "DD-MM"
    const handleSave = () => {
        console.log('Время начала:', startTime?.format('HH:mm'));
        console.log('Время окончания:', endTime?.format('HH:mm'));
        console.log('Повтор:', repeat);
        onClose(repeat);
    };
    const modalStyles = {
        content: {
            padding: '0px'
        },
        header: {
            padding: '16px 20px 8px'
        }
    }

    return (
        <Modal
            styles={modalStyles} title={t('set-up-time-parameters')} open={visible} onCancel={() => onClose(repeat)} footer={null}>
            <div className='flex flex-col'>
                <div className='flex flex-col p-5 gap-4 text-[#1A3353] border-0 border-y-1 border-[#F0F0F0]'>
                    <div className='flex flex-col gap-2'>
                        <div>{t('set-date')}</div>
                        <DatePicker.RangePicker
                            size='large'
                            value={[dayjs(selectedDate[0], dateFormat), dayjs(selectedDate[1], dateFormat)]}
                            disabled
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>{t('add-time')}</label>
                        <div className='w-full flex gap-[7px] justify-between'>
                            <div className='flex flex-col w-full'><TimePicker size='large' value={startTime} onChange={setStartTime} format="HH:mm" /></div>
                            <div className='flex flex-col w-full'><TimePicker size='large' value={endTime} onChange={setEndTime} format="HH:mm" /></div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label>{t('repeat')}</label>
                        <Select value={repeat} onChange={setRepeat} options={[
                            { value: 'never', label: t('never') },
                            { value: 'daily', label: t('every-day') },
                            { value: 'weekly', label:  t('every-week')},
                            { value: 'monthly', label: t('every-month')},
                        ]} />
                    </div>
                </div>
                <div className='py-4 px-5 flex flex-col'>
                    <Button size='large' type="primary" onClick={handleSave} disabled={!startTime || !endTime}>
                        {t('save')}
                    </Button>
                </div>
            </div>

        </Modal>
    );
};


export default CreateSurveyCalendarModal;