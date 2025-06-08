import { Task } from "@/lib/types";
import { $api, T_ApiResponse, T_TaskResponse } from "..";

export default class TaskService {
    static async GetTasks(): Promise<Task[] | null> {
        const response = await $api.get<T_ApiResponse>(`/tasks`);

        const tasksResponse = response.data.data as T_TaskResponse[];

        if (!tasksResponse) {
            return null;
        }

        const tasks: Task[] = tasksResponse.map(
            (task) =>
                ({
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    priority: task.priority,
                    assignee: {
                        id: task.assignee?.id,
                        fullName: task.assignee?.fullName,
                        email: task.assignee?.email,
                        avatarUrl: task.assignee?.avatarUrl,
                    },
                    boardId: task.boardId,
                    boardName: task.boardName,
                } as Task)
        );

        return tasks;
    }

    static async UpdateTaskStatus(
        taskId: number,
        status: Task["status"]
    ): Promise<string | null> {
        const response = await $api.put<T_ApiResponse>(
            `/tasks/updateStatus/${taskId}`,
            { status }
        );

        const taskResponse = response.data.data as string;
        if (!taskResponse) {
            return null;
        }
        return taskResponse;
    }
}
