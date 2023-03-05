import {SetStateAction, useState} from "react";

export const Pagination = (totalPages: SetStateAction<number>) => {
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    setTotal(totalPages)

    const handleNextPage = () => {
        if (total > page) {
            setPage(page + 1)
        }
    }

    const handlePreviusPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    return (
        <div>
            <button onClick={handlePreviusPage}>Previus</button>
            <span>{page}</span>
            <button onClick={handleNextPage}>Next</button>
        </div>
    )
}