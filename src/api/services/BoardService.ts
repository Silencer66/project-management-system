import { $api, T_ApiResponse, T_BoardResponse } from "..";
import { Board } from "../../lib/types";

export default class BoardService {
    static async GetBoards(): Promise<Board[] | null> {
        const response = await $api.get<T_ApiResponse>(`/boards`);

        const boardResponse = response.data.data as T_BoardResponse[];
        if (!boardResponse) {
            return null;
        }

        const boards: Board[] = boardResponse.map((board) => ({
            id: board.id,
            name: board.name,
            description: board.description,
            taskCount: board.taskCount,
        }));
        return boards;
    }
}
