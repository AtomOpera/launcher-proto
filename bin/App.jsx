import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';
import useFetch from "./useFetch";
import "./styles.css";

const Container = styled.div`
  display: flex;
`;

export default function App() {
  const [data, setData] = useState(initialData);


  function onDragEnd(result) {

  };


  return (
    <>
      <Container>
        {data.columnOrder.map((elem, index) => (
          <Column 
            key={data.columns[elem].id}
            title={data.columns[elem].title} 
            column={data.columns[elem]}
            icons={data.columns[elem].iconIds.map(iconId => data.icons[iconId])}
            index={index}
          />)
        )}
      </Container>
    </>
  );
}
