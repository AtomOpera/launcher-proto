import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';
import "./styles.css";

const Container = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  justify-content: space-around;
`;

const Outer = styled.div`
  // border: 1px solid red;
  margin: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  // background-color: black;
`;

const Inner = styled.div`
  width: 330px;
  background-color: white;
  border-radius: 20px;
  padding: 10px;
  // margin: 5px;
`;

const MainBody = styled.div`
  margin: 0 auto;
  width: 330px;
  background-color: white;
  border-radius: 20px;
  padding: 5px;
`;

const MainBody2 = styled.div`
  /* border: 1px solid lightgrey; */
  
  /* position: absolute; */
  border-bottom: 50px;
  padding-bottom: 50px;
  margin-bottom: 50px;

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
  //console.log(load());
  useEffect(() => {
    fetch("https://express-simple-save-file.herokuapp.com/getData")
      .then((res) => res.json())
      .then((res) => {
        console.log(res); 
        if (res.columns) {
          setData(res);
        }
      })
      .catch((e) => console.error(e));
  }, []);
  
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

  // document.body.style = 'background: black;';

  return (
    <>
      <button onClick={() => {save(data);}}>write!</button>
      <br />
      <br />

      <Outer><Inner>
      {/* <MainBody> */}
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
        </Inner></Outer>
      {/* </MainBody> */}
      
    </>
  );
};

async function load() {
  return async() => {
    fetch("https://express-simple-save-file.herokuapp.com/getData")
      .then((res) => res.json())
      .then((res) => { console.log(res); return res;})
      .catch((e) => console.error(e));
  };

  //return fetchItNow;
};

function save(data) {
  //https://express-simple-save-file.herokuapp.com/new
  //https://vwxjf.sse.codesandbox.io/new
  const addPP = async () => {
    fetch('https://express-simple-save-file.herokuapp.com/new', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    // async () => {
    //   const rawResponse = await fetch('https://httpbin.org/post', {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({a: 1, b: 'Textual content'})
    //   });
      .then((response) => {
        console.log(
          `Response: ${response.status} ${response.statusText}`
        );
        return response.text();
      })
      .then((text) => console.log(text))
      .catch((err) => console.error(err));
  };

  const fetchito = async() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((e) => console.error(e));
  };
  // fetchito();
  addPP();
}

ReactDOM.render(<App />, document.getElementById('root'));
