import {Component} from 'react'
import {v4 as uuidv4} from 'uuid' // Import the v4 function as uuidv4
import './index.css'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      name: '',
      commentText: '',
    }
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleAddComment = event => {
    event.preventDefault()

    const {name, commentText} = this.state

    if (name.trim() !== '' && commentText.trim() !== '') {
      const randomColor =
        initialContainerBackgroundClassNames[
          Math.floor(
            Math.random() * initialContainerBackgroundClassNames.length,
          )
        ]
      const newComment = {
        id: uuidv4(), // Use uuidv4 to generate a unique ID
        name,
        text: commentText,
        liked: false,
        bgColor: randomColor,
      }

      this.setState(prevState => ({
        comments: [...prevState.comments, newComment],
        name: '',
        commentText: '',
      }))
    }
  }

  handleLikeToggle = commentId => {
    this.setState(prevState => ({
      comments: prevState.comments.map(comment =>
        comment.id === commentId
          ? {...comment, liked: !comment.liked}
          : comment,
      ),
    }))
  }

  handleDeleteComment = commentId => {
    this.setState(prevState => ({
      comments: prevState.comments.filter(comment => comment.id !== commentId),
    }))
  }

  render() {
    const {comments, name, commentText} = this.state

    return (
      <div className="bg-container">
        <div className="app-container">
          <h1 className="main-heading">Comments</h1>
          <div className="container">
            <div className="comment-container">
              <form className="comment-form" onSubmit={this.handleAddComment}>
                <p className="desc">Say something about 4.0 Technologies</p>
                <input
                  type="text"
                  className="name"
                  name="name"
                  value={name}
                  placeholder="Your Name"
                  onChange={this.handleInputChange}
                />
                <textarea
                  className="comment"
                  placeholder="Your Comment"
                  name="commentText"
                  rows="5"
                  cols="50"
                  value={commentText}
                  onChange={this.handleInputChange}
                />
                <button type="submit" className="add-btn">
                  Add Comment
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                alt="comments"
                className="bg-image"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="added-comments-section">
            <h1 className="heading comments-count">
              {comments.length} Comments
            </h1>
            <ul className="comments-list-container">
              {comments.map(comment => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onLikeToggle={() => this.handleLikeToggle(comment.id)}
                  onDelete={() => this.handleDeleteComment(comment.id)}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Comments
