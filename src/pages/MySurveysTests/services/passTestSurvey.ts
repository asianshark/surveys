import { instance } from "../../../shared/api/instance";
import { Result } from "../../../entities/SurveysTests/MySurveysTests/SurveyTestPass";

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