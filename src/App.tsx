import React, { useState } from 'react';
import { TaskKanbanBox } from './components/TaskKanbanBox/TaskKanbanBox';
import { DragDropContext, DropResult, DraggableLocation, DraggableId } from 'react-beautiful-dnd';
import { AddButton, AppContent, AppWrapper, TableWrapper, TaskAddWrapper, TaskInput } from './App.styled';
import _ from 'lodash';

interface IInitialKanbanData {
  [key: string] : IKanbanBoxProps;
}

interface IKanbanBoxProps {
  id: string;
  name: string;
  tasks: string[];
}

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
  const findAndReplaceTask = (source: DraggableLocation, destination: DraggableLocation, draggableId: DraggableId ) => {
    const droppableSourceId: string = source.droppableId;
    const droppableDestinationId: string = destination.droppableId;
    const taskName: string = kanban[droppableSourceId as keyof IInitialKanbanData]?.tasks?.at(source.index) || "";
      const clonedKanban = _.clone(kanban);

    const updatedArrayFromSource: string[] = clonedKanban[droppableSourceId].tasks.filter( t => !_.isEqual(t, taskName));
    clonedKanban[droppableSourceId].tasks = updatedArrayFromSource;

    clonedKanban[droppableDestinationId].tasks.splice(destination.index, 0, taskName);
    // clonedKanban[droppableDestinationId].tasks = updatedArrayFromDestination;
    
    setKanban(clonedKanban);
  }

  const replaceInTheSameDestination = (source: DraggableLocation, destination: DraggableLocation, draggableId: DraggableId) => {
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

  const onDragEnd = ({source, destination, draggableId}: DropResult) => {
    if (source === undefined || destination === null) {
      return;
    }

    if(source.droppableId === destination?.droppableId){
        replaceInTheSameDestination(source, destination, draggableId);
    }

    if(source && destination && source.droppableId !== destination.droppableId){
      findAndReplaceTask(source, destination, draggableId);
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
        </TableWrapper>

        </AppContent>
     
      
    </AppWrapper>
     </DragDropContext>
  );
}

export default App;
