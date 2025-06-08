import { useEffect, useState } from "react";
import { Button } from "../../shared/Button";
import { Layout, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../shared/Card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../shared/Dialog";
import { Input } from "../../shared/Input";
import { Textarea } from "../../shared/TextArea";
import { useProjectsContext } from "@/context/ProjectsProvider";

export const ProjectsPage = () => {
    const { boards } = useProjectsContext();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("submit -", e);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                    Доски проектов
                </h1>

                <Dialog
                    open={isCreateModalOpen}
                    onOpenChange={setIsCreateModalOpen}
                >
                    <DialogTrigger asChild>
                        <div className="flex items-center space-x-2">
                            <Plus className="h-4 w-4" />
                            <span>Создать доску</span>
                        </div>
                    </DialogTrigger>

                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Создать новую доску</DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <h1>Название доски</h1>
                                <Input
                                    id="title"
                                    placeholder="Введите название доски"
                                />
                            </div>

                            <div>
                                <h2>Описание</h2>
                                <Textarea
                                    id="description"
                                    placeholder="Введите описание доски"
                                    rows={3}
                                />
                            </div>

                            <div className="flex justify-end space-x-2 pt-4">
                                <Button
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="border-[1px] border-gray-300"
                                >
                                    Отмена
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-black text-white"
                                >
                                    Создать
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {boards.length === 0 ? (
                <div className="text-center py-12">
                    <Layout className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">У вас пока нет досок</p>
                    <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="inline-flex gap-2 bg-black text-white"
                    >
                        Создать первую доску
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {boards.map((board) => (
                        <Link key={board.id} to={`/board/${board.id}`}>
                            <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105">
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Layout className="h-5 w-5" />
                                        <span>{board.name}</span>
                                    </CardTitle>
                                    {board.description && (
                                        <CardDescription>
                                            {board.description}
                                        </CardDescription>
                                    )}
                                </CardHeader>

                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">
                                                    К выполнению:
                                                </span>
                                                <span className="font-medium">
                                                    {/* {getTaskCountByStatus(
                                                        board.id,
                                                        "todo"
                                                    )} */}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">
                                                    В работе:
                                                </span>
                                                <span className="font-medium">
                                                    {/* {getTaskCountByStatus(
                                                        board.id,
                                                        "in-progress"
                                                    )} */}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">
                                                    На проверке:
                                                </span>
                                                <span className="font-medium">
                                                    {/* {getTaskCountByStatus(
                                                        board.id,
                                                        "review"
                                                    )} */}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">
                                                    Выполнено:
                                                </span>
                                                <span className="font-medium">
                                                    {/* {getTaskCountByStatus(
                                                        board.id,
                                                        "done"
                                                    )} */}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-1 text-xs text-gray-500 pt-2 border-t">
                                            {/* <Calendar className="h-3 w-3" /> */}
                                            <span>
                                                Количество задач:{" "}
                                                {board.taskCount}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
