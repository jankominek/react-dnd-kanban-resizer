import React, { useState } from 'react';
import { TaskKanbanBox } from './components/TaskKanbanBox/TaskKanbanBox';
import { DragDropContext, DropResult, DraggableLocation, DraggableId } from 'react-beautiful-dnd';
import { AddButton, AppContent, AppWrapper, TableWrapper, TaskAddWrapper, TaskInput } from './App.styled';
import _ from 'lodash';
import { AddColumnSpaceComponent } from './components/AddColumnSpace/AddColumnSpace';
import { IInitialKanbanData, IKanbanBoxProps } from './App.interfaces';

const initialData: IInitialKanbanData = {
  backlog: {
      id: "backlog",
      name: "Backlog",
      tasks: ["task 1", "task 2", "task 3"],
  },
  inProgress: {
    id: "inProgress",
    name: "In progress",
    tasks: []
  }
}
function App() {

  const [kanban, setKanban] = useState(initialData);
  const [taskName, setTaskName] = useState<string>("");
  const [temporaryKanbanCol, setTemporaryKanbanCol] = useState<IKanbanBoxProps | null>();
  const findAndReplaceTask = (source: DraggableLocation, destination: DraggableLocation) => {
    const droppableSourceId: string = source.droppableId;
    const droppableDestinationId: string = destination.droppableId;
    const taskName: string = kanban[droppableSourceId as keyof IInitialKanbanData]?.tasks?.at(source.index) || "";
      const clonedKanban = _.clone(kanban);

    const updatedArrayFromSource: string[] = clonedKanban[droppableSourceId].tasks.filter( t => !_.isEqual(t, taskName));
    clonedKanban[droppableSourceId].tasks = updatedArrayFromSource;

    clonedKanban[droppableDestinationId].tasks.splice(destination.index, 0, taskName);
    
    setKanban(clonedKanban);
  }

  const replaceInTheSameDestination = (source: DraggableLocation, destination: DraggableLocation) => {
    if(_.isEqual(source.index, destination.index)){
      return;
    }
    const droppableSourceId: string = source.droppableId;
    const droppableDestinationId: string = destination.droppableId;

    const taskName: string = kanban[droppableSourceId as keyof IInitialKanbanData]?.tasks?.at(source.index) || "";
    const clonedKanban = _.clone(kanban);
    const updatedArrayWithoutSource: string[] = clonedKanban[droppableSourceId].tasks.filter( t => !_.isEqual(t, taskName));
    clonedKanban[droppableSourceId].tasks = updatedArrayWithoutSource;

    clonedKanban[droppableDestinationId].tasks.splice(destination.index, 0, taskName);

    setKanban(clonedKanban);
  }

  const onDragEnd = ({source, destination}: DropResult) => {
    if (source === undefined || destination === null) {
      return;
    }

    if(source.droppableId === destination?.droppableId){
        replaceInTheSameDestination(source, destination);
    }

    if(source && destination && source.droppableId !== destination.droppableId){
      findAndReplaceTask(source, destination);
    }


    
  }

  const checkIfTaskExist = (taskName: string) => {
    const allTasks = Object.keys(kanban).map( (table) => {
      return kanban[table].tasks;
    })

    return _.flatMapDeep(allTasks).includes(taskName); 
  }
  const onAddTask = () => {
    const taskAlreadyExist = checkIfTaskExist(taskName);
    if(!!taskName && !taskAlreadyExist){
       const changedBacklogList: string[] = [...kanban["backlog"].tasks, taskName];
    setKanban({
      ...kanban,
      backlog: {
        ...kanban["backlog"],
        tasks: changedBacklogList
      }
    })

    setTaskName("");
    }
   

  }

  const onChangeTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;

    setTaskName(value);
  }

  const onAddColumn = () => {
    setTemporaryKanbanCol({
      id: "temp",
      name: "temp",
      tasks: []
    })
  }

  const confirmColumnName = (name: string) => {
    if(!!name.length){
      const colId = name.replace(/\s/g, '');
    setKanban({
      ...kanban,
      [colId] : {
        name: name,
        id: colId,
        tasks: []
      }
    })
    setTemporaryKanbanCol(null);
    }
  }
  return (
  <DragDropContext onDragEnd={onDragEnd}>
    <AppWrapper>
        <AppContent>
          <TaskAddWrapper>
            <TaskInput onChange={onChangeTaskName} value={taskName}/>
            <AddButton onClick={onAddTask}>
              <span>Add</span>
            </AddButton>
          </TaskAddWrapper>
          <TableWrapper>
          {Object.values(kanban).map( k => (
            // eslint-disable-next-line react/jsx-key
            <TaskKanbanBox column={k}/>
          ))}
          {temporaryKanbanCol && <TaskKanbanBox column={temporaryKanbanCol} isTemporary confirmColumnName={confirmColumnName}/>}
          <AddColumnSpaceComponent onClick={onAddColumn}/>
        </TableWrapper>

        </AppContent>
     
      
    </AppWrapper>
     </DragDropContext>
  );
}

export default App;
