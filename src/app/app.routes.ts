import { Routes } from '@angular/router';
import { TaskListComponent } from './component/task-list-component/task-list-component';
import { TaskDetailComponent } from './component/task-detail-component/task-detail-component';


export const routes: Routes = [
    {
        path: "",
        redirectTo: "tasks",
        pathMatch: 'full',
    },
    {
        path: "tasks",
        component:TaskListComponent,
    },
    {
        path: "task/:id",
        component:TaskDetailComponent,
    },
    { 
    path: '**', 
    redirectTo: 'tasks' 
    },
];
