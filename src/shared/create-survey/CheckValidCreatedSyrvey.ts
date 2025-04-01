import { Question } from "../../entities/Survey"

export const checkValid = (surveyQuestions: Question[] | undefined, surveyName: string | undefined) => {
    const isValid = true
    if (surveyQuestions && surveyName) {
        if (!(surveyName && surveyName.length > 0))
            return { valid: !isValid, error: 'survayName' }
        surveyQuestions.map((item, ind) => {
            if (!(item.nameRu && item.nameRu.length > 0))
                return { valid: !isValid, error: 'questionNameRu', key : ind}
            else if (!(item.nameKz && item.nameKz.length > 0))
                return { valid: !isValid, error: 'questionNameKz', key : ind}
            else
                item.answers?.map((ans) => {
                    if (!(ans.nameRu && ans.nameRu.length > 0))
                        return { valid: !isValid, error: 'answerRu', key: ans.key }
                    else if (!(ans.nameKz && ans.nameKz.length > 0)) {
                        return { valid: !isValid, error: 'answerKz', key: ans.key }
                    }
                    else
                        if (ans.correct)
                            return isValid

                })
        })
    }
    return { valid: !isValid, error: 'survayName' }
}