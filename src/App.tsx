import React, {useRef, useState} from 'react'
import styled from "styled-components";
import {RepoProps} from "./types/repo";

function App() {
    const [repos, setRepos] = useState<RepoProps[]>([]);
    const [empty, setEmpty] = useState<boolean>(true);
    const [notData, setNotData] = useState<boolean>(false);
    const repoRef = useRef<HTMLInputElement>(null);

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
            const response = await fetch(`https://api.github.com/search/repositories?q=${repoName}`)
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
                }
            })

            setRepos(repos)

        } catch (e) {
            console.log(e)
        }
    }

    return (
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
            <Container>
                {repos.map((repo, index) => (
                    <span key={index}> Repo </span>
                ))}
            </Container>
        </Content>
    )
}

export default App

const Content = styled.div`
  margin: 0 auto;
  max-width: 1440px;
`

const InputArea = styled.form`
  margin: 3.6rem auto auto auto;
  border-radius: 1.5rem;
  background: white;
  box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.198567);
  width: 100%;
  max-width: 800px;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 0.7rem 0.7rem 1.6rem;
  transition: height 0.3s ease;
  position: relative;

  @media (min-width: 768px) {
    height: 6.9rem;
  }
`;

const Input = styled.input`
  flex: 1;
  color: black;
  border: none;
  margin: 0 0.8rem;

  @media (min-width: 768px) {
    font-size: 1.7rem;
    margin: 0 2.4rem;
  }

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

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2.4rem;
`
