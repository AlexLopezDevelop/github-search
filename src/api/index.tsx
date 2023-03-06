const baseUrl = 'https://api.github.com/search/repositories';
export  async function fetchRepo(repoName: string, totalRepositoriesPerPage: number, currentPage: number) {
    try {
        if (!repoName || !totalRepositoriesPerPage || !currentPage) {
            return;
        }

        const response = await fetch(`${baseUrl}?q=${repoName}&per_page=${totalRepositoriesPerPage}&page=${currentPage}`)
        const data = await response.json()

        if (response.status !== 200 || data.total_count === 0) {
            return '';
        }

        return data;

    } catch (e) {
        console.log(e)
    }
}