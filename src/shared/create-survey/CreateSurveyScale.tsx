import { Input, Select } from "antd"
import { useEffect, useState } from "react"
const CreateSurveyScale = () => {
    const options = [
        { "label": "1", "value": 1 },
        { "label": "2", "value": 2 },
        { "label": "3", "value": 3 },
        { "label": "4", "value": 4 },
        { "label": "5", "value": 5 }]

    const [selectedValue, setSelectedValue] = useState<number[]>([1, 5])
    const [scaleDesc, setScaleDesc] = useState<string[]>(["", ""])
    useEffect(() => {
        if (selectedValue[0] > selectedValue[1])
            setSelectedValue([selectedValue[1], selectedValue[0]])
    }, selectedValue)
    return (
        <div className="flex flex-col gap-4 text-[#1A3353]<Input/>">
            <div className="flex gap-4 items-center">
                <Select
                    size="large"
                    defaultValue={1}
                    value={selectedValue[0]}
                    onChange={e => setSelectedValue([e, selectedValue[1]])}
                    options={options} />
                <p className="">-</p>
                <Select
                    size="large"
                    value={selectedValue[1]}
                    defaultValue={5}
                    onChange={e => setSelectedValue([selectedValue[0], e])}
                    options={options} />
            </div>
            <div className="flex gap-2 items-center">
                <div>{selectedValue[0]}</div><p>-</p><Input value={scaleDesc[0]} onChange={e => setScaleDesc([e.target.value, scaleDesc[1]])} placeholder="Подпись (необязательно)" />
            </div>
            <div className="flex gap-2 items-center">
                <div>{selectedValue[1]}</div><p>-</p><Input value={scaleDesc[1]} onChange={e => setScaleDesc([scaleDesc[0], e.target.value])} placeholder="Подпись (необязательно)" />
            </div>
        </div>
    )
}

export default CreateSurveyScale