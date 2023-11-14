import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {comment, onLikeToggle, onDelete} = props
  const {id} = comment

  const onLikeToggled = () => {
    onLikeToggle()
  }

  const onDeleted = () => {
    onDelete(id)
  }

  const times = formatDistanceToNow(new Date())

  return (
    <li className="comment-list-item">
      <div className="item-header">
        <button
          type="button"
          className="icon"
          onClick={onLikeToggled}
          style={{backgroundColor: comment.bgColor}}
        >
          <p className={`initial ${comment.liked ? 'liked' : ''}`}>
            {comment.name[0]}
          </p>
        </button>
        <h1 className="username">{comment.name}</h1>
        <p className="time">{times}</p>
      </div>
      <p className="comment-details">{comment.text}</p>
      <div className="item-footer">
        <div className="like-section">
          <img
            src={
              comment.liked
                ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
            }
            alt={comment.liked ? 'Liked' : 'Like'}
            className="like-icon"
          />
          <button className="like" onClick={onLikeToggled} type="button">
            {comment.liked ? 'Liked' : 'Like'}
          </button>
        </div>
        <button
          className="delete-btn"
          onClick={onDeleted}
          type="button"
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
