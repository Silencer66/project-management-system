export interface User {
    id: number;
    fullName: string;
    email: string;
    avatarUrl: string;
    description?: string;
    teamId?: number;
    teamName?: "Frontend Team";
    tasksCount?: 5;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    priority: "Low" | "Medium" | "High";
    status: "Backlog" | "InProgress" | "Done";
    assignee: User;
    boardId: number;
    boardName: string;
}

export interface Board {
    id: number;
    name: string;
    description: string;
    taskCount: number;
}

export const PRIORITY_OPTIONS = [
    { value: "Low", label: "Низкий" },
    { value: "Medium", label: "Средний" },
    { value: "High", label: "Высокий" },
] as const;

export const STATUS_OPTIONS = [
    { value: "Backlog", label: "К выполнению" },
    { value: "InProgress", label: "В работе" },
    { value: "Done", label: "Выполнено" },
] as const;

export const ASSIGNEE_OPTIONS = [
    { value: "john-doe", label: "Иван Иванов" },
    { value: "jane-smith", label: "Мария Петрова" },
    { value: "bob-johnson", label: "Алексей Сидоров" },
    { value: "alice-brown", label: "Елена Козлова" },
] as const;
