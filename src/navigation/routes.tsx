import type { ComponentType, JSX } from "react";
import { ProjectsPage } from "../pages/ProjectsPage/ProjectsPage";
import { IssuesPage } from "../pages/IssuesPage/IssuesPage";
import { BoardPage } from "../pages/BoardPage/BoardPage";

interface Route {
    path: string;
    Component: ComponentType;
    title?: string;
    icon?: JSX.Element;
    link?: (el?: string | number) => string;
}

export const routes: Route[] = [
    {
        path: "/boards",
        Component: ProjectsPage,
        title: "Projects",
        link: () => "/boards",
    },
    {
        path: "/issues",
        Component: IssuesPage,
        title: "Issues",
        link: () => `/issues`,
    },
    {
        path: "/board/:id",
        Component: BoardPage,
        link: (id) => `/board/${id}`,
    },
];
