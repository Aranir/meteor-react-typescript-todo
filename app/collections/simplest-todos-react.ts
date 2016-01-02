export interface Task {
    _id?: String;
    text: string;
    createdAt: Date;
    checked: boolean;
    owner: string;
    username: string;
    private: boolean;
}

export const Tasks = new Mongo.Collection<Task>('tasks');