import React from "react";
import {Player} from "@lottiefiles/react-lottie-player";
import {RepoProps} from "../types/repo";
import {RepoCard} from "./repoCard";
import {Pagination} from "./pagination";
import styled from "styled-components";

type RepoContentProps = {
    notData: boolean;
    repos: RepoProps[];
    currentPage: number;
    totalPages: number;
    notFound: boolean;
    onCurrentPageNumber: (page: number) => void
};

const RepoContent = ({notData, repos, currentPage, totalPages, onCurrentPageNumber, notFound}: RepoContentProps) => {

   if (notFound) {
        return (
            <NotFound>
                <Player
                    src="https://assets3.lottiefiles.com/packages/lf20_uqfbsoei.json"
                    className="player"
                    loop
                    autoplay
                    style={{height: '300px', width: '300px'}}
                />
                <NotFoundText>No Results</NotFoundText>
            </NotFound>
        )
    } else if (!notData) {
       return (
           <>
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
                       onCurrentPageNumber(pageNumber)
                   }}
               />
           </>
       );
   }

    return <></>
}

export default RepoContent;


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