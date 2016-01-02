import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'client/components/App';

console.log('Running on client only');

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

Meteor.subscribe('tasks', Meteor.userId());

Meteor.startup(() => {
  ReactDOM.render(<App/>, document.getElementById('render-target'));
});
