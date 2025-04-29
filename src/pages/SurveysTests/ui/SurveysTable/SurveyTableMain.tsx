import { useEffect, useState } from "react"
import { Select, type TablePaginationConfig, type TableProps } from 'antd';
import axios from "axios"
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Quiz } from "../../../../entities/SurveysTests/Quiz/QuizSchema";
import SurveyTable from "../../../../widgets/SurveysTests/ui/SurveyTable/SurveyTable";
import SurveyTableTab from "../../../../shared/surveys/SurveyTableTab";

type OnChange = NonNullable<TableProps<Quiz>['onChange']>;
interface FilterState {
    pagination: TablePaginationConfig;
    filters: Record<string, FilterValue | null>;
    sorter: SorterResult<Quiz> | SorterResult<Quiz>[];
}
const SurveyTableMain = () => {
    const { t } = useTranslation();
    const navigate = useNavigate()
    const [surveyType, setSurveryType] = useState<string>()
    const createQuizzesOptions = [
        {
            label: 'new-survey',
            value: 'survey'
        },
        {
            label: 'new-test',
            value: 'test'
        },
        // {
        //     label: 'new-competence',
        //     value: 'competence'
        // }
    ]
    const tabs = ['Активный', 'Архив', 'Черновик']
    const [activeTab, setActiveTab] = useState(tabs[0])
    const [data, setData] = useState<Quiz[]>([])
    const changeTab = (tab: string) => {
        setActiveTab(tab)
    }
    const [filter, setFilter] = useState<FilterState>()
    const [total, setTotal] = useState(0)
    const changeFilter: OnChange = (pagination, filters, sorter) => {
        setFilter({ pagination, filters, sorter })
        console.log(filter);
    }
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/quizzes`, {
            params: {
                page: filter?.pagination.current ? filter.pagination.current - 1 : 0,
                size: filter?.pagination ? filter.pagination.pageSize : 10
            }
        }).then((e) => {
            setData(e.data.content)
            setTotal(e.data.totalElements)
        })
    }, [filter])
    const createQuizzes = (value: string) => {
        if (value !== "competence") {
            setSurveryType(value)
            navigate(`/create/${value}`)
        }
    }
    return (
        <div className=" flex flex-col">
            <div className="py-4 px-2 flex justify-between">
                <SurveyTableTab disabled tabs={tabs} onChange={changeTab} activeTab={activeTab}></SurveyTableTab>
                <Select
                    value={surveyType}
                    style={{ width: 180 }}
                    placeholder={t('create')}
                    options={createQuizzesOptions.map(opt => ({
                        label: t(opt.label),
                        value: opt.value,
                    }))}
                    onChange={createQuizzes} />
            </div>
            <SurveyTable dataP={data} total={total} activeTab={activeTab} changeFilter={changeFilter}/>

        </div>
    )
}

export default SurveyTableMain