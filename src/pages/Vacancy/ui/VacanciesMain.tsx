import VacanciesFilter from "./VacanciesFilter/VacanciesFilter";
import VacanciesList from "./VacanciesList/VacanciesList";

const VacanciesMain = () => {
    return (
        <div className="flex flex-col h-full text-[#1A3353]">

            <div className="px-6 pt-4 bg-white z-10">
                <div className="flex justify-between">
                    <p className="text-xl font-medium">VacanciesMain</p>
                </div>
            </div>
            <div className="flex p-5 gap-5 w-full h-full">
                <VacanciesFilter />
                <VacanciesList/>
            </div>
        </div>
    );
};

export default VacanciesMain;