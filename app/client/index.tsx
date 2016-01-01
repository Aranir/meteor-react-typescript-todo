import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'client/components/App';

console.log('Running on client only');

Meteor.startup(() => {
  ReactDOM.render(<App/>, document.getElementById('render-target'));
});
