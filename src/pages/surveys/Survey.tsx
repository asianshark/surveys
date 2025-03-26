import SurveyTable from "../../widgets/surveys/SurveyTable"

const Survey = () =>{

    return(
        <div className="p-6 h-full">
            <div className="h-full rounded-[10px] bg-white p-5">
                <div>
                    <SurveyTable></SurveyTable>
                </div>
            </div>
        </div>
    )
}
export default Survey