import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, createPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class Post extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      title: ''
    }
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  titleChange(event) {
    const title = event.target.value;
    this.setState({ title });
  }

  addPost(e) {
    e.preventDefault();
    if(this.state.title !== '') {
      this.props.createPost(this.state.title);
      this.setState({ title: '' });
    } else {
      alert('You must type title!')
    }
  }

  deletePost(id) {
    const answer = confirm('Are you shure?')

    if(answer) {
      this.props.deletePost(id);
    }

  }

  renderPosts() {
    return this.props.posts.map((post) => {
      return(
        <tr key={post._id}>
            <td>
              <Link to={"/post/" + post._id}>{post.title}</Link>
              <span className="badge">{post.comments.length}</span>
            </td>
            <td>
              <button onClick={this.deletePost.bind(this, post._id)} className="btn deleteBtn">Delete</button>
            </td>
        </tr>
      )
    })
  }

  render() {
    if(!this.props.posts) {
      return <div>Loading...</div>
    }

    return(
      <div className="items">
        <h1>Posts</h1>
        <form onSubmit={this.addPost.bind(this)}>
          <input
            className="form-control"
            type="text"
            placeholder="Type title here..."
            value={this.state.title}
            onChange={this.titleChange.bind(this)} />
          <button
            className="btn btnAdd"
            type="submit">
              Add new
          </button>
        </form>
        <table className="tables" cellPadding="15">
          <tbody>
            {this.renderPosts()}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.all
  }
}

export default connect(mapStateToProps, {fetchPosts, createPost, deletePost})(Post);
