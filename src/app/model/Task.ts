import { Category } from "./Category";
export interface Task {
  id: number;
  title: string;
  description: string;
  category: Category;
  completed: boolean;
}