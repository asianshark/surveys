import { RadioChangeEvent, Radio, Input, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { Answer } from "../../entities/Survey";
import { CloseCircleOutlined } from "@ant-design/icons";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
};
const CreateSurveyQuestionRadioCheckbox = ({ lang, type, getAnswer }: { lang: string, type: string, getAnswer: (answers: Answer[]) => void }) => {
    const [correctAnswerRadio, setCorrectAnswerRadio] = useState(0);
    const [correctAnswerCheckbox, setCorrectAnswerCheckbox] = useState([0]);
    const [answers, setAnswers] = useState<Answer[]>([{ nameRu: "", nameKz: "", correct: true, key: 0 }]);

    const chooseAnswerRadio = (e: RadioChangeEvent) => {
        setAnswers((prev) => {
            return prev.map((answer, index) => ({
                ...answer,
                correct: index === e.target.value,
            }));
        });
        setCorrectAnswerRadio(e.target.value);
    };

    const chooseAnswerCheckbox = (selectedIndexes: number[]) => {
        const newAnswer: Answer[] = []
        setCorrectAnswerCheckbox(selectedIndexes)
        setAnswers((prev) =>
            prev.map((answer, index) => ({
                ...answer,
                correct: selectedIndexes.includes(index),
            }))
        );
        setAnswers(newAnswer)
    }

    const addVariant = () => {
        setAnswers((prev) => [...prev, { nameRu: "", nameKz: "", correct: false, key: answers.length + 1 }]);
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
                    options={answers.map((item, i) => ({
                        value: i,
                        label: (
                            <div key={item.key} className="flex w-full justify-between">
                                <Input
                                    variant="borderless"
                                    value={lang === "Рус" ? item?.nameRu : item?.nameKz}
                                    key={item.key}
                                    onChange={e => changeInput(e.target.value, item.key)}
                                    placeholder="please input"
                                    style={{ width: '100%' }}
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
                            <div key={item.key}>
                                <Input
                                    variant="borderless"
                                    value={lang === "Рус" ? item?.nameRu : item?.nameKz}
                                    key={item.key}
                                    onChange={e => changeInput(e.target.value, item.key)}
                                    placeholder="please input"
                                    style={{ width: 120 }}
                                />
                                <div className="flex items-center" onClick={() => deleteOption(item.key)}>
                                    <CloseCircleOutlined />
                                </div>
                            </div>
                        )
                    }))} />
            }
            <div>
                <a><a onClick={addVariant} className="text-[#366EF6] cursor-pointer">Добавить вариант</a>  или  <a className="text-[#366EF6] cursor-pointer">добавить вариант “Затрудняюсь ответить”</a></a>
            </div>
        </>
    )
}

export default CreateSurveyQuestionRadioCheckbox