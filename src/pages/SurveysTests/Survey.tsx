import SurveyTable from "./ui/SurveysTable/SurveyTableMain"

const Survey = () => {

    return (
        <div className="p-6 h-full flex flex-col">
            <div className="h-full flex flex-col rounded-[10px] bg-white p-5">
                <SurveyTable></SurveyTable>
            </div>
        </div>
    )
}
export default Survey