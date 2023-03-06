import React, {useEffect, useRef, useState} from 'react'
import styled from "styled-components";
import {repoDataMapper, RepoProps} from "./types/repo";
import {scrollToTop} from "./tools/scrollToTop";
import {Player} from '@lottiefiles/react-lottie-player';
import {fetchRepo} from "./api";
import RepoContent from "./components/repoContent";
import {SearchBar} from "./components/searchBar";

function App(this: any) {
    const [repos, setRepos] = useState<RepoProps[]>([]);
    const [notData, setNotData] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRepoPerPage, setTotalRepoPerPage] = useState(10);

    return (
        <Container>
            <Content>
                <SearchBar
                    currentPage={currentPage}
                    totalRepoPerPage={totalRepoPerPage}
                    onReposChange={(repos) => {
                        setRepos(repos)
                    }}
                    onNotData={(notData) => {
                        setNotData(notData)
                    }}
                    onCurrentPageNumber={(pageNumber) => {
                        setCurrentPage(pageNumber)
                    }}
                />
                <RepoContent
                    repos={repos}
                    totalPages={totalRepoPerPage}
                    currentPage={currentPage}
                    notData={notData}
                    onCurrentPageNumber={(pageNumber) => {
                        setCurrentPage(pageNumber)
                    }}
                />
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
  max-width: 700px;
  padding: 5rem;

  @media only screen and (max-width: 768px) {
    max-width: 350px;
    padding: 1rem;
  }
`
