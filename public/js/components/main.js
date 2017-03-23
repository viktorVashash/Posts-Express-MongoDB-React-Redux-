import React, { Component } from 'react';
import { Link } from 'react-router';

import Post from './post';

export default class Main extends Component {
  render() {
    return(
      <div>
        <div className="navbars">
          <h1>Main</h1>
          <Link to='/' className="Overview">Overview</Link>
        </div>
        <Post />
        {this.props.children}
      </div>
    );
  }
}
