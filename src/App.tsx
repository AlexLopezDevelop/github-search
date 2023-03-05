import React, {useEffect, useRef, useState} from 'react'
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

    useEffect(() => {
        findRepo().then(r => console.log('serach'));
    }, [currentPage]);

    const handleNextPage = async () => {
        if (totalPages > currentPage) {
            await setCurrentPage(currentPage + 1)
        }
    }

    const handlePreviusPage = async () => {
        if (currentPage > 1) {
            await setCurrentPage(currentPage - 1)
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
            if (!repoName || !totalRepositoriesPerPage || !currentPage) {
                return;
            }

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

            const totalPages = Math.ceil(data.total_count / totalRepositoriesPerPage)
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
                <RepoContainer>
                    <RepoList>
                        {repos.map((repo: RepoProps, index) => (
                            <RepoCard key={repo.id} repo={repo}/>
                        ))}
                    </RepoList>
                </RepoContainer>

                {repos.length > 0 && <PaginationContainer>
                    <PaginationButton onClick={async (e) => {
                        e.preventDefault();
                        await handlePreviusPage();
                    }
                    }>Previous
                    </PaginationButton>
                    <PageNumber>{currentPage}</PageNumber>
                    <PaginationButton onClick={async (e) => {
                        e.preventDefault();
                        await handleNextPage();
                    }
                    }>Next
                    </PaginationButton>
                </PaginationContainer>
                }
            </Content>
        </Container>
    )
}

export default App

const Container = styled.div`
  height: 100%;
  width: 100%;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 800px;
  padding: 5rem;
  
  @media only screen and (max-width: 768px) {
    max-width: 100%;
    padding: 1rem;
  }
`

const InputArea = styled.form`
  border-radius: 1.5rem;
  background: white;
  box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.198567);
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 0;
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

const RepoContainer = styled.div`
  margin: 0 auto;
`

const RepoList = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 2.4rem;
  padding: 5rem 0 0 0;
  width: 100%;
`

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
`

const PaginationButton = styled.button`
  background: black;
  border: none;
  height: 100%;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: #fff;
  cursor: pointer;
  width: 8.4rem;
  margin: 0 1rem;
`
const PageNumber = styled.span`
  font-size: 1.5rem;
  margin: 0 1rem
`