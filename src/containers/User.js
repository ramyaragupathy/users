import React from 'react';
import UserSubHead from '../components/UserSubHead';
import fetch from 'isomorphic-fetch';

export default React.createClass({
  getInitialState: function () {
    return {
      user: {}
    };
  },
  componentDidMount: function () {
    let component = this;
    if (process.env.NODE_ENV === 'development') {
      fetch('/test/fixtures/db.json')
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error('Bad response');
        }
        return response.json();
      })
      .then(function (db) {
        if (component.isMounted()) {
          component.setState({
            user: db
          });
        }
      });
    }
  },
  render: function () {
    return (
      <div>
            <UserSubHead username={this.props.params.id}/>
        <div id = "User-Container">
          <div id = "Main-User-Container">
            {(
              (typeof this.state.user !== 'undefined')
              ? this.props.children && React.cloneElement(this.props.children, {
                user: this.state.user
              })
                : <div>Loading...</div>)
            }
          </div>
        </div>
      </div>
    );
  }
});
