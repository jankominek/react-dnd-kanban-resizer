import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Task } from "../Task/Task";
import { KanbanBoxTitleField, KanbanComponentWrapper, KanbanTitle, TaskKanbanBoxWrapper } from "./TaskKanbanBox.styled";


export const TaskKanbanBox = (props: any) => {

    return (
        <TaskKanbanBoxWrapper>
            <KanbanBoxTitleField>
                <KanbanTitle>To-do</KanbanTitle>
            </KanbanBoxTitleField>

            <Droppable droppableId={props.id}>
                {provided => (
                    <KanbanComponentWrapper {...provided.droppableProps} ref={provided.innerRef}>
                        {props.tasks.map( (task: string) => <Task task={task}/>)}
                    </KanbanComponentWrapper>
                )}
            </Droppable>    
    
        </TaskKanbanBoxWrapper>
    )
}