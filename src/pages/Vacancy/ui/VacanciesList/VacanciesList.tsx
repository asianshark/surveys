import { Input } from 'antd';
import { t } from "i18next"
import VacanciesListItem from "./VacanciesListItem"
import { useState } from "react"
const { Search } = Input;
const VacanciesList = () => {
    const [searchText, setSearchText] = useState<string>()
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between text-[#1A3353] text-[20px] items-center">
                <div>{t('department')}</div>
                <div>
                    <Search placeholder={t('search')} value={searchText} onChange={e => setSearchText(e.target.value)} />
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <VacanciesListItem />
            </div>
        </div>
    )
}

export default VacanciesList