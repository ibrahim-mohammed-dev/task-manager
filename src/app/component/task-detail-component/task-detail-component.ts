import { Component, inject  } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TaskService } from '../../service/task-service';
@Component({
  selector: 'app-task-detail-component',
  imports: [RouterLink],
  templateUrl: './task-detail-component.html',
  styleUrl: './task-detail-component.css',
})
export class TaskDetailComponent {
  private taskService = inject(TaskService);
  private route = inject(ActivatedRoute);
  taskId = this.route.snapshot.paramMap.get('id');
  task = this.taskId ? this.taskService.findById(+this.taskId) : undefined;
  
}
