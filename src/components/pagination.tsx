import React, {FunctionComponent} from "react";
import styled from "styled-components";

type PaginationProps = {
    totalRepos: number,
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export const Pagination: FunctionComponent<PaginationProps> = ({totalRepos, currentPage, totalPages, onPageChange}) => {

    const handleNextPage = async () => {
        if (totalPages > currentPage) {
            onPageChange(currentPage + 1)
        }
    }

    const handlePreviusPage = async () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    if (totalRepos > 0) {
        return (
            <PaginationContainer>
                {currentPage > 1 && <PaginationButton onClick={async (e) => {
                    e.preventDefault();
                    await handlePreviusPage();
                }
                }>Previous
                </PaginationButton>}
                <PageNumber>{currentPage}</PageNumber>
                <PaginationButton onClick={async (e) => {
                    e.preventDefault();
                    await handleNextPage();
                }
                }>Next
                </PaginationButton>
            </PaginationContainer>
        )
    }

    return <></>
}

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