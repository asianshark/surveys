import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getDivisions } from "../../../SurveysTests/services/surveysTests";
import { Division } from "../../../../entities/SurveysTests/Quiz/SettingsSchema";
import { Checkbox } from "antd";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    fontFamily: 'Roboto ',
};
const VacanciesFilter = () => {
    const { t } = useTranslation();
    const [devisions, setDivisions] = useState<Division[]>()
    const [all, setAll] = useState<boolean>(false)
    const [filter, setFilter] = useState<number[]>()
    useEffect(() => {
        getDivisions().then(res =>
            setDivisions(res)
        )
    }, [])
    const changeSetAll = (checked: boolean) => {
        if(checked){
            setAll(checked)
            setFilter(devisions?.map((item, index) => item.id ? item.id : index))
        }else{
            setAll(false)
            setFilter([])
        }
    }
    useEffect(()=> {
        if(filter?.length !== devisions?.length){
            setAll(false)
        }
    }, [filter, devisions])
    return (
        <div>
            <div className="rounded-[10px] border-1 border-[#E6EBF1] flex flex-col bg-white w-[250px] p-5 gap-4">
                <div className="text-[#1A3353] flex justify-between">
                    <p>{t('filter')}</p>
                    <Checkbox checked={all} onChange={e => changeSetAll(e.target.checked)}>{t('all')}</Checkbox>
                </div>
                <hr className="h-1 text-[#E6EBF1]" />
                <div>
                    <Checkbox.Group
                        style={style}
                        value={filter}
                        onChange={setFilter}
                        options={devisions?.map((item, index) => ({
                            value: item.id ? item.id : index,
                            label: item.divisionName
                        }))}
                    />
                </div>
            </div>
        </div>
    )
}

export default VacanciesFilter