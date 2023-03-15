import React, { useState } from 'react';
import { TaskKanbanBox } from './components/TaskKanbanBox/TaskKanbanBox';
import { DragDropContext, DropResult, OnDragEndResponder } from 'react-beautiful-dnd';

const initialData = {
  tasks: {
    t1: {
      
    }
  }
}
function App() {

  const [kanbanBoxes, setKanbanBoxes] = useState<string[]>([]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }



    
  }

  return (
    <div className="App">
      
      <DragDropContext onDragEnd={onDragEnd}>

      </DragDropContext>
        <TaskKanbanBox />
    </div>
  );
}

export default App;
