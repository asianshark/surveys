import { Pagination } from "antd";
import { Question } from "../../entities/Survey";
import { useState } from "react";

const SpecificQuestionResult = ({ questions }: { questions: Question[] | undefined }) => {
    const [selectedQuestion, setSelectedQuestion] = useState<number>(1);
    return (
        <div>
            <div className="p-5 pt-0 flex justify-between">
                <Pagination showLessItems pageSize={1} current={selectedQuestion} onChange={setSelectedQuestion} total={questions?.length} />
            </div>
            <div className="flex h-full flex-col items-center gap-6">
                <div style={{ fontFamily: 'Roboto' }}
                    className="bg-white rounded-[10px] border-1 p-5 flex flex-col gap-4 w-3/4 border-[#E6EBF1]"
                >
                    <div className="flex gap-2">
                        <div className="flex gap-2 w-full text-[16px] text-[#455560] items-center">dhbcvsoivbpih</div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SpecificQuestionResult;