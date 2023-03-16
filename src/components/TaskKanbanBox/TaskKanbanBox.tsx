import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Task } from "../Task/Task";
import { DroppableWrapper, KanbanBoxTitleField, KanbanComponentWrapper, KanbanTitle, TaskKanbanBoxWrapper } from "./TaskKanbanBox.styled";
import styled from 'styled-components';


export const TaskKanbanBox = (props: any) => {
    const {column} = props;
    return (
        <TaskKanbanBoxWrapper>
            <KanbanBoxTitleField>
                <KanbanTitle>{column.id}</KanbanTitle>
            </KanbanBoxTitleField>
                <Droppable droppableId={column.id} direction="vertical">
                    {(provided, snapshot) => (
                        <KanbanComponentWrapper {...provided.droppableProps} ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
                            {column.tasks.map( (task: string, index: number) => <Task task={task} index={index}/>)}
                        </KanbanComponentWrapper>
                    )}
                </Droppable>   
        </TaskKanbanBoxWrapper>
    )
}