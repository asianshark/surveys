import { useEffect, useState } from "react"
import SurveyTableTab from "../../shared/surveys/SurveyTableTab"
import Table from "./Table"
import type { TableProps } from 'antd';
import axios from "axios"
interface DataType {
    key: string,
    name: string;
    type: string;
    address: string;
    date: number
}

interface Division {
    id: number;
    divisionId: string;
    quizIds: number[] | null;
}
interface Quiz {
    id: number;
    nameRu: string;
    nameKz: string;
    status: "DRAFT" | "PUBLISHED" | "CLOSED"; // Можно уточнить возможные статусы
    createdAt: string; // ISO формат даты
    updatedAt: string;
    authorId: number | null;
    type: boolean;
    startDate: string;
    endDate: string;
    everyDay: boolean;
    everyWeek: boolean;
    everyMonth: boolean;
    dayOfWeek: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY"; // Ограничение на дни недели
    questions: any[] | null; // Можно уточнить, если известна структура вопросов
    divisions: Division[];
}

type OnChange = NonNullable<TableProps<Quiz>['onChange']>;

const SurveyTable = () => {
    const tabs = ['active', 'archive', 'draft']
    const [activeTab, setActiveTab] = useState(tabs[0])
    const [isLoading, setIsLoading] = useState(true)
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
        axios.get('/quizzes', {params: {
            page: filter.pagination ? filter.pagination.current - 1 : 0,
            size: filter.pagination ? filter.pagination.pageSize : 3
        }}).then((e) => {
            setData(e.data.content)
            setTotal(e.data.totalElements)
        })
    }, [filter])
    return (
        <div className=" flex flex-col">
            <div className="py-4 px-2">
                <SurveyTableTab tabs={tabs} onChange={changeTab} activeTab={activeTab}></SurveyTableTab>
            </div>
            {isLoading ? <Table dataP={data} total={total} activeTab={activeTab} changeFilter={changeFilter}></Table> :
                "Loading..."}
        </div>
    )
}

export default SurveyTable