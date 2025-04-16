import { Checkbox, Select } from "antd"
import axios from "axios";
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    color: '#1A3353'
};
const SurveySettings = ({ quizzType, selectedDivisionP, setSelectedDivisionP, surveySettings, setSurveySettings }: { quizzType: string | undefined, selectedDivisionP: { id: number | undefined, divisionName: string | undefined } | undefined, setSelectedDivisionP: ({ id, divisionName }: { id: number | undefined, divisionName: string | undefined }) => void, surveySettings: string[], setSurveySettings: (settings: string[]) => void }) => {
    const { t } = useTranslation();
    const options = [
        {
            value: 'multilang',
            label: t('kazakh-version')
        },
        {
            value: 'feedback',
            label: t('report')
        },
        {
            value: 'randomQuestions',
            label: t('randomize-questions')
        }

    ]
    const [divisions, setDivisions] = useState<{ value: string, label: string }[]>([{ value: '', label: '' }])
    const [selectedDevesion, setSelectedDevesion] = useState(selectedDivisionP?.id)
    useEffect(() => {
        axios.get('/divisions').then((res) => {
            const opt: { value: string, label: string }[] = []
            res.data.content.map((item: { id: string | number; divisionName: string; }) => {
                opt.push({ value: item.id.toString(), label: item.divisionName })
            })
            setDivisions(opt)
        })
    }, [])
    const [checkBoxAns, setCheckBoxAns] = useState<string[]>(surveySettings)
    useEffect(() => {
        setSurveySettings(checkBoxAns)
    }, [checkBoxAns])
    useEffect(() => {
        setSelectedDivisionP({ id: selectedDevesion, divisionName: divisions.find(e => e.value === selectedDevesion?.toString())?.label })
    }, [selectedDevesion])
    return (
        <div className="flex flex-col items-center overflow-y-auto gap-6 pt-3">
            <div className="bg-white rounded-[10px] border-[#E6EBF1] border-1 p-5 flex flex-col gap-4 w-3/4">
                <div className="font-bold text-lg">{t('setting-up-survey')}</div>
                <div className="text-md font-normal">
                    <Checkbox.Group
                        style={style}
                        onChange={e => setCheckBoxAns(e)}
                        value={checkBoxAns}
                        options={quizzType === 'survey' ? [{ value: 'type', label: t('anonymous-survey') }, ...options] : options} />
                </div>
            </div>
            <div className="bg-white rounded-[10px] border-[#E6EBF1] border-1 p-5 flex flex-col gap-4 w-3/4">
                <div className="font-bold text-lg">{t('jurisdiction')}</div>
                <div>{t('survey-conductedfor')}:</div>
                <Select
                    value={selectedDevesion}
                    onChange={setSelectedDevesion}
                    options={divisions}>
                </Select>
            </div>
        </div>
    )
}

export default SurveySettings