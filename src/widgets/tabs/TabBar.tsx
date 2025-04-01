import { useEffect, useState } from "react"
import Icon from "../../shared/Icon"
import i18n from "../../i18n/i18n"

const TabBar = ({isOpenTab, closeOpenTab }: {isOpenTab: boolean,closeOpenTab: () => void }) => {
    const [lang, setLang] = useState("kz")
    useEffect(()=>{
        i18n.changeLanguage(lang);
    }, [lang])
    return (
        <div className='h-[48px] px-4 border-b-1 border-[#F0F0F0] flex items-center justify-between'>
            <button onClick={closeOpenTab}>
                <Icon icon={isOpenTab ? 'arrow-right-start-on-rectangle' : "arrow-right-end-on-rectangle"}></Icon>
            </button>
            <select value={lang} onChange={e => setLang(e.target.value)}>
                <option value={"kz"}>kazakh</option>
                <option value={"ru"}>russian</option>
            </select>
        </div>
    )
}

export default TabBar