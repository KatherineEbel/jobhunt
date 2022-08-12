import {useMemo} from 'react'

const range = (start: number, end:number) => {
  const length = end - start + 1
  return Array.from({length}, (_, idx) => idx + start)
}

export const usePagination = (page: number, totalPages: number) => {
  return useMemo(() => {
    const desiredPageCnt = 3
    if (desiredPageCnt >= totalPages) {
      return range(1, totalPages)
    }
    let leftIdx = Math.max(page - 1, 1)
    const rightIdx = Math.min(leftIdx + 2, totalPages)
    if((rightIdx - leftIdx) + 1 < desiredPageCnt) {
      leftIdx -= 1
    }
    return range(leftIdx, rightIdx)
  }, [totalPages, page])
}
