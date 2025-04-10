import { useEffect, useState } from "react"
import type { TableProps } from 'antd';
import axios from "axios"
import { Quiz } from "../../entities/Survey";
import PassTable from "./passTable";

type OnChange = NonNullable<TableProps<Quiz>['onChange']>;

const PassSurveyTable = () => {
    const [data, setData] = useState<Quiz[]>([])
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
        <div className="flex w-full overflow-x-auto">
            <PassTable dataP={data} total={total} changeFilter={changeFilter}></PassTable> :
        </div>
    )
}

export default PassSurveyTable