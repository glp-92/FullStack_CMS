import PostListCard from './PostListCard';
import Grid from '@mui/material/Grid';

const PostList = ({ postArr }) => {
    return (
        <Grid sx={{ width: 'auto' }} container rowSpacing={2}>
            {postArr.map(item => (
                <Grid key={item.id} item xs={12} md={6}>
                    <PostListCard postData={item} />
                </Grid>
            ))}
        </Grid>
    )
}
export default PostList