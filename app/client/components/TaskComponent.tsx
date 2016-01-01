
import * as React from 'react';

class TaskProps {
    public _id: number;
    public text: string;
}

export default class Task extends React.Component<TaskProps, {}> {
    constructor(props: TaskProps) {
        super(props);
    }

    render() {
        return (
            <li>{this.props.text}</li>
        );
    }
}