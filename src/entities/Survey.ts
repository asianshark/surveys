export type Answer = { 
    nameRu: string, 
    nameKz: string,
    diagramsNameRu?: string,
    diagramsNameKz?: string,
    noteNameRu?: string,
    noteNameKz?: string,
    correct?: boolean, 
    key: number,
    id? : number,
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
    nameRu: string,
    description?: string,
    nameKz?: string,
    authorId?: string,
    status?: 'DRAFT',
    type?: true | boolean,
    everyDay?: false | boolean,
    everyWeek?: false | boolean,
    everyMonth?: false | boolean,
    dayOfWeek?: "MONDAY",
    questions: Question[],
    divisions?: [
        {
            id: number,
            divisionName: string
        }
    ]
}

export type Settings = {
    type: boolean,
    divisions: {
        divisionName: string,
        quisIds: number[]
    }
}

export type Calendar ={
    startDate: string,
    endDate: string,
    everyDay: boolean,
    everyWeek: boolean,
    everyMonth: boolean,
    dayOfWeek?: string,
}

export interface Division {
    id: number | undefined;
    divisionName: string | undefined;
    quizIds?: number[] | null;
}

export interface Jurisdiction {
    division?: Division | undefined,
    jurisdiction: string | undefined,
    officialPosition?: string | undefined,
    users?: string[] | undefined
}