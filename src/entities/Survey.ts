export type Answer = { 
    nameRu: string, 
    nameKz: string, 
    correct: boolean, 
    key: number 
}

export type Question = {
    key?: number,
    nameRu: string,
    nameKz?: string,
    multipleAns?: boolean,
    required: boolean,
    answers?: Answer[],
    active? : boolean,
}

export type Survey = {
    nameRu?: string,
    nameKz?: string,
    authorId?: string,
    status?: 'DRAFT',
    type?: true | boolean,
    everyDay?: false | boolean,
    everyWeek?: false | boolean,
    everyMonth?: false | boolean,
    dayOfWeek?: "MONDAY",
    questions?: Question[],
    divisions?: [
        {
            id: number,
            divisionName: string
        }
    ]
}