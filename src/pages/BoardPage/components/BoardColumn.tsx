import { useProjectsContext } from "@/context/ProjectsProvider";
import { Task } from "@/lib/types";
import { TaskCard } from "@/pages/IssuesPage/components/TaskCard";
import { useDrop, useDrag } from "react-dnd";

interface BoardColumnProps {
    title: string;
    status: Task["status"];
    tasks: Task[];
    boardId: string;
}

export function BoardColumn({
    title,
    status,
    tasks,
    boardId,
}: BoardColumnProps) {
    const { updateTaskStatus } = useProjectsContext();

    const openTaskModal = (task: Task) => {};

    const [{ isOver }, drop] = useDrop({
        accept: "task",
        drop: (item: { id: number; status: string }) => {
            if (item.status !== status) {
                updateTaskStatus(item.id, status);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const statusColors = {
        Backlog: "border-gray-200 bg-gray-50",
        "in-progress": "border-blue-200 bg-blue-50",
        InProgress: "border-yellow-200 bg-yellow-50",
        Done: "border-green-200 bg-green-50",
    };

    return (
        <div
            ref={drop}
            className={`flex-1 min-h-[500px] rounded-lg border-2 p-4 transition-colors ${
                statusColors[status]
            } ${isOver ? "border-dashed border-blue-400" : ""}`}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-600">
                    {tasks.length}
                </span>
            </div>

            <div className="space-y-3">
                {tasks.map((task) => (
                    <DraggableTaskCard
                        key={task.id}
                        task={task}
                        onClick={() => openTaskModal(task)}
                    />
                ))}
            </div>
        </div>
    );
}

function DraggableTaskCard({
    task,
    onClick,
}: {
    task: Task;
    onClick: () => void;
}) {
    const [{ isDragging }, drag] = useDrag({
        type: "task",
        item: { id: task.id, status: task.status },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag}>
            <TaskCard task={task} onClick={onClick} isDragging={isDragging} />
        </div>
    );
}
