import React, { useState } from 'react';
import { Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import CreateSurveyCalendarModal from '../../shared/create-survey/CreateSurveyCalendarModal';

const SurveyCalendar: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [repeat, setRepeat] = useState<string>('never');
    const [range, setRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);

    const onSelect = (date: Dayjs) => {

        if (!range[0]) {
            setRange([date, null]);
        } else if (!range[1]) {
            if (date.isAfter(range[0]))
                setRange([range[0], date])
            else
                setRange([date, range[0]]);
            setModalVisible(true);
        } else {
            setRange([null, null]);
        }

    };

    const isInRange = (current: Dayjs) => {
        if (range[0] && range[1]) {
            return current.isAfter(range[0].startOf('day')) && current.isBefore(range[1].endOf('day'));
        }
        return false;
    };

    const closeModal = (repeat: string) =>{
        setModalVisible(false)
        setRepeat(repeat)
    }

    const dateCellRender = (value: Dayjs) => {
        const isStart = range[0]?.isSame(value, 'day');
        const isEnd = range[1]?.isSame(value, 'day');
        const isBetween = isInRange(value);
        return (
            <div
                style={{
                    background: isStart || isEnd || isBetween ? '#3E79F71A' : undefined,
                    color: isStart || isEnd || isBetween ? '#1677ff' : undefined,
                }}
                className={"ant-picker-cell-inner ant-picker-calendar-date"}
            >
                <div className="ant-picker-calendar-date-value">{value.date()}</div>
                <div className="ant-picker-calendar-date-content"></div>
            </div>
        );
    };
    return (
        <div className="flex flex-col items-center overflow-y-auto gap-6 pt-3">
            <Calendar onSelect={onSelect} fullCellRender={dateCellRender} />
            <CreateSurveyCalendarModal visible={modalVisible} onClose={(e) => closeModal(e)} selectedDate={range} />
        </div>
    );
};

export default SurveyCalendar;
