export type Answer = { 
    nameRu: string, 
    nameKz: string, 
    correct: boolean, 
    key: number 
}

export type Question = {
    id?: number,
    key?: number,
    nameRu: string,
    nameKz?: string,
    multipleAns?: boolean,
    required: boolean,
    answers?: Answer[],
    active? : boolean,
}

export type Survey = {
    id?: number,
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