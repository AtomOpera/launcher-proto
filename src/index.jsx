import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

const Container = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  justify-content: space-around;
`;

const MainBody = styled.div`
  /* border: 1px solid lightgrey; */
  
  position: absolute;
  left: 50%;
  margin-left: -175px;
  width: 340px;
  background-color: white;
  padding: 5px;

  border-radius: 20px;

  /* display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center; */
`;

function App() {
  const [data, setData] = useState(initialData);
  let newData = data;

  function onTitleEdited(column, newValue) {
    newData.columns[column.id].title = newValue;
    console.log(JSON.stringify(newData.columns));
    setData(newData);
    return;
  };

  function onDragEnd(result) {
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';

    // TODO: reorder our column
    const {
      destination, 
      source, 
      draggableId,
      type,
    } = result;

    if(!destination){
      return;
    }

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if(type === 'column'){
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      console.log(newColumnOrder);
      const newData = {
        ...data,
        columnOrder: newColumnOrder,
      };

      setData(newData);
      //console.log(newData.columnOrder);
      return;
    }

    // const column = data.columns[source.droppableId];
    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];
    
    if (start === finish){
      const newIconIds = Array.from(start.iconIds);
      newIconIds.splice(source.index, 1);
      newIconIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        iconIds: newIconIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
      return;
    }
    
    // Moving from one list to another
    const startIconIds = Array.from(start.iconIds);
    startIconIds.splice(source.index, 1);
    const newStart = {
      ...start,
      iconIds: startIconIds,
    };

    const finishIconIds = Array.from(finish.iconIds);
    finishIconIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      iconIds: finishIconIds,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newData);
    return;

  };

  var [date,setDate] = useState(new Date());
    
  useEffect(() => {
      var timer = setInterval(()=>setDate(new Date()), 1000 )
      return function cleanup() {
          clearInterval(timer)
      }
  
  });

  const locale = 'en';
  // const today = new Date();

  const day = date.toLocaleDateString(locale, { weekday: 'long' });
  const myDate = `${day}, ${date.getDate()} ${date.toLocaleDateString(locale, { month: 'long' })}\n\n`;

  const hour = date.getHours();
  const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}\n\n `;

  const time = date.toLocaleTimeString({ hour: 'numeric', minute: 'numeric', second: 'numeric' });

  document.body.style = 'background: black;';

  return (
    <>
      <MainBody>
        <h2 style={{textAlign: "center"}}>
          {wish}  
        </h2>
        <h2 style={{textAlign: "center"}}>
          {myDate} {time}
        </h2>
        <DragDropContext
          onDragEnd={onDragEnd}

        >
          <Droppable 
            droppableId="all-columns" 
            direction="horizontal" 
            type="column"
          >
            {(provided) => (
              <Container
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data.columnOrder.map((elem, index) => (
                  <Column 
                    key={data.columns[elem].id}
                    title={data.columns[elem].title} 
                    column={data.columns[elem]}
                    icons={data.columns[elem].iconIds.map(iconId => data.icons[iconId])}
                    index={index}
                    onTitleEdited={onTitleEdited}
                  />
                ))
                }
                {provided.placeholder}
              </Container>
            )}
            
          </Droppable>
        </DragDropContext>
        <br />
      </MainBody>
      <button onClick={() => {save();}}>write!</button>
    </>
  );
};

function save() {
  const addPP = async () => {
    const bodyData = `{}`;
    fetch('https://vwxjf.sse.codesandbox.io/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-16',
      },
      body: bodyData,
    })
      .then((response) => {
        console.log(
          `Response: ${response.status} ${response.statusText}`
        );
        return response.text();
      })
      .then((text) => console.log(text))
      .catch((err) => console.error(err));
  };
  addPP();
}

ReactDOM.render(<App />, document.getElementById('root'));
