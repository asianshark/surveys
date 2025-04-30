import { Pagination, Select } from "antd";
import { Question } from "../../../../../entities/Survey";
import { useEffect, useState } from "react";
import { t } from "i18next";
import { getSpecQuestionResult } from "../../../services/surveysTests";
type Answer = {
    answerId: number;
    answerText: string;
    chosenBy: {
        userId: string;
        firstName: string;
        lastName: string;
        divisionName: string;
    }[];
};

type QuestionSpecific = {
    questionId: number;
    questionText: string;
    answers: Answer[];
};
const SpecificQuestionResult = ({ quizId, questions }: { quizId: string | undefined, questions: Question[] | undefined }) => {
    const [selectedQuestion, setSelectedQuestion] = useState<number>(1);
    const [questionData, setQuestionData] = useState<QuestionSpecific[]>([]);
    useEffect(() => {
        if (quizId)
            getSpecQuestionResult(quizId).then((response) => {
                setQuestionData(response.data);
            });
    }, [])
    return (
        <div className="flex flex-col h-full">
            <div className="p-5 pt-0 flex items-center">
                <div>{t('question')}</div>
                <Pagination showLessItems pageSize={1} current={selectedQuestion} onChange={setSelectedQuestion} total={questions?.length} />
            </div>
            <div className="flex flex-col w-full text-[16px] text-[#455560] justify-center items-center">
                <div style={{ fontFamily: 'Roboto' }}
                    className="bg-white mb-5 rounded-[10px] border-1 p-5 flex flex-col gap-4 w-3/4 border-[#E6EBF1]"
                >
                    <div className="flex gap-2">
                        <div className="flex gap-2 w-full text-[16px] text-[#455560] items-center">{questions && questions[selectedQuestion - 1].nameRu}</div>
                    </div>
                    {questionData && questionData[selectedQuestion - 1]?.answers?.map((ans) => {
                        return (
                            <div key={ans.answerId} className="space-y-4">
                                <label className="flex items-center cursor-pointer">
                                    {/* {questions && questions[selectedQuestion - 1].multipleAns ?
                                        <div
                                            className={`w-4 h-4 rounded border border-gray-300 bg-white flex items-center justify-center mr-3`}
                                        >
                                        </div> :
                                        } */}
                                    <div
                                        className={`w-4 h-4 rounded-full border border-gray-300 bg-white flex items-center justify-center mr-3`}
                                    >
                                    </div>
                                    <span className="text-[#2d3e50]">{ans.answerText}</span>
                                </label>
                            </div>
                        );
                    })}
                </div>
                {questionData && questionData.length && questionData[selectedQuestion - 1].answers.map((ans) => (
                    ans.chosenBy.length ?
                        <div key={ans.answerId} style={{ fontFamily: 'Roboto' }}
                            className="bg-white rounded-[10px] mb-5 border-1 p-5 flex flex-col gap-4 w-3/4 border-[#E6EBF1]"
                        >
                            <div className="flex gap-2">
                                <div className="flex gap-2 w-full text-[16px] text-[#455560] items-center">
                                    {/* {questions && questions[selectedQuestion - 1].multipleAns ?
                                    <div
                                        className={`w-4 h-4 rounded border border-gray-300 bg-white flex items-center justify-center mr-3`}
                                    >
                                        <div className="w-2 h-2 rounded-[1.5px] bg-gray-300" />
                                    </div> :
                                    } */}
                                    <div
                                        className={`w-4 h-4 rounded-full border border-gray-300 bg-white flex items-center justify-center mr-3`}
                                    >
                                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                                    </div>
                                    {ans && ans.answerText}
                                </div>
                            </div>
                            <Select value={`${ans.chosenBy.length} ответа`}
                                options={ans.chosenBy.map(user => ({
                                    label: `${user.firstName} ${user.lastName} (${user.divisionName})`,
                                    value: user.userId
                                }))}
                                onChange={() => { }} />
                        </div> : ''
                ))}
            </div>
        </div>
    );
};

export default SpecificQuestionResult;