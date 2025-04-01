import React, { useState } from 'react';
import { Modal, DatePicker, TimePicker, Select, Button } from 'antd';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
interface ScheduleModalProps {
    visible: boolean;
    onClose: (repeat: string) => void;
    selectedDate: [Dayjs | null, Dayjs | null];
}

const CreateSurveyCalendarModal: React.FC<ScheduleModalProps> = ({ visible, onClose, selectedDate }) => {
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
                styles={modalStyles} title="Настроить временные параметры" open={visible} onCancel={onClose} footer={null}>
                <div className='flex flex-col'>
                    <div className='flex flex-col p-5 gap-4 text-[#1A3353] border-0 border-y-1 border-[#F0F0F0]'>
                        <div className='flex flex-col gap-2'>
                            <div>Назначить дату</div>
                            <DatePicker.RangePicker
                                size='large'
                                value={[dayjs(selectedDate[0], dateFormat), dayjs(selectedDate[1], dateFormat)]}
                                disabled
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label>Добавить время</label>
                            <div className='w-full flex gap-[7px] justify-between'>
                                <div className='flex flex-col w-full'><TimePicker size='large' value={startTime} onChange={setStartTime} format="HH:mm" /></div>
                                <div className='flex flex-col w-full'><TimePicker size='large' value={endTime} onChange={setEndTime} format="HH:mm" /></div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label>Повтор</label>
                            <Select value={repeat} onChange={setRepeat} options={[
                                { value: 'never', label: 'Никогда' },
                                { value: 'daily', label: 'Каждый день' },
                                { value: 'weekly', label: 'Каждую неделю' },
                            ]} />
                        </div>
                    </div>
                    <div className='py-4 px-5 flex flex-col'>
                        <Button size='large' type="primary" onClick={handleSave} disabled={!startTime || !endTime}>
                            Сохранить
                        </Button>
                    </div>
                </div>

            </Modal>
    );
};


export default CreateSurveyCalendarModal;