import React from 'react';
import { Link, Card, CardContent, Typography, Chip, Grid } from '@mui/material';
import { StarOutline } from '@mui/icons-material';
import { repoType } from '../types/github';

const RepoCard = (props: repoType) => {
    const { name, description, html_url, language, stargazers_count } = props;
    
    return (
        <Card sx={{ marginBottom: 1, marginTop: 1 }}>
            <Link href={html_url} underline='none'>
                <CardContent sx={{ backgroundColor: '#E0E0E0', color: '#000' }}>
                    <Typography variant='h5' component='div'>
                        {name}
                    </Typography>
                    <Typography variant='body2'>
                        {description}
                    </Typography>
                    <Grid container sx={{ alignItems: 'center', marginTop: 2 }}>
                        <Grid item>
                            <StarOutline color='action' />
                        </Grid>
                        <Grid item sx={{ marginRight: 2 }}>
                            <Typography fontSize='0.7rem'>
                                {stargazers_count}
                            </Typography>
                        </Grid>
                        <Grid item>
                            {language ? <Chip label={language} size='small' sx={{ fontSize: '0.7rem' }} /> : ''}
                        </Grid>
                    </Grid>
                </CardContent>
            </Link>
        </Card>
    );
}

export default RepoCard;