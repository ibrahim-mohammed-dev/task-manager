import { Injectable, signal } from '@angular/core';
import { Task } from '../model/Task';
import { Category } from '../model/Category';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks = signal<Task[]>([
    {
    id:1,
    title: "Spring boot",
    description: " model dto mapper repository service controller",
    category: Category.Study,
    completed: true,
  },
    {
    id:2,
    title: "Angular",
    description: "dto mapper service component",
    category: Category.Study,
    completed: false,
  },
  ])

  addTask(taskData: Omit<Task, 'id' | 'completed'>) {
  const currentTasks = this.tasks();
  const newId = currentTasks.length > 0 
    ? Math.max(...currentTasks.map(t => t.id)) + 1 
    : 1;

  const newTask: Task = {
    id: newId,
    ...taskData,
    completed: false,
  };

  this.tasks.update(tasks => [...tasks, newTask]);
}
  changeState(id: number) {
  this.tasks.update(tasks =>
    tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  );
}
deleteTask(id: number){
  this.tasks.update(tasks => tasks.filter(task => task.id !== id ));
}
findById(id: number){
  return this.tasks().find(task=> task.id===id);
}
}
