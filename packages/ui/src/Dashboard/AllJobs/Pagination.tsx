import {usePagination} from 'hooks/usePagination'
import {JobListResponse} from 'lib'
import React from 'react'
import {BiFirstPage, BiLastPage} from 'react-icons/bi'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 6rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-wrap: wrap;
  gap: 1rem;

  .btn-container {
    background: var(--primary-100);
    border-radius: var(--borderRadius);
  }

  .page-btn {
    background: transparent;
    border-color: transparent;
    width: 40px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--primary-500);
    transition: var(--transition);
    border-radius: var(--borderRadius);
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    &:hover {
      background: var(--primary-500);
      color: var(--white);
    }
  }

  .active {
    background: var(--primary-500);
    color: var(--white);
  }

  .first-btn,
  .last-btn {
    width: 40px;
    height: 40px;
    font-size: 2rem;
    background: var(--white);
    border-color: transparent;
    border-radius: var(--borderRadius);
    color: var(--primary-500);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: var(--transition);

    &:disabled {
      cursor: not-allowed;
    }
  }

  .prev-btn:not(:disabled):hover,
  .next-btn:not(:disabled):hover {
    background: var(--primary-500);
    color: var(--white);
  }
`

interface PaginationProps {
  isFetching: boolean
  pageData: Omit<JobListResponse, 'data'>
  onChangePage: (page: number) => void
}

export const Pagination = ({isFetching, pageData, onChangePage}: PaginationProps) => {
  const {page, totalPages} = pageData
  const range = usePagination(page, totalPages)
  if (totalPages === 1) return null

  const pageButtons = () => {
    return range.map(n => (<button key={n} className={`page-btn${page === n ? ' active' : ''}`}
                                   type='button' onClick={() => {
      if (n === range[0]) console.log(n - 1)
      if (n === range.at(-1) && n < totalPages) console.log(n + 1)
      onChangePage(n)
    }}
                                   disabled={isFetching || (page === totalPages && n === totalPages) || (n === 1 && page === 1)}
    >{n}</button>))
  }

  return (
    <Wrapper data-testid='pagination'>
      <button data-testid='first-btn' className='first-btn' onClick={() => onChangePage(1)}
              disabled={page === 1 || isFetching} type='button'
      >
        <BiFirstPage/>
      </button>
      {pageButtons()}
      <button data-testid='last-btn' className='last-btn' onClick={() => onChangePage(totalPages)}
              disabled={isFetching || page === totalPages} type='button'
      >
        <BiLastPage/>
      </button>
    </Wrapper>
  )
}