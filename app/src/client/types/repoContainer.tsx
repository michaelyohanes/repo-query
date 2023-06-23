import { repoType } from '../types/github';

export type RepoContainerProps = {
    show: boolean;
    repositories: repoType[];
};