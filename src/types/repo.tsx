export interface RepoProps {
    id: number;
    name: string;
    owner: Owner;
    description: string;
    created_at: string;
    pushed_at: string;
    topics: string[];
    language: string;
    stargazers_count: number;
}

interface Owner {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
}