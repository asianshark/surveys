import { Radio, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { Answer } from "../../../entities/Survey";
import { CloseCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import inputStyle from "./CreateSurveyQuestionRadioCheckbox.module.css"
const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    fontFamily: 'Roboto ',
};
const CreateSurveyQuestionRadioCheckbox = ({ disabled, quizzType, setSelectedAns, answersP, lang, surveyType, type, getAnswer }: { disabled?: boolean; quizzType: string | undefined, setSelectedAns?: (ans: number[]) => void, answersP?: Answer[], surveyType: string, lang: string, type: string, getAnswer: (answers: Answer[]) => void }) => {
    const [correctAnswerRadio, setCorrectAnswerRadio] = useState<number>();
    const [correctAnswerCheckbox, setCorrectAnswerCheckbox] = useState<number[]>([]);
    const [answers, setAnswers] = useState<Answer[]>([{ nameRu: "Неизвестный ответ", nameKz: "Белгісіз жауап", key: 0 }]);
    const [keys, setKeys] = useState(1)
    useEffect(() => {
        if (answersP) {
            setCorrectAnswerCheckbox([])
            setCorrectAnswerRadio(undefined)
            setAnswers(answersP)
            setKeys(answersP.length)
            if (surveyType === 'create')
                answersP.map((item, i) => {
                    if (item.correct) {
                        setCorrectAnswerRadio(i)
                        setCorrectAnswerCheckbox([...correctAnswerCheckbox, i])
                    }
                })
        }
    }, [])
    useEffect(() => {
        if (type === "singlechoice") {
            if (correctAnswerRadio !== undefined)
                chooseAnswerRadio(correctAnswerRadio)
        }
        else
            chooseAnswerCheckbox(correctAnswerCheckbox)
    }, [type])
    const chooseAnswerRadio = (selectedIndex: number) => {
        if (quizzType !== 'survey')
            setAnswers((prev) => {
                return prev.map((answer) => ({
                    ...answer,
                    correct: answer.key === selectedIndex || answer.id === selectedIndex,
                }));
            });
        if (setSelectedAns)
            setSelectedAns([selectedIndex])
        setCorrectAnswerRadio(selectedIndex);
    };

    const chooseAnswerCheckbox = (selectedIndexes: number[]) => {
        setCorrectAnswerCheckbox(selectedIndexes)
        if (quizzType !== 'survey')
            setAnswers((prev) =>
                prev.map((answer, index) => ({
                    ...answer,
                    correct: selectedIndexes.includes(index),
                }))
            );
        if (setSelectedAns)
            setSelectedAns(selectedIndexes)
    }

    const addVariant = (empty: boolean) => {
        setKeys(keys + 1)
        setAnswers((prev) => [...prev, { nameRu: empty ? "Неизвестный ответ" : 'Затрудняюсь ответить', nameKz: empty ? 'Белгісіз жауап' : 'Маған жауап беру қиын', key: keys }]);
    }
    const changeInput = (value: string, key: number) => {
        setAnswers((prev) => {
            return prev.map(answer =>
                answer.key === key
                    ? { ...answer, [lang === "Рус" ? "nameRu" : "nameKz"]: value }
                    : answer
            );
        });
    }
    const deleteOption = (key: number) => {
        if (key === correctAnswerRadio) {
            setCorrectAnswerRadio(undefined)
        }
        if (correctAnswerCheckbox.includes(key)) {
            setCorrectAnswerCheckbox(correctAnswerCheckbox.filter(item => item !== key))
        }
        setAnswers((prev) => prev.filter(item => item.key !== key))
    }

    useEffect(() => { getAnswer(answers) }, [answers])
    return (
        <>
            {type === "singlechoice" ?
                <Radio.Group
                    className={inputStyle.inputStyle}
                    style={style}
                    onChange={e => chooseAnswerRadio(e.target.value)}
                    value={correctAnswerRadio}
                    options={answers.map((item) => ({
                        value: item.key !== undefined ? item.key : item.id,
                        label: (
                            (surveyType !== 'create' || disabled) ? <div style={{ fontFamily: 'Roboto' }}>{lang === "Рус" ? item?.nameRu : item?.nameKz}</div> :
                                <div key={item.key} className="flex w-full items-center justify-between gap-4">
                                    <TextArea
                                        rows={1}
                                        value={lang === "Рус" ? item?.nameRu : item?.nameKz}
                                        key={item.key}
                                        onChange={e => changeInput(e.target.value, item.key)}
                                        placeholder={lang === "Рус" ? 'Введите ответ' : 'Жауабын енгізіңіз'}
                                        style={{ width: '100%', fontFamily: 'Roboto', fontSize: '14px' }}
                                    />
                                    <div className="flex items-center" onClick={() => deleteOption(item.key)}>
                                        <CloseCircleOutlined />
                                    </div>
                                </div>
                        )
                    }))}
                /> :
                <Checkbox.Group
                    className={inputStyle.inputStyle}
                    style={style}
                    onChange={chooseAnswerCheckbox}
                    value={correctAnswerCheckbox}
                    options={answers.map((item) => ({
                        value: item.id !== undefined ? item.id : item.key,
                        label: (
                            surveyType !== 'create' ? <div>{lang === "Рус" ? item?.nameRu : item?.nameKz}</div> :
                                <div className="flex w-full items-center justify-between gap-4" key={item.key}>
                                    <TextArea
                                        rows={1}
                                        value={lang === "Рус" ? item?.nameRu : item?.nameKz}
                                        key={item.key}
                                        onChange={e => changeInput(e.target.value, item.key)}
                                        placeholder={lang === "Рус" ? 'Пожалуйста введите ответ' : 'Жауабын енгізіңіз'}
                                        style={{ width: '100%', fontFamily: 'Roboto', fontSize: '14px' }}
                                    />
                                    <div className={(surveyType !== 'create' ? 'hidden' : '') + " flex items-center"} onClick={() => deleteOption(item.key)}>
                                        <CloseCircleOutlined />
                                    </div>
                                </div>
                        )
                    }))} />
            }
            {type === "singlechoice" ?
                (correctAnswerRadio === undefined && quizzType !== 'survey' && <div className="text-[12px] text-[#1A3353]">
                    {lang === "Рус" ?
                        <p>Выберите правильный ответ из вышесозданных</p> :
                        <p>Жоғарыдағылардан дұрыс жауапты таңдаңыз</p>
                    }
                </div>)
                :
                (correctAnswerCheckbox.length <= 0 && quizzType !== 'survey' && <div className="text-[12px] text-[#1A3353]">
                    {lang === "Рус" ?
                        <p>Выберите один или более правильный ответ из вышесозданных</p> :
                        <p>Жоғарыдағылардың ішінен бір немесе одан да көп дұрыс жауапты таңдаңыз</p>
                    }
                </div>)}
            <div className={(surveyType !== 'create' || disabled) ? 'hidden' : 'text-[14px]'}>
                {lang === "Рус" ?
                    <p><a onClick={() => addVariant(true)} className="text-[#366EF6] cursor-pointer">Добавить вариант</a>  или  <a className="text-[#366EF6] cursor-pointer" onClick={() => addVariant(false)}>добавить вариант “Затрудняюсь ответить”</a></p>
                    :
                    <p><a onClick={() => addVariant(true)} className="text-[#366EF6] cursor-pointer">Вариант қосу</a>  немесе  <a className="text-[#366EF6] cursor-pointer" onClick={() => addVariant(false)}>«Маған жауап беру қиын» вариантын қосу</a></p>
                }
            </div>
        </>
    )
}
export default CreateSurveyQuestionRadioCheckbox