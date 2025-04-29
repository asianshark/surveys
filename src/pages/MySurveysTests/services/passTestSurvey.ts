import { instance } from "../../../shared/api/instance";
import { GetQuizzesParams } from "../../../shared/schemas/getQuizzesData";
import { GetQuizzesResponse } from "../../../shared/schemas/getQuizzesData";
import { Quiz } from "../../../entities/SurveysTests/Quiz/QuizSchema";
import { Result } from "../../../entities/SurveysTests/MySurveysTests/SurveyTestPass";

export const getQuizzes = ({ page, size }: GetQuizzesParams) =>
    instance
        .get(`/quizzes`, {
            params: {
                page: page,
                size: size
            }
        })
        .then((response: { data: GetQuizzesResponse }) => response.data);

export const getQuizById = (id: number) =>
    instance
        .get(`/quizzes/${id}`)
        .then((response: { data: Quiz }) => response.data);

export const sendBatchResponses = (answers: {
    userId: string | undefined,
    quizId: number | undefined,
    questionId: number | undefined,
    selectedAnswerIds: number[]
}[] | undefined) => {
    return instance.post("/responses/batch", answers);
};

export const getDetailedResult = ({ userId, quizId }: {
    userId: string;
    quizId: number;
}) => {
    return instance
        .get("/responses/result/detailed", {
            params: { userId, quizId },
        })
        .then((res: { data: Result }) => res.data);
};