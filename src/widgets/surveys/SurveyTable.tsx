import { useEffect, useState } from "react"
import SurveyTableTab from "../../shared/surveys/SurveyTableTab"
import Table from "./Table"
import type { TableProps } from 'antd';
import axios from "axios"
import { Quiz } from "../../entities/Survey";

type OnChange = NonNullable<TableProps<Quiz>['onChange']>;

const SurveyTable = () => {
    const tabs = ['Активный', 'Архив', 'Черновик']
    const [activeTab, setActiveTab] = useState(tabs[0])
    const [data, setData] = useState<Quiz[]>([])
    const changeTab = (tab: string) => {
        setActiveTab(tab)
    }
    const [filter, setFilter] = useState({})
    const [total, setTotal] = useState(0)
    const changeFilter: OnChange = (pagination, filters, sorter) => {
        setFilter({ pagination, filters, sorter })
        console.log(filter);
    }
    useEffect(() => {
        axios.get('/quizzes', {
            params: {
                page: filter.pagination ? filter.pagination.current - 1 : 0,
                size: filter.pagination ? filter.pagination.pageSize : 10
            }
        }).then((e) => {
            setData(e.data.content)
            setTotal(e.data.totalElements)
        })
    }, [filter])
    return (
        <div className=" flex flex-col">
            <div className="py-4 px-2">
                <SurveyTableTab disabled tabs={tabs} onChange={changeTab} activeTab={activeTab}></SurveyTableTab>
            </div>
            <Table dataP={data} total={total} activeTab={activeTab} changeFilter={changeFilter}></Table>

        </div>
    )
}

export default SurveyTable