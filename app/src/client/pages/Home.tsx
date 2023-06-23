import React from 'react';

import Autocomplete from 'src/client/components/Autocomplete';
import { GetUser } from 'src/client/library/GitHubConnector';

import { Container } from '@mui/material';

import 'src/client/styling/algolia.scss';

const Home = () => {
    const githubUser = GetUser({ per_page: 5 });

    return (
        <Container maxWidth='md' sx={{ p: 3, background: '#fff' }}>
            <div id='autocomplete'></div>
            <Autocomplete container='#autocomplete' placeholder='Search for user' openOnFocus={true} plugins={[githubUser]} />
        </Container>
    )
}

export default Home;