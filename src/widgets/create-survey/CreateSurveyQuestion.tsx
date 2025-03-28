import { Input, Radio, RadioChangeEvent, Select, Space } from "antd"
import { useEffect, useState } from "react";
import SurveyTableTab from "../../shared/surveys/SurveyTableTab";
const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
};
const CreateSurveyQuestion = () => {
    const [value, setValue] = useState(0);
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const chooseAnswer = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };
    const options = [
        {
            label: 'Текст',
            value: 'text'
        },
        {
            label: "Один из списка",
            value: 'singlechoice'
        },
        {
            label: "Несколько из списка",
            value: "multiplechoices"
        },
        {
            label: 'Шкала',
            value: "scale"
        }
    ]
    const [lang, setLang] = useState("Рус")
    const [question, setQuestion] = useState({ nameRu: "", nameKz: "" })
    const [answers, setAnswers] = useState<{ nameRu: string, nameKz: string }[]>([{ nameRu: "", nameKz: "" }]);
    const [optionsForRadio, setOptionsForRadio] = useState(1)
    const addVariant = () => {
        setOptionsForRadio(optionsForRadio + 1)
        setAnswers((prev) => [...prev, { nameRu: "", nameKz: "" }]);
    }

    const changeInput = (value: string, id: number) => {
        if (lang === "Рус") {
            setAnswers((prev) => {
                const newAnswers = [...prev];
                newAnswers[id] = { nameRu: value, nameKz: newAnswers[id].nameKz };
                return newAnswers;
            });
        } else {
            setAnswers((prev) => {
                const newAnswers = [...prev];
                newAnswers[id] = { nameRu: newAnswers[id].nameRu, nameKz: value };
                return newAnswers;
            })
        }
    }
    const getVariants = () => {
        console.log(answers);
    }
    return (
        <div className={"bg-white rounded-[10px] border-[#E6EBF1] border-1 p-5 flex flex-col gap-4  w-3/4"}>
            <div className="flex gap-2">
                <div className="flex gap-2 w-full">
                    {lang === "Рус" ?
                        <Input value={question.nameRu} placeholder="Вопрос" onChange={e => setQuestion({ nameRu: e.target.value, nameKz: question.nameKz })} /> :
                        <Input value={question.nameKz} placeholder="Вопрос" onChange={e => setQuestion({ nameRu: question.nameRu, nameKz: e.target.value })} />}
                    <Select
                        style={{ width: '100%' }}
                        size={'large'}
                        defaultValue={'multiplechoices'}
                        onChange={handleChange}
                        options={options}
                        optionRender={(option) => (
                            <Space>
                                <span role="img" aria-label={option.data.label}>
                                    {option.data.label}
                                </span>
                            </Space>
                        )}
                    />
                </div>

                <SurveyTableTab tabs={["Рус", "Қаз"]} onChange={setLang} activeTab={lang} />
            </div>
            <Radio.Group
                style={style}
                onChange={chooseAnswer}
                value={value}
                options={Array.from({ length: optionsForRadio }, (_, i) => ({
                    value: i,
                    label: (
                        <div key={i}>
                            <Input
                                variant="borderless"
                                value={lang === "Рус" ? answers[i]?.nameRu : answers[i]?.nameKz}
                                key={i}
                                onChange={e => changeInput(e.target.value, i)}
                                placeholder="please input"
                                style={{ width: 120 }}
                            />
                        </div>
                    )
                }))}
            />
            <div onClick={addVariant}>
                <a>Добавить вариант  или  добавить вариант “Затрудняюсь ответить”</a>
            </div>

            <button onClick={getVariants}>getVariants</button>

        </div>)
}

export default CreateSurveyQuestion