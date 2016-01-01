/// <reference path="../../../typings/meteor/meteor-react.d.ts"/>

import * as React from 'react';
import * as reactMixin from 'react-mixin';
import TaskComponent from 'client/components/TaskComponent';
//import BlazeTemplate from './BlazeTemplate';
//import {Template} from '../globals';
import './App.css';
import './simplest-todo-react.css';
import {Task, Tasks} from 'collections/simplest-todos-react';

Meteor.call('sayHello', function(err, res) {
  console.log(res);
});

interface  Data {
    tasks: Array<Task>;
}

@reactMixin.decorate(ReactMeteorData)
export default class App extends React.Component<any, any> {

    data: Data;

    getMeteorData() {
        return {
            tasks: Tasks.find().fetch()
        };
    }

    getTasks() {
        return [
            { _id: 1, text: "This is task 1" },
            { _id: 2, text: "This is task 2" },
            { _id: 3, text: "This is task 3" }
        ];
    }

    renderTasks() {
        return this.data.tasks.map((task) => {
            return <TaskComponent _id={task._id} text={task.text} />;
        });
    }

  render() {
      return (
          <div className="container">
              <header>
                  <h1>Todo List</h1>
              </header>

              <ul>
                  {this.renderTasks()}
              </ul>
          </div>
      );
  }
}

