import React, { useState } from 'react';
import { TaskKanbanBox } from './components/TaskKanbanBox/TaskKanbanBox';
import { DragDropContext, DropResult, DraggableLocation, DroppableId, Droppable, DraggableId } from 'react-beautiful-dnd';
import { AppWrapper, TableWrapper } from './App.styled';
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
console.log(kanban)
  const findAndReplaceTask = (source: DraggableLocation, destination: DraggableLocation, draggableId: DraggableId ) => {
    const droppableSourceId: string = source.droppableId;
    const droppableDestinationId: string = destination.droppableId;
    const taskName: string = kanban[droppableSourceId as keyof IInitialKanbanData]?.tasks?.at(source.index) || "";
    console.log("taskName: ", taskName);
      const clonedKanban = _.clone(kanban);

    const updatedArrayFromSource: string[] = clonedKanban[droppableSourceId].tasks.filter( t => !_.isEqual(t, taskName));
    clonedKanban[droppableSourceId].tasks = updatedArrayFromSource;

    clonedKanban[droppableDestinationId].tasks.splice(destination.index, 0, taskName);
    // clonedKanban[droppableDestinationId].tasks = updatedArrayFromDestination;
    
    console.log("cloned kanban: ", clonedKanban);
    setKanban(clonedKanban);
  }

  const replaceInTheSameDestination = (source: DraggableLocation, destination: DraggableLocation, draggableId: DraggableId) => {
    if(_.isEqual(source.index, destination.index)){
      console.log("source == destination index")
      return;
    }
    const droppableSourceId: string = source.droppableId;
    const droppableDestinationId: string = destination.droppableId;

    const taskName: string = kanban[droppableSourceId as keyof IInitialKanbanData]?.tasks?.at(source.index) || "";
    const clonedKanban = _.clone(kanban);
    const updatedArrayWithoutSource: string[] = clonedKanban[droppableSourceId].tasks.filter( t => !_.isEqual(t, taskName));
    clonedKanban[droppableSourceId].tasks = updatedArrayWithoutSource;

    clonedKanban[droppableDestinationId].tasks.splice(destination.index, 0, taskName);

    console.log(clonedKanban)
    setKanban(clonedKanban);
  }

  const onDragEnd = ({source, destination, draggableId}: DropResult) => {
    console.log("source: ", source);
    console.log("destination: ", destination);
    if (source === undefined || destination === null) {
      return;
    }

    if(source.droppableId === destination?.droppableId){
      console.log("the same droppable")
        replaceInTheSameDestination(source, destination, draggableId);
    }

    console.log("?3: ", source && destination && source.droppableId !== destination.droppableId)
    if(source && destination && source.droppableId !== destination.droppableId){
      console.log("differ destination")
      findAndReplaceTask(source, destination, draggableId);
    }


    
  }
  return (
  <DragDropContext onDragEnd={onDragEnd}>
    <AppWrapper>
      
        
          <TableWrapper>
          {Object.values(kanban).map( k => (
            <TaskKanbanBox column={k}/>
          ))}
        </TableWrapper>
     
      
    </AppWrapper>
     </DragDropContext>
  );
}

export default App;
