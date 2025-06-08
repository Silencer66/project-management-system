import { Task } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/shared/Card";

import { User } from "lucide-react";

interface TaskCardProps {
    task: Task;
    onClick: () => void;
    isDragging?: boolean;
}

export function TaskCard(props: TaskCardProps) {
    const { task, onClick, isDragging } = props;

    const priorityColor =
        task.priority === "High"
            ? "bg-red-100 text-red-800"
            : task.priority === "Medium"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-green-100 text-green-800";

    return (
        <Card
            className={`cursor-pointer transition-all hover:shadow-md ${
                isDragging ? "opacity-50 rotate-2" : ""
            }`}
            onClick={onClick}
        >
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                    <h3 className="font-medium text-sm line-clamp-2">
                        {task.title}
                    </h3>
                    <div
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${priorityColor}`}
                    >
                        {task.priority}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                {task.description && (
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {task.description}
                    </p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{task.assignee.fullName}</span>
                    </div>

                    <div className="flex items-center space-x-1">
                        <span>{task.status}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
