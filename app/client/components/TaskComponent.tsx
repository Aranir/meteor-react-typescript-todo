
import * as React from 'react';
import {Task, Tasks} from "../../collections/simplest-todos-react";
import './App.css';
import {TaskCalls} from "../../global";

class TaskProps {
    public key: string;
    public task: Task;
    public showPrivateButton: boolean;
}

export default class TaskComponent extends React.Component<TaskProps, {}> {
    constructor(props: TaskProps) {
        super(props);
    }

    deleteThisTask() {
        Meteor.call(TaskCalls.REMOVE_TASK, this.props.task._id)
    }

    toggleChecked() {
        Meteor.call(TaskCalls.SET_CHECKED, this.props.task._id,  !this.props.task.checked);
    }

    tooglePrivate() {
        Meteor.call(TaskCalls.SET_PRIVATE, this.props.task._id, ! this.props.task.private);
    }
    render() {

        const taskClassName = (this.props.task.checked ? 'checked' : '') + " " +
            (this.props.task.private ? "private" : "");
        return (
            <li className={taskClassName}>
                <button className="delete" onClick={this.deleteThisTask.bind(this)}>
                    &times;
                </button>

                <input
                    type="checkbox"
                    readOnly={true}
                    checked={this.props.task.checked}
                    onClick={this.toggleChecked.bind(this)} />
                {this.props.showPrivateButton ?
                    (
                    <button className="toggle-private" onClick={this.tooglePrivate.bind(this)}>
                        { this.props.task.private ? "Private" : "Public" }
                    </button>
                        ) :
                        null
                    }
                <span className="text">
                    <strong>{this.props.task.username}</strong>: {this.props.task.text}
                </span>
            </li>
        );
    }
}