import { Calendar, Question } from "../../entities/Survey"

export const checkValid = (surveyQuestions: Question[] | undefined, surveyName: string | undefined) => {
    const isValid = true
    if (surveyQuestions && surveyName) {
        if (!(surveyName && surveyName.length > 0))
            return { valid: !isValid, error: 'survayName' }
        let ind = 0
        for (const item of surveyQuestions) {
            ++ind
            if (!(item.nameRu && item.nameRu !== '' && item.nameRu.length > 0))
                return { valid: !isValid, error: 'questionNameRu', questionKey: ind }
            else if (!(item.nameKz && item.nameKz !== '' && item.nameKz.length > 0))
                return { valid: !isValid, error: 'questionNameKz', questionKey: ind }
            else {
                let i = 0
                for (const ans of item.answers) {
                    ++i
                    if (!(ans.nameRu && ans.nameRu !== '' && ans.nameRu.length > 0))
                        return { valid: !isValid, questionKey: ind, error: 'answerRu', answerkey: i }
                    else if (!(ans.nameKz && ans.nameKz !== '' && ans.nameKz.length > 0)) {
                        return { valid: !isValid, questionKey: ind, error: 'answerKz', answerkey: i }
                    }
                }
            }
        }
        return { valid: isValid, error: '' }
    }
    return { valid: !isValid, error: 'survayName' }
}

export const checkValidCalendar = (calendar: Calendar | undefined) => {
    return true
} 