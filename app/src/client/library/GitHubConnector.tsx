import React from 'react';
import { AutocompletePlugin } from '@algolia/autocomplete-js';

import config from 'src/config';
import { GetUserProps, GetUserResponse, GetRepoByUserProps, GetRepoByUserResponse } from 'src/client/types/github';
import Panel from 'src/client/components/Panel';


function debouncePromise<TParams extends unknown[], TResponse>(
    fn: (...params: TParams) => Promise<TResponse>,
    time: number
) {
    let timerId: ReturnType<typeof setTimeout> | undefined = undefined;

    return function (...args: TParams) {
        if (timerId) {
            clearTimeout(timerId);
        }

        return new Promise<TResponse>((resolve) => {
            timerId = setTimeout(() => resolve(fn(...args)), time);
        });
    };
}

const debouncedFetch = debouncePromise(fetch, 1000);


export const GetUser = (options: GetUserProps = { per_page: 5 }): AutocompletePlugin<GetUserResponse, undefined> => {
    return {
        getSources({ query }) {
            if (!query) return [];

            const queryParam = encodeURIComponent(`${query} in:login`);
            const endpoint = `${config.userUrl}?per_page=${options.per_page}&q=${queryParam}`;

            return debouncedFetch(endpoint)
                .then((response) => response.json())
                .then((repositories) => {
                    return [
                        {
                            sourceId: 'githubconnector',
                            getItems() {
                                return repositories.items || [];
                            },
                            getItemUrl({ item }) {
                                return item.html_url;
                            },
                            onSelect({ setIsOpen }) {
                                setIsOpen(true);
                            },
                            templates: {
                                item({ item, state }) {
                                    if (state.status === 'idle') {
                                        return (
                                            <Panel {...item} />
                                        )
                                    }
                                    
                                    return (<></>);
                                },
                            },
                        },
                    ];
                });
        },
    };
}

export const GetRepoByUser = async (params: GetRepoByUserProps) => {
    const { per_page = 5, user } = params;

    if (!user) return null;

    const queryParam = encodeURIComponent(`user:${user}`);
    const endpoint = `${config.repoUrl}?per_page=${per_page}&q=${queryParam}`;

    try {
        const resp = await debouncedFetch(endpoint);

        const jsonResp: GetRepoByUserResponse = await resp.json();

        return jsonResp;
    } catch (error: unknown) {
        console.error(error);
        throw (error);
    }

};