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
    html_url: string;
}

interface Owner {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
}

export interface RepoDataProps {
    repo: RepoProps;
}

export function repoDataMapper(data: any) {
    return data.items.map((repo: RepoProps) => {
        return {
            id: repo.id,
            name: repo.name,
            owner: repo.owner,
            description: repo.description,
            created_at: repo.created_at,
            pushed_at: repo.pushed_at,
            topics: repo.topics,
            language: repo.language,
            stargazers_count: repo.stargazers_count,
            html_url: repo.html_url
        }
    })
}