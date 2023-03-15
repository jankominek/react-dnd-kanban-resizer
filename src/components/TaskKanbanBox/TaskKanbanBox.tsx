import React from "react";
import { KanbanBoxTitleField, KanbanComponentWrapper, KanbanTitle, TaskKanbanBoxWrapper } from "./TaskKanbanBox.styled";


export const TaskKanbanBox = () => {

    return (
        <TaskKanbanBoxWrapper>
            <KanbanBoxTitleField>
                <KanbanTitle>To-do</KanbanTitle>
            </KanbanBoxTitleField>
            <KanbanComponentWrapper>
                    
            </KanbanComponentWrapper>
        </TaskKanbanBoxWrapper>
    )
}