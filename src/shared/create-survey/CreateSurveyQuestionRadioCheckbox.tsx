import { RadioChangeEvent, Radio, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { Answer } from "../../entities/Survey";
import { CloseCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    fontFamily: 'Roboto ',
};
const CreateSurveyQuestionRadioCheckbox = ({ setSelectedAns, answersP, lang, surveyType, type, getAnswer }: { setSelectedAns?: (ans: number[]) => void, answersP?: Answer[], surveyType: string, lang: string, type: string, getAnswer: (answers: Answer[]) => void }) => {
    const [correctAnswerRadio, setCorrectAnswerRadio] = useState<number>();
    const [correctAnswerCheckbox, setCorrectAnswerCheckbox] = useState<number[]>([]);
    const [answers, setAnswers] = useState<Answer[]>([{ nameRu: "", nameKz: "", correct: true, key: 0 }]);
    const [keys, setKeys] = useState(1)
    useEffect(() => {
        if (answersP) {
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
    const chooseAnswerRadio = (e: RadioChangeEvent) => {
        setAnswers((prev) => {
            return prev.map((answer, index) => ({
                ...answer,
                correct: index === e.target.value,
            }));
        });
        if (setSelectedAns)
            setSelectedAns([e.target.value])
        setCorrectAnswerRadio(e.target.value);
    };

    const chooseAnswerCheckbox = (selectedIndexes: number[]) => {
        setCorrectAnswerCheckbox(selectedIndexes)
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
        setAnswers((prev) => [...prev, { nameRu: empty ? '' : 'Затрудняюсь ответить', nameKz: empty ? '' : 'Маған жауап беру қиын', correct: false, key: keys }]);
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
        setAnswers((prev) => prev.filter(item => item.key !== key))
    }

    useEffect(() => { getAnswer(answers) }, [answers])
    return (
        <>
            {type === "singlechoice" ?
                <Radio.Group
                    style={style}
                    onChange={chooseAnswerRadio}
                    value={correctAnswerRadio}
                    options={answers.map((item) => ({
                        value: item.key !== undefined ? item.key : item.id,
                        label: (
                            surveyType !== 'create' ? <div style={{ fontFamily: 'Roboto' }}>{lang === "Рус" ? item?.nameRu : item?.nameKz}</div> :
                                <div key={item.key} className="flex w-full items-center justify-between gap-4">
                                    <TextArea
                                        rows={1}
                                        variant="borderless"
                                        value={lang === "Рус" ? item?.nameRu : item?.nameKz}
                                        key={item.key}
                                        onChange={e => changeInput(e.target.value, item.key)}
                                        placeholder={lang === "Рус" ? 'Введите ответ' : 'Жауабын енгізіңіз'}
                                        style={{ width: '100%', fontFamily: 'Roboto' }}
                                    />
                                    <div className="flex items-center" onClick={() => deleteOption(item.key)}>
                                        <CloseCircleOutlined />
                                    </div>
                                </div>
                        )
                    }))}
                /> :
                <Checkbox.Group
                    style={style}
                    onChange={chooseAnswerCheckbox}
                    value={correctAnswerCheckbox}
                    options={answers.map((item, i) => ({
                        value: i,
                        label: (
                            surveyType !== 'create' ? <div>{lang === "Рус" ? item?.nameRu : item?.nameKz}</div> :
                                <div className="flex w-full items-center justify-between gap-4" key={item.key}>
                                    <TextArea
                                        rows={1}
                                        variant="borderless"
                                        value={lang === "Рус" ? item?.nameRu : item?.nameKz}
                                        key={item.key}
                                        onChange={e => changeInput(e.target.value, item.key)}
                                        placeholder={lang === "Рус" ? 'Пожалуйста введите ответ' : 'Жауабын енгізіңіз'}
                                        style={{ width: '100%', fontFamily: 'Roboto' }}
                                    />
                                    <div className={(surveyType !== 'create' ? 'hidden' : '') + " flex items-center"} onClick={() => deleteOption(item.key)}>
                                        <CloseCircleOutlined />
                                    </div>
                                </div>
                        )
                    }))} />
            }
            <div className={surveyType !== 'create' ? 'hidden' : 'pl-7 pt-2'}>
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