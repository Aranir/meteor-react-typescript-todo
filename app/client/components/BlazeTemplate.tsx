import * as React from 'react';
import * as ReactDOM from 'react-dom';


interface BlazeTemplateProps extends React.Props<BlazeTemplate> {
  template: any,
  component?: any,
}

export default class BlazeTemplate extends React.Component<BlazeTemplateProps, any> {
  static propTypes: React.ValidationMap<BlazeTemplateProps> = {
    template: React.PropTypes.any.isRequired,
  }

  static defaultProps = {
    component: 'div',
  }

  view: Blaze.View;

// we don't want to re-render this component if parent changes
  shouldComponentUpdate() {
    return false;
  }
  componentDidMount() {
    let {template} = this.props;
    this.view = Blaze.render(template, ReactDOM.findDOMNode(this.refs['root']));
  }
  componentWillUnmount() {
    Blaze.remove(this.view);
  }
  render() {
    let Component = this.props.component;
    return <Component {...this.props} ref="root" />;
  }
}
