import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Avatar, Typography, CircularProgress } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

import { GetRepoByUser } from 'src/client/library/GitHubConnector';
import { GetRepoByUserResponse, repoType, GetUserResponse } from 'src/client/types/github';
import RepoContainer from './RepoContainer';

const Panel = (props: GetUserResponse) => {
    const { avatar_url, login } = props;

    const [isLoadingRepo, setLoadingRepo] = useState<boolean>(false);
    const [isExpanded, setExpanded] = useState<boolean>(false);
    const [repositories, setRepositories] = useState<repoType[]>([]);

    const handleClick = () => {
        setExpanded(!isExpanded);
    };


    const fetchData = async () => {
        const resp: GetRepoByUserResponse | null = await GetRepoByUser({ per_page: 5, user: login });

        if (resp?.items?.length) {
            const { items } = resp;

            setRepositories(items);
        }

        setLoadingRepo(false);
    };

    useEffect(() => {
        if (isExpanded && !repositories.length && !isLoadingRepo) {
            setLoadingRepo(true);
            fetchData();
        }
    }, [isExpanded]);

    return (
        <div>
            <Accordion disableGutters sx={{ backgroundColor: 'none', border: 'none', boxShadow: 'none', marginBottom: '1rem !important' }}>
                <AccordionSummary expandIcon={<ExpandMore />} sx={{ backgroundColor: '#F2F2F2' }} onClick={handleClick}>
                    <Avatar alt={login} src={avatar_url} sx={{ marginRight: 1 }}/>
                    <Typography noWrap sx={{ marginTop: '0.6rem'}}>
                        { login }
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {isLoadingRepo ? <CircularProgress size='1rem' /> : <RepoContainer show={isExpanded} repositories={repositories} />}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default Panel;