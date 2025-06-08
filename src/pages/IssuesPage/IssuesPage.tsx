import { useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import { Input } from "../../shared/Input";
import { Link } from "react-router-dom";
import { TaskCard } from "./components/TaskCard";
import { Button } from "../../shared/Button";
import { useProjectsContext } from "@/context/ProjectsProvider";
import { Task } from "@/lib/types";

export const IssuesPage = () => {
    const { tasks, boards } = useProjectsContext();

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [priorityFilter, setPriorityFilter] = useState<string>("all");

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch =
            task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || task.status === statusFilter;
        const matchesPriority =
            priorityFilter === "all" || task.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    const openTaskModal = () => {};

    const getBoardTitle = (boardId: number) => {
        return (
            boards.find((board) => board.id === boardId)?.name ||
            "Неизвестная доска"
        );
    };

    const handleTaskClick = (task: Task) => {
        openTaskModal();
    };

    return (
        <div>
            {" "}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Все задачи</h1>
                <div className="text-sm text-gray-600">
                    Всего задач: {filteredTasks.length}
                </div>
            </div>
            <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg border">
                <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Поиск задач..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>
            </div>
            {/* Tasks Grid */}
            {filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">Задачи не найдены</p>
                    <Button onClick={openTaskModal}>
                        Создать первую задачу
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredTasks.map((task) => (
                        <div key={task.id} className="relative group">
                            <TaskCard
                                task={task}
                                onClick={() => handleTaskClick(task)}
                            />

                            {/* Board link overlay */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link
                                    to={`/boards/${task.boardId}?taskId=${task.id}`}
                                >
                                    <div
                                        className="h-6 w-6 p-0"
                                        title={`Перейти к доске: ${getBoardTitle(
                                            task.boardId
                                        )}`}
                                    >
                                        <ExternalLink className="h-3 w-3" />
                                    </div>
                                </Link>
                            </div>

                            {/* Board name */}
                            <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
                                <span>
                                    Доска: {getBoardTitle(task.boardId)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
