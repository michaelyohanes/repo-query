export type GetRepoByUserProps = {
    per_page: number;
    user: string;
};

export type repoType = {
    full_name: string;
    name: string;
    description: string;
    stargazers_count: number;
    html_url: string;
    language: string;
    owner: {
        avatar_url: string;
    };
}

export type GetRepoByUserResponse = {
    incomplete_results: boolean;
    total_count: number;
    items: repoType[];
};

export type GetUserProps = {
    per_page: number;
};

export type GetUserResponse = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    score: number;
    __autocomplete_id: number
};
