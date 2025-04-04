import { Question } from "../../entities/Survey";

export const checkValidPass = (questions: Question[], answers: { questionId: number | undefined, selectedAnswerIds: number[] }[] | undefined) => {
    for (const ques of questions) {
        if (!answers)
            return { valid: false, questionId: ques.id }
        const ans = answers.find(ans => ans.questionId === ques.id);

        if (ques.required) {
            if (!ans || ans.selectedAnswerIds.length === 0) {
                return { valid: false, questionId: ques.id };
            }
        }

        if (!ans) {
            return { valid: false, questionId: ques.id };
        }
    }
    return { valid: true, questionId: undefined }
}