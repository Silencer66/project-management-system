import BoardService from "@/api/services/BoardService";
import TaskService from "@/api/services/TaskService";
import { Board, Task } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";

interface Ctx {
    tasks: Task[];
    boards: Board[];
    updateTaskStatus: (taskId: number, status: Task["status"]) => Promise<void>;
}

const ProjectsContext = createContext<Ctx>({
    tasks: [],
    boards: [],
    updateTaskStatus: async () => {},
});

export const useProjectsContext = () => useContext(ProjectsContext);

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [boards, setBoards] = useState<Board[]>([]);

    useEffect(() => {
        try {
            // загружаем список тем + текущую
            BoardService.GetBoards().then((res) => {
                if (!res) return;
                setBoards(res);
            });

            TaskService.GetTasks().then((res) => {
                if (!res) return;
                setTasks(res);
            });
        } catch (error) {
            console.error("Ошибка получения тем");
        }
    }, []);

    const updateTaskStatus = async (taskId: number, status: Task["status"]) => {
        const updatedTask = await TaskService.UpdateTaskStatus(taskId, status);
        if (!updatedTask) return;

        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === taskId) {
                    task.status = status;
                }
                return task;
            })
        );
    };

    return (
        <ProjectsContext.Provider value={{ tasks, boards, updateTaskStatus }}>
            {children}
        </ProjectsContext.Provider>
    );
};
