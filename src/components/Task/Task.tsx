import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { TaskWrapper } from "./Task.styled";

export const Task = (props:any) => {

    console.log(props.task + " with id: " + props.task)
    return(
        <Draggable draggableId={props.task} index={props.index} key={props.task}>
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