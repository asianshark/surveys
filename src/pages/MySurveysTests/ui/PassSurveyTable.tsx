import { useEffect, useState } from "react"
import type { TableProps } from 'antd';
import PassTable from "./PassTable";
import { getQuizzes } from "../services/passTestSurvey";
import { GetQuizzesParamsSchema, GetQuizzesResponse } from "../../../shared/schemas/getQuizzesData";
import { Quiz } from "../../../entities/SurveysTests/Quiz/QuizSchema";
import { FilterState } from "../../../shared/schemas/FilterStateSchema";
type OnChange = NonNullable<TableProps<Quiz>['onChange']>;

const PassSurveyTable = () => {
    const [data, setData] = useState<Quiz[]>([])
    const [filter, setFilter] = useState<FilterState>()
    const [total, setTotal] = useState<number>(0)
    const changeFilter: OnChange = (pagination, filters, sorter) => {
        setFilter({ pagination, filters, sorter })
    }
    useEffect(() => {
        const params = {
            page: filter?.pagination.current ? filter.pagination.current - 1 : 0,
            size: filter?.pagination ? filter.pagination.pageSize : 10
        };
        const result = GetQuizzesParamsSchema.safeParse(params);
        if (!result.success) {
            console.error('Ошибка валидации параметров:', result.error.format());
            return;
        }
        getQuizzes(params).then((response: GetQuizzesResponse) => {
            setData(response.content)
            setTotal(response.totalElements)
        })
    }, [filter])
    return (
        <div className="flex w-full overflow-x-auto">
            <PassTable dataP={data} total={total} changeFilter={changeFilter}></PassTable>
        </div>
    )
}

export default PassSurveyTable