import { Link, useNavigate } from "react-router-dom";
import { Plus, Layout, CheckSquare } from "lucide-react";
import { Button } from "../Button";

export function Header() {
    const navigate = useNavigate();

    const boardsClickHandler = () => {};

    const openTaskModal = () => {};

    const allTasksClickHandler = () => {
        navigate(`/issues`);
    };

    return (
        <header className=" border-b bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <Link
                            to="/tasks"
                            className="text-xl font-bold text-gray-900"
                        >
                            Project Manager
                        </Link>

                        <nav className="flex items-center space-x-4">
                            <Link to="/issues">
                                <div
                                    className="flex items-center space-x-2 gap-0.5 px-[22px] py-[18px] "
                                    onClick={allTasksClickHandler}
                                >
                                    <CheckSquare className="h-4 w-4" />
                                    <span>Все задачи</span>
                                </div>
                            </Link>

                            <Link to="/boards">
                                <Button
                                    className="flex items-center space-x-2"
                                    onClick={boardsClickHandler}
                                >
                                    <Layout className="h-4 w-4" />
                                    <span>Доски</span>
                                </Button>
                            </Link>
                        </nav>
                    </div>

                    <Button
                        onClick={openTaskModal}
                        className="flex items-center space-x-2 bg-black text-white"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Создать задачу</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
