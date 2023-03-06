import {Player} from "@lottiefiles/react-lottie-player";
import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {scrollToTop} from "../tools/scrollToTop";
import {fetchRepo} from "../api";
import {repoDataMapper} from "../types/repo";

type SearchBarProps = {
    currentPage: number;
    totalRepoPerPage: number;
    onReposChange: (repos: []) => void;
    onNotData: (notData: boolean) => void;
    onCurrentPageNumber: (page: number) => void;
    onNotFound: (empty: boolean) => void;
}
export const SearchBar = ({currentPage, totalRepoPerPage, onReposChange, onNotData, onCurrentPageNumber, onNotFound}: SearchBarProps) => {
    const repoRef = useRef<HTMLInputElement>(null);
    const [totalPages, setTotalPages] = useState(0);
    const [searchValue, setSearchValue] = useState('');

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
        if (repoRef.current && repoRef.current.value !== '') {
            const response = await fetchRepo(repoRef.current.value, totalRepoPerPage, currentPage)

            if (!response) {
                onReposChange([])
                onNotData(true)
                onNotFound(true)
                return;
            }

            onNotData(false)

            const repos = repoDataMapper(response)
            onReposChange(repos)

            if (repos.length === 0) {
                onNotFound(true)
            } else {
                onNotFound(false)
            }

            const totalPages = Math.ceil(response.total_count / totalRepoPerPage)
            setTotalPages(totalPages)

        } else {
            onReposChange([])
        }
    }

    return (
        <Container>
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
                    onCurrentPageNumber(1);
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
        </Container>
    )
}

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 800px;
  padding: 0;
`

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