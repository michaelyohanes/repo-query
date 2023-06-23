import React from 'react';
import { Typography } from '@mui/material';

import RepoDetail from './RepoDetail';
import { RepoContainerProps } from 'src/client/types/repoContainer';
import { repoType } from 'src/client/types/github';

const RepoContainer = (props: RepoContainerProps) => {
    const { show, repositories } = props;

    if (!show) {
        return
    }
    
    if (!repositories || !repositories.length) {
        return (
            <Typography fontSize='0.8rem'>
                No data found
            </Typography>
        );
    }

    return repositories.map((repo: repoType, idx: number) => (
        <RepoDetail key={idx} {...repo} />
    ));
}

export default RepoContainer;

