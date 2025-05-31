import { memo } from 'react'
import { Link } from 'react-router-dom';
import { DateFormatToEs } from '../../../util/date/DateFormatToEs';
import { TruncateText } from '../../../util/formatting/TruncateText';

import {
    Card, CardContent, CardMedia, Typography, Box,
    Chip, Stack, Divider
} from '@mui/material';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

const PostListCard = memo(({ postData }) => {
    const categories = postData.categories.map(category => (
        <Box sx={{ margin: 1 }} key={category.id}>
            <Chip
                sx={{ bgcolor: 'icons.light' }}
                size="small"
                label={<Typography variant="caption">{category.name}</Typography>}
            />
        </Box>
    ));
    return (
        <Link to={`/post/${postData.slug}`} style={{ textDecoration: 'none' }}>
            <Card sx={{
                marginInline: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                ":hover": { opacity: 0.8 }
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {postData.featuredImage && (
                        <Box bgcolor="#f5f5f5" display="flex" justifyContent="center">
                            <CardMedia
                                component="img"
                                loading="lazy"
                                alt={postData.slug}
                                image={postData.featuredImage}
                                title={`${postData.slug}Image`}
                                sx={{ maxHeight: 150, width: 'auto', height: 'auto', objectFit: "contain" }}
                            />
                        </Box>
                    )}
                    <CardContent>
                        <Typography gutterBottom variant="h5">{postData.title}</Typography>
                        <Typography variant="body1" color="text.secondary">
                            {TruncateText(postData.excerpt, 150)}
                        </Typography>
                    </CardContent>
                </Box>
                <Divider />
                <Stack direction="row-reverse" sx={{ margin: 1 }} spacing={1} justifyContent="space-between">
                    <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                        <EditCalendarIcon sx={{ mr: 1, color: 'icons.medium' }} />
                        <Typography sx={{ color: '#555454' }} variant="subtitle1">
                            {DateFormatToEs(postData.date)}
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 3 }} display="flex" flexWrap="wrap">
                        {categories}
                    </Box>
                </Stack>
            </Card>
        </Link>
    );
});

export default PostListCard;