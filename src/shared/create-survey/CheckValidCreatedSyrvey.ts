import { Calendar, Question } from "../../entities/Survey"

export const checkValid = (surveyQuestions: Question[] | undefined, surveyName: string | undefined) => {
    const isValid = true
    if (surveyQuestions && surveyName) {
        if (!(surveyName && surveyName.length > 0))
            return { valid: !isValid, error: 'survayName' }
        for (const item of surveyQuestions) {
            if (!(item.nameRu && item.nameRu !== '' && item.nameRu.length > 0))
                return { valid: !isValid, error: 'questionNameRu', key: item.key }
            else if (!(item.nameKz && item.nameKz !== '' && item.nameKz.length > 0))
                return { valid: !isValid, error: 'questionNameKz', key: item.key }
            else
                for (const ans of item.answers) {
                    if (!(ans.nameRu && ans.nameRu !== '' && ans.nameRu.length > 0))
                        return { valid: !isValid, error: 'answerRu', key: ans.key }
                    else if (!(ans.nameKz && ans.nameKz !== '' && ans.nameKz.length > 0)) {
                        return { valid: !isValid, error: 'answerKz', key: ans.key }
                    }
                    else
                        if (ans.correct)
                            return { valid: isValid, error: '' }
                }
        }
    }
    return { valid: !isValid, error: 'survayName' }
}

export const checkValidCalendar = (calendar: Calendar | undefined) => {
    return true
} 