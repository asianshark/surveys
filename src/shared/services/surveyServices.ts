import { Survey } from "../../entities/SurveysTests/Quiz/SurveySchema";
import { instance } from "../api/instance";
import { GetQuizzesParams, GetQuizzesResponse } from "../schemas/getQuizzesData";

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
        .then((response: { data: Survey }) => response.data);

export const getUserResultByAttempt = ({ userId, quizId, attemptNumber }: { userId: string, quizId: string, attemptNumber: number }) =>
    instance.get(`/responses/result/attempt`, {
        params: { userId, quizId, attempt: attemptNumber },
    }).then((res) => res.data);

export const getUsers = () =>
    instance.get(`/users`).then(res => res.data)