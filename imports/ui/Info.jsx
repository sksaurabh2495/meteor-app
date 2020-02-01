import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { render } from 'react-dom';
import Comments from '../api/comments';
import App from './App.jsx';

class Info extends Component {

  state = {
    newComment: ""
  }

  updateInputValue = (evt) => {
    this.setState({ newComment: evt.target.value });
  }

  addComment = () => {
    if(this.state.newComment != ""){
      this.props.comments.push({ title:this.state.newComment, user:sessionStorage.getItem("key"), createdAt: new Date(), _id:this.props.comments.length });
      this.setState({ newComment: "" });
      this.insertComment(this.state.newComment, sessionStorage.getItem("key"));
    }
  }
  
  insertComment = (title, user) => {
    Comments.insert({ title, user, createdAt: new Date() });
  }

  logout = () => {
    sessionStorage.removeItem('key');
    render(<App />, document.getElementById('react-target')); 
  }

  render() {
    var comments = this.props.comments.map(
      comment => this.makeComment(comment)
    );

    return (
      <div>
        <div className="header">
          <h4 className="logout-label" onClick={this.logout}>Logout!</h4>
        </div>
        <div className="add-comment">
          <input type="text" name="add-comment" value={this.state.newComment} onChange={this.updateInputValue} />
          <button  onClick={this.addComment} >Add Comment</button>
        </div>
        <div>{ comments }</div>
      </div>
    );
  }

  makeComment(comment) {
    return (
      <div className="comment" key={comment._id}>
        <span>@{comment.user}</span>
        <div>
          {comment.title}
        </div>
      </div>
    );
  }
}

export default InfoContainer = withTracker(() => {
  return {
    comments: Comments.find().fetch(),
  };
})(Info);
