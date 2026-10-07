import { Component, computed, inject, signal } from '@angular/core';
import { TaskService } from '../../service/task-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../model/Category';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-task-list-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    RouterLink
  ],
  templateUrl: './task-list-component.html',
  styleUrl: './task-list-component.css'
})
export class TaskListComponent {
  taskService = inject(TaskService);
  private fb = inject(FormBuilder);
  categories = Object.values(Category);

  selectedCategory = signal<string>('All');
  filteredTasks = computed(() => {
    const category = this.selectedCategory();
    const allTasks = this.taskService.tasks();

    if (category === 'All') {
      return allTasks;
    }
    return allTasks.filter(task => task.category === category);
  });

  setFilter(category: string) {
    this.selectedCategory.set(category);
  }

  taskForm = this.fb.nonNullable.group({
    title: ["", [Validators.required, Validators.minLength(3)]],
    description: ["", Validators.minLength(10)],
    category: this.fb.nonNullable.control<Category>(Category.Work),
  });

  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.getRawValue();
      this.taskService.addTask(formValue);
      console.log(this.taskForm.value);
      this.taskForm.reset();
    }
  }
}
