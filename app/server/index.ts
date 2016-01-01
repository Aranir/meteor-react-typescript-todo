import {Task, Tasks} from 'collections/simplest-todos-react';

console.log("hello");


if (!Tasks.find().fetch().length) {
    let task = {text: "hello"};
    Tasks.insert(task);
    console.log("we needed to enter some tasks");
}