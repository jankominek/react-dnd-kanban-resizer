import React, { useState } from 'react';
import { TaskKanbanBox } from './components/TaskKanbanBox/TaskKanbanBox';
import { DragDropContext, DropResult, OnDragEndResponder } from 'react-beautiful-dnd';

const initialData = {
  backlog: {
      id: "backlog",
      tasks: ["task 1", "task 2", "task 3"],
  }
}
function App() {

  const [kanban, setKanban] = useState(initialData);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }



    
  }
  return (
    <div className="App">
      
      <DragDropContext onDragEnd={onDragEnd}>

      </DragDropContext>
    </div>
  );
}

export default App;
