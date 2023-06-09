import React, {useEffect} from 'react'
import {Paper, Typography, CircularProgress, Divider} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import {useParams, useHistory} from 'react-router-dom'
import useStyles from './styles'
import CommentSection from './CommentSection'

import {getPost, getPostBySearch} from '../../actions/posts'

const PostDetails = () => {
  const {post, posts, isLoading} = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const {id} = useParams()

  //console.log(post)

  useEffect(() => {
    dispatch(getPost(id))
  }, [id])

  useEffect(() => {
    if(post) {
      dispatch(getPostBySearch({search: 'none', tags: post?.tags?.join(',')}))
    }
  }, [post])


  if(!post) return null

  if(isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size='7em'/>
      </Paper>
    )
  }

  
  const recommendedPost = posts.filter(({_id}) => _id !== post._id)

  const openPost = (_id) => history.push(`/posts/${_id}`) 

  return (
    <Paper style={{padding: '20px', borderRadius: '15px'}} elevation={6}>
      <div className={classes.card}>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags?.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Uploaded by {post.name}</Typography>
          <Typography variant="body1">{moment(post.createAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post}/>
          <Divider style={{ margin: '20px 0' }} />
        </div>
      </div>
      {recommendedPost.length > 0 ?  (
        <div>
          <Typography>You make also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
          {recommendedPost.map(({title, message, name, likes, selectedFile, _id}) => (
            <div style={{margin: '20px', cursor: 'pointer'}} onClick={() => openPost(_id)} key={_id}>
              {title}
            </div>
          ))}
          </div>  
        </div>
      ): null}
    </Paper>
  )
}

export default PostDetails