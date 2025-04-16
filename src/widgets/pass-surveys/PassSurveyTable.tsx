import { useEffect, useState } from "react"
import type { TablePaginationConfig, TableProps } from 'antd';
import axios from "axios"
import { Quiz } from "../../entities/Survey";
import PassTable from "./PassTable";
import { FilterValue, SorterResult } from "antd/es/table/interface";
type OnChange = NonNullable<TableProps<Quiz>['onChange']>;
interface FilterState {
    pagination: TablePaginationConfig;
    filters: Record<string, FilterValue | null>;
    sorter: SorterResult<Quiz> | SorterResult<Quiz>[];
  }
const PassSurveyTable = () => {
    const [data, setData] = useState<Quiz[]>([])
    const [filter, setFilter] = useState<FilterState>()
    const [total, setTotal] = useState(0)
    const changeFilter: OnChange = (pagination, filters, sorter) => {
        setFilter({ pagination, filters, sorter })
        console.log(filter);
    }
    useEffect(() => {
        axios.get('/quizzes', {
            params: {
                page: filter?.pagination.current ? filter.pagination.current - 1 : 0,
                size: filter?.pagination ? filter.pagination.pageSize : 10
            }
        }).then((e) => {
            setData(e.data.content)
            setTotal(e.data.totalElements)
        })
    }, [filter])
    return (
        <div className="flex w-full overflow-x-auto">
            <PassTable dataP={data} total={total} changeFilter={changeFilter}></PassTable>
        </div>
    )
}

export default PassSurveyTable