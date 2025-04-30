import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Progress } from "antd";
import { checkValidPass } from "../hooks/CheckPassValid";
import { t } from "i18next";
import { Result } from "../../../entities/SurveysTests/MySurveysTests/SurveyTestPass";
import { Question } from "../../../entities/SurveysTests/Quiz/QuestionSchema";
import { Survey } from "../../../entities/SurveysTests/Quiz/SurveySchema";
import { getDetailedResult, getQuizById, sendBatchResponses } from "../services/passTestSurvey";
import { Quiz } from "../../../entities/SurveysTests/Quiz/QuizSchema";
import CreateSurveyQuestion from "../../../shared/Survey/CreateSurveyQuestion";

const SurveyTestPass = () => {
    const navigate = useNavigate();
    const params = useParams()
    const [questions, setQuestions] = useState<Question[]>()
    const [survey, setSurvey] = useState<Survey>()
    const [isTestPassed, setIsTestPassed] = useState(false)
    const [results, setResults] = useState<Result | null>(null);

    const [answers, setAnswers] = useState<{
        userId: string | undefined,
        quizId: number | undefined,
        questionId: number | undefined,
        selectedAnswerIds: number[]
    }[] | undefined>()
    const [valid, setValid] = useState<{ valid: boolean, questionId: number | undefined }>({ valid: true, questionId: undefined })
    useEffect(() => {
        getQuizById(Number(params.id)).then((res: Quiz) => {
            setQuestions(res.questions)
            setSurvey(res)
        })
    }, [])

    const passTest = async () => {
        let validT
        if (questions) {
            validT = checkValidPass(questions, answers)
            setValid(validT)
        }
        if (validT && validT.valid) {
            await sendBatchResponses(answers).then(() => setIsTestPassed(true))
            await getDetailedResult({
                userId: localStorage.getItem('selectedUser') || '2', quizId: Number(params.id)
            }
            ).then((res: Result) => {
                setResults(res);
            });
        }
    }
    const setselectedAns = (ans: number[], id: number | undefined) => {
        let ind
        if (!answers)
            setAnswers([{ userId: localStorage.getItem('selectedUser') || '2', quizId: survey?.id, questionId: id, selectedAnswerIds: ans }])
        else {
            ind = answers.find(ans => ans.questionId === id)
            if (ind) {
                setAnswers((prev) => {
                    return prev?.map(answer =>
                        answer.questionId === id
                            ? { ...answer, selectedAnswerIds: ans }
                            : answer
                    );
                })
            }
            else {
                setAnswers([...answers, { userId: localStorage.getItem('selectedUser') || '2', quizId: survey?.id, questionId: id, selectedAnswerIds: ans }])
            }
        }
    }
    useEffect(() => {
        if (answers && questions && !valid.valid) {
            setValid(checkValidPass(questions, answers))
        }
    }, [answers])
    return (
        <div className="h-full flex flex-col text-[#1A3353]">
            <div className="px-6 py-4 bg-white flex justify-between z-10">
                <div className="text-[20px]">{survey?.nameRu}</div>
                {!isTestPassed &&
                    <Button onClick={passTest} size="middle" type="primary">Сдать тест</Button>
                }
            </div>
            <div className="flex flex-col items-center bg-[#E6E6FA] h-full overflow-y-auto gap-6 pt-3">
                {!isTestPassed ?
                    (questions?.map((item) =>
                        <CreateSurveyQuestion settings={(questions[0].nameKz && questions[0].nameKz.length ? ['multilang'] : [])} key={item.key} valid={valid} selectedAns={e => setselectedAns(e, item.id)} type="pass" questionP={item} />
                    )) :
                    <div style={{ fontFamily: 'Roboto' }}
                        className="bg-white rounded-[10px] border-1 p-5 flex flex-col gap-4 w-3/4 border-[#E6EBF1]"
                    >
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-around gap-2 w-full text-[16px] text-[#455560] items-center">
                                <Progress strokeColor="#366EF6" type="dashboard" percent={results?.percentage} format={(percent) => <span style={{ color: "rgba(0, 0, 0, 0.88)" }}>{`${percent}%`}</span>} />
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center">
                                        <div className="w-full border-l-[1px] border-[#E6EBF1] pl-5 flex flex-col">
                                            <div>{t('scored-points')}</div>
                                            <div>{results?.correctAnswers}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-full border-l-[1px] border-[#E6EBF1] pl-5 flex flex-col">
                                            <div>{t('total-questions')}</div>
                                            <div>{results?.totalQuestions}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center">
                                        <div className="w-full border-l-[1px] border-[#E6EBF1] pl-5 flex flex-col">
                                            <div>{t('attempt-number')}</div>
                                            <div>{results?.attemptNumber}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-full border-l-[1px] border-[#E6EBF1] pl-5 flex flex-col">
                                            <div>{t('pass-date')}</div>
                                            <div>{results?.finishedAt ? new Date(results?.finishedAt).toLocaleDateString('ru-RU', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false,
                                            }) : results?.finishedAt}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div onClick={() => { navigate(`/surveys-tests/${params.id}`, { state: { tab: 'user-result' } }) }} className="justify-end flex text-blue-500 items-center cursor-pointer hover:underline">{t('more-detailed') + '>>'}</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default SurveyTestPass