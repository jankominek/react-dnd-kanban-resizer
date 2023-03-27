export interface IInitialKanbanData {
  [key: string] : IKanbanBoxProps;
}

export interface IKanbanBoxProps {
  id: string;
  name: string;
  tasks: string[];
}
