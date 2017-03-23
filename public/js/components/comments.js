import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, addComment, deleteComment } from '../actions/index';

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: ''
    }
  }

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  handleFetchPost() {
    this.props.fetchPost(this.props.params.id);
  }

  commentChange(event) {
    console.log(event.type);
    const comment = event.target.value;
    this.setState({ comment });
  }

  addComment(e) {
    e.preventDefault();
    this.props.addComment(this.props.params.id, this.state.comment);
    this.setState({ title: '' });
  }

  removeComment(comment) {
    const answer = confirm('Are you shure?')

    if(answer) {
      this.props.deleteComment(this.props.params.id, comment);
    }
  }

  renderComments() {
    return(
      this.props.post.comments.map((comment, index) => {
        return (
          <tr key={index} className="commentText">
            <td>
              <p>{comment}</p>
            </td>
            <td>
              <button className="btnClose" onClick={this.removeComment.bind(this, comment)}>
                <span className="glyphicon glyphicon-remove"  aria-hidden="true"></span>
              </button>
            </td>
          </tr>
        );
      })
    );
  }

  render() {
    if(!this.props.post) {
      return(
        <div>Loading...</div>
      );
    }

    if(this.props.post._id !== this.props.params.id) {
      this.handleFetchPost();
    }

    return(
      <div key={this.props.post._id} className="comments">
        <h1>Comments</h1>
        <table className="tables comments-table">
          <tbody>
            {this.renderComments()}
          </tbody>
        </table>
        <form onSubmit={this.addComment.bind(this)}>
        	<p><textarea onChange={this.commentChange.bind(this)} className="form-control"></textarea></p>
          <button type="submit" className="btn submit">Submit</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.posts.post
  };
}

export default connect(mapStateToProps, {fetchPost, addComment, deleteComment})(Comments);
