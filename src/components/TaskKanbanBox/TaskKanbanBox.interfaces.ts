import { IKanbanBoxProps } from "../../App.interfaces";

export interface ITaskKanbanBoxProps {
    column: IKanbanBoxProps;
    isTemporary?: boolean;
    confirmColumnName?: (name: string) => void;
}