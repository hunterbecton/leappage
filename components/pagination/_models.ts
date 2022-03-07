export interface PaginationProps {
  currentPage: number;
  limit: number;
  quantity: number;
  totalPages: number;
  href?: string;
  isAsnyc?: boolean;
  setCurrentPage: (currentPage: number) => void;
}
