import React, {useEffect, useRef, useState} from 'react'
import styled from "styled-components";
import {repoDataMapper, RepoProps} from "./types/repo";
import {RepoCard} from "./components/repoCard";
import {scrollToTop} from "./tools/scrollToTop";
import {Player} from '@lottiefiles/react-lottie-player';
import {fetchRepo} from "./api";
import {Pagination} from "./components/pagination";

function App(this: any) {
    const [repos, setRepos] = useState<RepoProps[]>([]);
    const [empty, setEmpty] = useState<boolean>(true);
    const [notData, setNotData] = useState<boolean>(false);
    const repoRef = useRef<HTMLInputElement>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [totalRepoPerPage, setTotalRepoPerPage] = useState(10);

    useEffect(() => {
        findRepo().then(() => console.log('search'));
        scrollToTop();
    }, [currentPage]);


    useEffect(() => {
        const searchValue = window.localStorage.getItem('SEARCH_VALUE') || '';
        setSearchValue(searchValue);

        if (searchValue && repoRef.current) {
            repoRef.current.value = searchValue;
            findRepo().then(() => console.log('search'));
        }
    }, []);

    async function findRepo() {
        if (repoRef.current) {
            setEmpty(false)
            const response = await fetchRepo(repoRef.current.value, totalRepoPerPage, currentPage)

            if (!response) {
                setRepos([])
                setNotData(true)
                return;
            }

            setNotData(false)

            const repos = repoDataMapper(response)
            setRepos(repos)

            const totalPages = Math.ceil(response.total_count / totalRepoPerPage)
            setTotalPages(totalPages)

        } else {
            setEmpty(true)
            setRepos([])
        }
    }

    return (
        <Container>
            <Content>
                <Search>
                    <LogoPowered>
                        <LinkPowered onClick={() => {
                            window.localStorage.setItem('SEARCH_VALUE', '');
                            window.location.reload();
                        }}>
                            <Player
                                src="https://assets5.lottiefiles.com/packages/lf20_f28ex302.json"
                                autoplay={true}
                                loop={false}
                                style={{
                                    height: '150px',
                                    width: '300px',
                                }}
                            />
                            <PoweredText>Powered by <b>Github</b></PoweredText>
                        </LinkPowered>
                    </LogoPowered>
                    <InputArea
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setCurrentPage(1)
                            await findRepo();
                            window.localStorage.setItem('SEARCH_VALUE', repoRef.current?.value || '');
                        }}
                    >
                        {searchValue === '' ?
                            <Input
                                ref={repoRef}
                                name="repo"
                                id="repo"
                                type="text"
                                placeholder="Search repository ..."
                            />
                            : <Input
                                ref={repoRef}
                                name="repo"
                                id="repo"
                                type="text"
                                placeholder="Search repository ..."
                                defaultValue={searchValue}
                            />
                        }
                        <SubmitBtn type="submit">Search</SubmitBtn>
                    </InputArea>
                </Search>
                {notData ? <NotFound>
                        <Player
                            src="https://assets3.lottiefiles.com/packages/lf20_uqfbsoei.json"
                            className="player"
                            loop
                            autoplay
                            style={{height: '300px', width: '300px'}}
                        />
                        <NotFoundText>No Results</NotFoundText>
                    </NotFound>
                    : <>
                        <RepoContainer>
                            <RepoList>
                                {repos.map((repo: RepoProps) => (
                                    <RepoCard key={repo.id} repo={repo}/>
                                ))}
                            </RepoList>
                        </RepoContainer>
                        <Pagination
                            totalRepos={repos.length}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(pageNumber) => {
                                setCurrentPage(pageNumber)
                            }}
                        />
                    </>
                }
            </Content>
        </Container>
    )
}

export default App

const LinkPowered = styled.a`
  cursor: pointer;
  text-decoration: none;
  outline: none;
`

const PoweredText = styled.div`
  position: relative;
  bottom: 55px;
  left: 210px;
  font-size: 0.8rem;
`

const LogoPowered = styled.div`
  position: absolute;
  bottom: -105px;
  left: -85px;

  @media only screen and (max-width: 768px) {
    top: -55px;
  }
`

const Search = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 800px;
  padding: 0;
`

const Container = styled.div`
  height: 100%;
  width: 100%;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 700px;
  padding: 5rem;

  @media only screen and (max-width: 768px) {
    max-width: 350px;
    padding: 1rem;
  }
`

const InputArea = styled.form`
  border-radius: 1.5rem;
  background: white;
  box-shadow: 0 16px 30px -10px rgba(70, 96, 187, 0.198567);
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 0;
  margin-top: 7rem;
  position: absolute;
  top: -20px;
  left: 0;
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
  margin: 13rem auto auto auto;
`

const RepoList = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 2.4rem;
  padding: 5rem 0 0 0;
  width: 100%;
`

const NotFound = styled.div`
  padding-top: 17rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const NotFoundText = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-left: 1rem;
`