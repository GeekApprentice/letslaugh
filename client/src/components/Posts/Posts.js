import React from "react";
import {Grid, CircularProgress} from '@material-ui/core'
import { useSelector } from "react-redux";
import Post from './Post/Post'

import useStyles from './styles'

const Posts = ({setCurrentId}) => {
    const {posts, isLoading} = useSelector((state) => state.posts)
    const classes = useStyles()
    //console.log(posts);

    if(!posts.length && !isLoading) return 'No Memes yet'

    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} md={4}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    ) 
}

export default Posts