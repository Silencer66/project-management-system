import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./navigation/routes";
import { Header } from "./shared/Header";
import { ProjectsProvider } from "./context/ProjectsProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function App() {
    return (
        <ProjectsProvider>
            <DndProvider backend={HTML5Backend}>
                <Header />
                <main className="container mx-auto px-4 py-6">
                    <Routes>
                        {routes.map((route) => (
                            <Route key={route.path} {...route} />
                        ))}

                        <Route path="*" element={<Navigate to="/boards" />} />
                    </Routes>
                </main>
            </DndProvider>
        </ProjectsProvider>
    );
}
