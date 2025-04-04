import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Question, Survey } from "../../entities/Survey";
import CreateSurveyQuestion from "../../widgets/create-survey/CreateSurveyQuestion";
import axios from "axios";
import { Button } from "antd";
import { checkValidPass } from "../../shared/passTest/CheckPassValid";

const SurveyTestPass = () => {
    const params = useParams()
    const [questions, setQuestions] = useState<Question[]>()
    const [answers, setAnswers] = useState<{
        userId: string | undefined,
        quizId: number | undefined,
        questionId: number | undefined,
        selectedAnswerIds: number[]
    }[] | undefined>()
    const [valid, setValid] = useState<{ valid: boolean, questionId: number  | undefined}>({ valid: true, questionId: undefined })
    useEffect(() => {
        axios.get(`/quizzes/${params.id}`).then((res) => {
            setQuestions(res.data.questions)
            setSurvey(res.data)
        })
        console.log(questions);
        
    }, [])
    const [survey, setSurvey] = useState<Survey>()

    const passTest = async () => {
        if (questions)
            setValid(checkValidPass(questions, answers))
        if(valid.valid){
            await axios.post(`/responses/batch`, answers).then((res) => {
                console.log(res);
            })
        }
    }

    const setselectedAns = (ans: number[], id: number | undefined) => {
        let ind
        if (!answers)
            setAnswers([{ userId: survey?.authorId, quizId: survey?.id, questionId: id, selectedAnswerIds: ans }])
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
                setAnswers([...answers, { userId: survey?.authorId, quizId: survey?.id, questionId: id, selectedAnswerIds: ans }])
            }
        }

        console.log(answers);

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
                <div>
                    <Button onClick={passTest} size="middle" type="primary">Сдать тест</Button>
                </div>
            </div>
            <div className="flex flex-col items-center bg-[#E6E6FA] h-full overflow-y-auto gap-6 pt-3">
                {questions?.map((item) =>
                    <CreateSurveyQuestion valid={valid} selectedAns={e => setselectedAns(e, item.id)} type="pass" questionP={item} key={item.key} />
                )}
            </div>
        </div>
    )
}

export default SurveyTestPass