import { useEffect, useState } from "react"
import Icon from "../../shared/Icon"
import i18n from "../../i18n/i18n"
import { Select } from "antd"

const TabBar = ({ isOpenTab, closeOpenTab }: { isOpenTab: boolean, closeOpenTab: () => void }) => {
    const [lang, setLang] = useState("kz")
    const langs = [
        {
            value: 'kz',
            label: 'kz'
        },
        {
            value: 'ru',
            label: 'ru'
        }
    ]
    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang])
    return (
        <div className='h-[48px] px-4 border-b-1 border-[#F0F0F0] flex items-center justify-between'>
            <button onClick={closeOpenTab}>
                <Icon icon={isOpenTab ? 'arrow-right-start-on-rectangle' : "arrow-right-end-on-rectangle"}></Icon>
            </button>
            <Select value={lang} onChange={setLang} options={langs}>
            </Select>
        </div>
    )
}

export default TabBar