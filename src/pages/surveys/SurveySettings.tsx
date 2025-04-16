import { Button, Card, Checkbox, Select, Tag } from "antd"
import axios from "axios";
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { Jurisdiction } from "../../entities/Survey";
import { CloseOutlined } from "@ant-design/icons";
const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    color: '#1A3353'
};
const SurveySettings = ({ quizzType, selectedJurisdiction, setSelectedJurisdiction, surveySettings, setSurveySettings }: { quizzType: string | undefined, selectedJurisdiction: Jurisdiction | undefined, setSelectedJurisdiction: (jurisdiction: Jurisdiction) => void, surveySettings: string[], setSurveySettings: (settings: string[]) => void }) => {
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
    const jurisdictions = [
        {
            label: t('regular-department'),
            value: 'department'
        },
        {
            label: t('certain-participant'),
            value: 'users'
        }
    ]
    const officialPositions = [
        {
            label: t('all'),
            value: 'all'
        },
        {
            label: t('personnel-only'),
            value: 'personnel'
        },
        {
            label: t('only-management-team'),
            value: 'management-team'
        }
    ]
    const [divisions, setDivisions] = useState<{ value: string, label: string }[]>([{ value: '', label: '' }])
    const [selectedDevision, setSelectedDevision] = useState(selectedJurisdiction?.division?.id)
    const [jurisdiction, setJurisdiction] = useState<string | undefined>(selectedJurisdiction?.jurisdiction)
    const [selectedOfficialPosition, setSelectedOfficialPosition] = useState<string | undefined>(selectedJurisdiction?.officialPosition)
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
    const addJurisdiction = () => {
        if (jurisdiction === 'department' && selectedDevision && selectedOfficialPosition) {
            setSelectedJurisdiction(
                {
                    division: {
                        id: selectedDevision,
                        divisionName: divisions.find(e => e.value === selectedDevision?.toString())?.label
                    },
                    jurisdiction: jurisdiction,
                    officialPosition: selectedOfficialPosition
                })
        }
    }
    const deleteChoosen = () => {
        setSelectedDevision(undefined)
        setSelectedOfficialPosition(undefined)
        setSelectedJurisdiction(
            {
                jurisdiction: selectedJurisdiction?.jurisdiction,
                division: undefined,
                officialPosition: undefined
            })
    }
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
            <div className="bg-white rounded-[10px] mb-6 border-[#E6EBF1] border-1 flex flex-col w-3/4">
                <div className="font-bold text-lg p-5 pb-0">{t('jurisdiction')}</div>
                <div className="flex flex-col gap-5 p-5">
                    <div className="flex flex-col">
                        <div className="h-8 flex gap-1"><p className="text-red-500">*</p>{t('survey-conductedfor')}:</div>
                        <Select
                            placeholder={t('select-jurisdiction')}
                            value={jurisdiction}
                            onChange={setJurisdiction}
                            options={jurisdictions}>
                        </Select>
                    </div>
                    {jurisdiction === 'department' &&
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col">
                                <div className="h-8 flex gap-1"><p className="text-red-500">*</p>{t('regular-department')}:</div>
                                <Select
                                    placeholder={t('regular-department')}
                                    value={selectedDevision}
                                    onChange={setSelectedDevision}
                                    options={divisions}>
                                </Select>
                            </div>
                            <div className="flex flex-col">
                                <div className="h-8 flex gap-1"><p className="text-red-500">*</p>{t('official-position')}:</div>
                                <div className="flex gap-6">
                                    <Select
                                        className="flex w-full"
                                        placeholder={t('official-position')}
                                        value={selectedOfficialPosition}
                                        onChange={setSelectedOfficialPosition}
                                        options={officialPositions}>
                                    </Select>
                                    <Button onClick={addJurisdiction} type="primary">{t('add-division')}</Button>
                                </div>
                            </div>
                            <Card size="small" className="">
                                {selectedJurisdiction?.division && selectedJurisdiction.officialPosition &&
                                    <Tag className="rounded-md" color="processing">
                                        {selectedJurisdiction?.division?.divisionName} ({officialPositions.find(e => e.value === selectedJurisdiction?.officialPosition)?.label}) <CloseOutlined onClick={deleteChoosen} />
                                    </Tag>}
                            </Card >
                        </div>}
                    {jurisdiction === 'users' &&
                        <div>
                            <div className="flex flex-col">
                                <div className="h-8 flex gap-1"><p className="text-red-500">*</p>{t('employees-list')}:</div>
                                <Select
                                    placeholder={t('employees-list')}
                                    value={selectedDevision}
                                    onChange={setSelectedDevision}
                                    options={divisions}>
                                </Select>
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default SurveySettings