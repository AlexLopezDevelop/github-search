import React, {useRef, useState} from 'react'
import styled from "styled-components";
import {RepoProps} from "./types/repo";
import {RepoCard} from "./components/repoCard";

const totalRepositoriesPerPage = 30;

function App() {
    const [repos, setRepos] = useState<RepoProps[]>([]);
    const [empty, setEmpty] = useState<boolean>(true);
    const [notData, setNotData] = useState<boolean>(false);
    const repoRef = useRef<HTMLInputElement>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handleNextPage = () => {
        if (totalPages > currentPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePreviusPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    async function findRepo() {
        if (repoRef.current) {
            setEmpty(false)
            await fetchRepo(repoRef.current.value)
        } else {
            setEmpty(true)
            setRepos([])
        }
    }

    async function fetchRepo(repoName: string) {
        try {
            const response = await fetch(`https://api.github.com/search/repositories?q=${repoName}&per_page=${totalRepositoriesPerPage}&page=${currentPage}`)
            const data = await response.json()

            if (response.status !== 200) {
                setRepos([])
                setNotData(true)
                return;
            }

            setNotData(false)

            const repos = data.items.map((repo: RepoProps) => {
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

            setRepos(repos)
            const totalPages = Math.ceil(data.total_count/totalRepositoriesPerPage)
            setTotalPages(totalPages)

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Container>
            <Content>
                <InputArea
                    onSubmit={async (e) => {
                        e.preventDefault();
                        await findRepo();
                    }}
                >
                    <Input
                        ref={repoRef}
                        name="repo"
                        id="repo"
                        type="text"
                        placeholder="Search repository ..."
                    />
                    <SubmitBtn type="submit">Search</SubmitBtn>
                </InputArea>
                <RepoList>
                    {repos.map((repo: RepoProps, index) => (
                        <RepoCard key={index} repo={repo} />
                    ))}
                </RepoList>
                <div>
                    <button onClick={handlePreviusPage}>Previus</button>
                    <span>{currentPage}</span>
                    <button onClick={handleNextPage}>Next</button>
                </div>
            </Content>
        </Container>
    )
}

export default App

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 800px;
  padding: 5rem;
`

const InputArea = styled.form`
  margin: 0 auto;
  border-radius: 1.5rem;
  background: white;
  box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.198567);
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 0.7rem 0.7rem 1.6rem;
  transition: height 0.3s ease;
  position: relative;
`;

const Input = styled.input`
  flex: 1;
  color: black;
  border: none;
  margin: 0 2.4rem;
  font-size: 1.7rem;

  &:focus {
    outline: none;
  }
`;

const SubmitBtn = styled.button`
  background: black;
  border: none;
  height: 100%;
  border-radius: 1rem;
  line-height: 2.1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  width: 8.4rem;

  @media (min-width: 768px) {
    width: 10.6rem;
    font-size: 1.7rem;
  }
`;

const RepoList = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 2.4rem;
  padding: 5rem 0 0 0;
  margin: 0 auto;
`
