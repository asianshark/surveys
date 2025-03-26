import { useState } from "react"
import SurveyTableTab from "../../shared/surveys/SurveyTableTab"
import Table from "./Table"

const SurveyTable = () =>{
    const tabs =['active', 'archive',"test1", "test2", 'draft']
    const [activeTab, setActiveTab] = useState(tabs[0])
    const changeTab = (tab : string)=>{
        setActiveTab(tab)
    }
    return (
        <div>
            <div className="py-4 px-2 flex">
                <SurveyTableTab tabs={tabs} onChange={changeTab} activeTab={activeTab}></SurveyTableTab>
                <Table></Table>
            </div>
        </div>
    )
}

export default SurveyTable