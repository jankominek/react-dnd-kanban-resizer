import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { TaskWrapper } from "./Task.styled";

export const Task = (props:any) => {

    return(
        <Draggable draggableId="di" index={1}>
            {provided => (
                <TaskWrapper ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                >
                    {props.task}
                </TaskWrapper>
            )}

        </Draggable>
    )
}