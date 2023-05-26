export interface UserDetails {
  status: string;
  result: Result[];
  currentPage: number;
  totalPages: number;
  totalResults: number;
}
export interface Result {
  id: string;
  name: string;
  mobile_no: string;
  email: string;
  role: string;
  user_status: string;
}
