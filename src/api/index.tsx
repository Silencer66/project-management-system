import axios from "axios";

const BASE_API_URL = "http://127.0.0.1:8080/api/v1";

export type T_ApiResponse = {
    json(): unknown;
    error_code: number;
    message: string;
    data:
        | { level: number }
        | string
        | number
        | T_BoardResponse
        | T_BoardResponse[]
        | T_TaskResponse[];
};

export interface T_InvoiceResponse {
    invoiceLink: string;
}

export interface T_BoardResponse {
    id: number;
    name: string;
    description: string;
    taskCount: number;
}

export interface T_TaskResponse {
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    assignee: {
        id: number;
        fullName: string;
        email: string;
        avatarUrl: string;
    };
    boardId: number;
    boardName: string;
}

// Создаем экземпляр axios с предустановленными заголовками
export const $api = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});
