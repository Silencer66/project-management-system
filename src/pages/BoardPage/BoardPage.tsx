import { useProjectsContext } from "@/context/ProjectsProvider";
import { STATUS_OPTIONS } from "@/lib/types";
import { Button } from "@/shared/Button";
import { ArrowLeft, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { BoardColumn } from "./components/BoardColumn";

export const BoardPage = () => {
    const params = useParams();

    const boardId = params.id as string;

    const { boards, tasks } = useProjectsContext();

    const board = boards.find((b) => b.id === Number(boardId));
    const boardTasks = tasks.filter((task) => task.boardId === Number(boardId));

    if (!board) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Доска не найдена</p>
                <Link to="/boards">
                    <Button>Вернуться к доскам</Button>
                </Link>
            </div>
        );
    }

    const openTaskModal = () => {};

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link to="/boards">
                        <Button>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Назад к доскам
                        </Button>
                    </Link>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {board.name}
                        </h1>
                        {board.description && (
                            <p className="text-gray-600 mt-1">
                                {board.description}
                            </p>
                        )}
                    </div>
                </div>

                <Button
                    onClick={() => openTaskModal()}
                    className="flex items-center space-x-2"
                >
                    <Plus className="h-4 w-4" />
                    <span>Добавить задачу</span>
                </Button>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {STATUS_OPTIONS.map((status) => {
                    const count = boardTasks.filter(
                        (task) => task.status === status.value
                    ).length;
                    return (
                        <div
                            key={status.value}
                            className="bg-white p-4 rounded-lg border text-center"
                        >
                            <div className="text-2xl font-bold text-gray-900">
                                {count}
                            </div>
                            <div className="text-sm text-gray-600">
                                {status.label}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Board Columns */}
            <div className="flex gap-6 overflow-x-auto pb-6">
                {STATUS_OPTIONS.map((status) => {
                    const columnTasks = boardTasks.filter(
                        (task) => task.status === status.value
                    );
                    return (
                        <BoardColumn
                            key={status.value}
                            title={status.label}
                            status={status.value}
                            tasks={columnTasks}
                            boardId={boardId}
                        />
                    );
                })}
            </div>

            {boardTasks.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">
                        В этой доске пока нет задач
                    </p>
                    <Button onClick={() => openTaskModal()}>
                        Создать первую задачу
                    </Button>
                </div>
            )}
        </div>
    );
};
