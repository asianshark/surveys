export type Answer = { 
    nameRu: string, 
    nameKz: string, 
    correct: boolean, 
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
    id: number;
    divisionName: string;
    quizIds: number[] | null;
}
export interface Quiz {
    id: number;
    nameRu: string;
    nameKz: string;
    status: "DRAFT" | "PUBLISHED" | "CLOSED"; // Можно уточнить возможные статусы
    createdAt: string; // ISO формат даты
    updatedAt: string;
    authorId: number | null;
    type: boolean;
    startDate: string;
    endDate: string;
    everyDay: boolean;
    everyWeek: boolean;
    everyMonth: boolean;
    dayOfWeek: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY"; // Ограничение на дни недели
    questions: Question[] | null; // Можно уточнить, если известна структура вопросов
    divisions: Division[];
}