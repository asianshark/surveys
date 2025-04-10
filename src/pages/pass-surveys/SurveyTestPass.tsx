import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Question, Survey } from "../../entities/Survey";
import CreateSurveyQuestion from "../../widgets/create-survey/CreateSurveyQuestion";
import axios from "axios";
import { Button } from "antd";
import { checkValidPass } from "../../shared/passTest/CheckPassValid";
interface Result {
    percentage: number;
    totalQuestions: number,
    correctAnswers: number,
    questionResults: {
        questionId: number;
        selectedAnswers: number[];
        correctAnswers: number[];
        correct: boolean;
    }[];
}
const SurveyTestPass = () => {
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
        axios.get(`/quizzes/${params.id}`).then((res) => {
            setQuestions(res.data.questions)
            setSurvey(res.data)
        })
    }, [])

    const passTest = async () => {
        let validT
        if (questions) {
            validT = checkValidPass(questions, answers)
            setValid(validT)
        }
        if (validT && validT.valid) {
            await axios.post(`/responses/batch`, answers).then((res) => {
                console.log(res);
            }).then(() => setIsTestPassed(true))
            await axios.get('/responses/result/detailed', {
                params: { userId: 2, quizId: params.id },
            }).then((res) => {
                setResults(res.data);
            });
        }
    }

    const setselectedAns = (ans: number[], id: number | undefined) => {
        let ind
        if (!answers)
            setAnswers([{ userId: "2", quizId: survey?.id, questionId: id, selectedAnswerIds: ans }])
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
                setAnswers([...answers, { userId: "2", quizId: survey?.id, questionId: id, selectedAnswerIds: ans }])
            }
        }
    }
    useEffect(() => {
        if (answers && questions && !valid.valid) {
            setValid(checkValidPass(questions, answers))
        }
        console.log(valid);
    }, [answers])
    return (
        <div className="h-full flex flex-col text-[#1A3353]">
            <div className="px-6 py-4 bg-white flex justify-between">
                <div className="text-[20px]">{survey?.nameRu}</div>
                {!isTestPassed ? 
                    <Button onClick={passTest} size="middle" type="primary">Сдать тест</Button>
                : <></>}
            </div>
            <div className="flex flex-col items-center bg-[#E6E6FA] h-full overflow-y-auto gap-6 pt-3">
                {!isTestPassed ?
                    (questions?.map((item) =>
                        <CreateSurveyQuestion valid={valid} selectedAns={e => setselectedAns(e, item.id)} type="pass" questionP={item} key={item.key} />
                    )) :
                    <div style={{ fontFamily: 'Roboto' }}
                        className="bg-white rounded-[10px] border-1 p-5 flex flex-col gap-4 w-3/4 border-[#E6EBF1]"
                    >
                        <div className="flex gap-2">
                            <div className="flex justify-between gap-2 w-full text-[16px] text-[#455560] items-center">
                                <div>Процент правильных ответов: {results?.percentage}%</div>
                                <div>{results?.correctAnswers}/{results?.totalQuestions}</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default SurveyTestPass