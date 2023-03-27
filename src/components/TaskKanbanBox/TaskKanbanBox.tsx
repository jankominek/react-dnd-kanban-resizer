import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Task } from "../Task/Task";
import { ColumnNameInput, InputWrapper, KanbanBoxTitleField, KanbanComponentWrapper, KanbanTitle, TaskKanbanBoxWrapper } from "./TaskKanbanBox.styled";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { ITaskKanbanBoxProps } from "./TaskKanbanBox.interfaces";

export const TaskKanbanBox = (props: ITaskKanbanBoxProps) => {
    const {column, isTemporary, confirmColumnName} = props;
    const [colName, setColName] = useState<string>("");

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColName(e.target?.value);
    }

    return (
        <TaskKanbanBoxWrapper>
            <KanbanBoxTitleField>
               {isTemporary && confirmColumnName && <KanbanTitle>
                <InputWrapper>
                    <ColumnNameInput onChange={onChangeName} value={colName}/>
                    <BsFillCheckSquareFill style={{flexGrow: "2", color: "green", cursor: "pointer"}} onClick={ () => confirmColumnName(colName)}/>
                </InputWrapper>
               </KanbanTitle> ||  <KanbanTitle>{column.name}</KanbanTitle>}
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