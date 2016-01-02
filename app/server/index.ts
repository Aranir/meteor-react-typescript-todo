import {Task, Tasks} from 'collections/simplest-todos-react';

console.log("hello");


Meteor.publish('tasks', function() {
    console.log("Current server user: " + this.userId);
    return Tasks.find({
        $or: [{
            private: {$ne: true}},
            {owner: this.userId}
        ]
    });
});

Meteor.methods({
    addTask(text) {
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Tasks.insert({
            text: text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            checked: false,
            username: Meteor.user().username,
            private: false
        });
    },

    removeTask(taskId) {
        const task: Task = Tasks.findOne(taskId);
        if (task.private && task.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error("not-authorized");
        }

        Tasks.remove(taskId);
    },

    setChecked(taskId, setChecked) {
        const task = Tasks.findOne(taskId);
        if (task.private && task.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can check it off
            throw new Meteor.Error("not-authorized");
        }

        Tasks.update(taskId, { $set: { checked: setChecked} });
    },

    setPrivate(taskId: string, setToPrivate: boolean) {
        const task: Task = Tasks.findOne(taskId);

        if (task.owner !== Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Tasks.update(taskId, {$set: {private: setToPrivate}});
    }
});