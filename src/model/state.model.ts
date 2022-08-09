export interface State {
  appStatus: AppStatus;
  authentication: Authentication;
  user: User;
  filter: Filter;
  todos: Todo[];
}

export interface Authentication {
  db: any;
  auth: any;
  userFirebase: any;
}

export interface User {
  displayName: string | null;
  email: string | null;
  role: string;
  uid: string;
  progress: number;
}

export interface Todo {
  id: string;
  name: string;
  completed: boolean;
  priority: number;
}

export interface Filter {
  search: string;
  status: string;
  priority: number[];
}

export interface AppStatus {
  loading: boolean;
}
