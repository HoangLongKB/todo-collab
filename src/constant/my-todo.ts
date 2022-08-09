import { FILTER_STATUS } from "./filter";

export const statusFilterOptions = [
  { label: 'All', value: FILTER_STATUS.ALL },
  { label: 'Completed', value: FILTER_STATUS.COMPLETED },
  { label: 'Todo', value: FILTER_STATUS.TODO },
];

export interface Priority {
  label: string;
  value: number;
}

export const priorityList: Priority[] = [
  { label: 'High', value: 3 },
  { label: 'Medium', value: 2 },
  { label: 'Low', value: 1 },
];