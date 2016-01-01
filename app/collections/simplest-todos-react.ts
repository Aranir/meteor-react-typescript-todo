export interface Task {
    _id: number;
    text: string;
    someOtherStuff: String;
}

export const Tasks = new Mongo.Collection('tasks');