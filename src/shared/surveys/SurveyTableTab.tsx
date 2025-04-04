import { t } from "i18next";

const SurveyTableTab = ({ tabs, onChange, activeTab, disabled }: { tabs: string[], onChange: (tabs: string) => void, activeTab: string, disabled?: boolean }) => {
    const indexAct = tabs.indexOf(activeTab)
    const classnameForButton = (index: number) => {
        let className = "border-1 "
        if (index === 0) className += "rounded-l-[10px] "
        else if (index === tabs.length - 1) className += "rounded-r-[10px] "

        if (indexAct === index) {
            className += "border-blue-500 text-blue-500 "
        } else {
            if (index === 0) className += "border-1 border-[#E6EBF1] "
            else if (index === tabs.length - 1) className += "border-l-0 border-[#E6EBF1] "
            else className += "border-l-0 border-[#E6EBF1] "
        }
        className += indexAct - 1 === index ? "border-r-0 " : "" 
        return className
    }
    return (
        <div className="flex h-[40px]">
            {tabs.map((tab, index) => (
                <button disabled={disabled} onClick={() => onChange(tab)} key={index} className={"px-4 py-2 " + classnameForButton(index) + (disabled ? ' bg-[#f5f5f5] text-[#bfbfbf] cursor-not-allowed': '')}>
                    {t(tab)}
                </button>
            ))}
        </div>
    )
}
export default SurveyTableTab;