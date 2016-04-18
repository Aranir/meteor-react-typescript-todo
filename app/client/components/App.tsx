import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as reactMixin from 'react-mixin';
import TaskComponent from './TaskComponent';
import BlazeTemplate from './BlazeTemplate';
import './App.css';
import './simplest-todo-react.css';
import {Task, Tasks} from './../../collections/simplest-todos-react';
import {TaskCalls} from "../../global";

Meteor.call('sayHello', function (err, res) {
    console.log(res);
});


interface AppState {
    hideCompleted;
}

interface  Data {
    tasks: Array<Task>;
    incompleteCount: number;
    currentUser: Meteor.User;
}


@reactMixin.decorate(ReactMeteorData)
export default class App extends React.Component<any, AppState> {

    data:Data;

    constructor(props:any) {
        super(props);
        this.state = {hideCompleted: false};
    }

    getMeteorData() {
        let query = {};

        if (this.state.hideCompleted) {
            query = {checked: {$ne: true}};
        }
        return {
            tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
            incompleteCount: Tasks.find(query).count(),
            currentUser: Meteor.user()
        };
    }

    renderTasks() {
        return this.data.tasks.map((task: Task) => {
            const currentUserId = this.data.currentUser && this.data.currentUser._id;
            const showPrivateButton = task.owner === currentUserId;

            return <TaskComponent
                key={task._id}
                task={task}
                showPrivateButton={showPrivateButton}
            />;
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        let element:HTMLInputElement = ReactDOM.findDOMNode<HTMLInputElement>(this.refs['textInput']);
        var text = element.value.trim();
        Meteor.call(TaskCalls.ADD_TASK, text);

        // Clear form
        element.value = "";
    }

    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted
        });
    }

    render() {
        var template = window['Template'];
        return (

            <div className="container">
                <BlazeTemplate template={template.loginButtons}/>

                <header>
                    <h1>Todo List ({this.data.incompleteCount})</h1>
                </header>


                <label className="hide-completed">
                    <input
                        type="checkbox"
                        readOnly={true}
                        checked={this.state.hideCompleted}
                        onClick={this.toggleHideCompleted.bind(this)}/>
                    Hide Completed Tasks
                </label>
                { this.data.currentUser ? (
                    this.createTaskForm()
                    ) : null }



                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }

    private createTaskForm() {
        return (
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                <input
                    type="text"
                    ref="textInput"
                    placeholder="Type to add new tasks"/>
            </form>
        );
    }

}

