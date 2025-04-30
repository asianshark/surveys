import { Survey } from "../../../entities/SurveysTests/Quiz/SurveySchema";
import { instance } from "../../../shared/api/instance";

export const getDivisions = () =>
    instance
        .get(`/divisions`)
        .then((response) => response.data.content);

export const createQuizzesV2 = (quizz: Survey) =>
    instance.post(`/quizzes/v2`, quizz).then(response => response.data)

export const getSpecQuestionResult = (quizId: string) =>
    instance.get(`/analytics/${quizId}/questions/users/latest`).then(response => response)

export const getUsersSurveyResList = (quizId: string) =>
    instance.get(`/responses/result/response_list`, { params: { 'quizId': quizId } }).then((res) => res.data)

export const getSurveysResCharts = (id: string) =>
    instance.get(`/analytics/quizzes/${id}/answers-by-department`).then((res) => res.data)
