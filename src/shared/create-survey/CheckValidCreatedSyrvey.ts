import { Calendar, Question } from "../../entities/Survey"

export const checkValid = (surveyQuestions: Question[] | undefined, surveyNameRu: string | undefined, surveyNameKz: string | undefined, multilang: boolean) => {
    const isValid = true
    if (surveyQuestions && surveyQuestions.length > 0) {
        if (!(surveyNameRu && surveyNameRu !== '' && surveyNameRu.length > 0))
            return { valid: !isValid, warning: 'наименование опроса', lang: 'ru' }
        else if (multilang && !(surveyNameKz && surveyNameKz !== '' && surveyNameKz.length > 0))
            return { valid: !isValid, warning: 'наименование опроса', lang: 'kz' }
        let ind = 0
        for (const item of surveyQuestions) {
            ++ind
            if (!(item.nameRu && item.nameRu !== '' && item.nameRu.length > 0))
                return { valid: !isValid, warning: 'вопроса', questionKey: ind, lang: 'ru' }
            else if (multilang && !(item.nameKz && item.nameKz !== '' && item.nameKz.length > 0))
                return { valid: !isValid, warning: 'вопроса', questionKey: ind, lang: 'kz' }
            else {
                let i = 0
                if (item.answers && item.answers.length > 0) {
                    let correctAns = false
                    for (const ans of item.answers) {
                        ++i
                        if (!(ans.nameRu && ans.nameRu !== '' && ans.nameRu.length > 0))
                            return { valid: !isValid, questionKey: ind, warning: 'ответа', answerkey: i, lang: 'ru' }
                        else if (multilang && !(ans.nameKz && ans.nameKz !== '' && ans.nameKz.length > 0)) {
                            return { valid: !isValid, questionKey: ind, warning: 'ответа', answerkey: i, lang: 'kz' }
                        }
                        else if (ans.correct) {
                            correctAns = true
                        }
                    }
                    if(!correctAns)
                        return {valid : !isValid, error: 'Укажите правильный ответ. Вопрос №' + ind}
                }
                else {
                    return { valid: !isValid, questionKey: ind, warning: 'ответа', answerkey: i, lang: 'kz' }
                }
            }
        }
        return { valid: isValid, warning: '' }
    }
    return { valid: !isValid, error: 'В опросе отсуствуют вопросы' }
}

export const checkValidCalendar = (calendar: Calendar | undefined) => {
    if (calendar && calendar !== undefined)
        if (calendar.endDate && calendar.startDate)
            return true
    alert('Выберите дни проведения опроса')
    return false
}

export const checkValidSettings = (divisions: { id: number | undefined, divisionName: string | undefined } | undefined) => {
    return true
    if (divisions && divisions !== undefined)
        if (divisions?.id && divisions?.divisionName)
            return true
    alert('Вы не выбрали юрисдикцию')
    return false
}