import React from 'react';


class JobDetial extends React.Component {

  componentWillMount() {}
  render() {
    return (
      <h1>current job is id { this.props.match.params.id }</h1>
    )
  }
}

export default JobDetial