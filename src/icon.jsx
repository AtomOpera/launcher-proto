import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import Avatar from './avatar';

const Container = styled.div`
  /* border: 1px solid lightgrey; */
  border-radius: 2px;
  /* padding: 8px; */
  /* margin-bottom: 8px; */
  margin-bottom: 4px;
  /* background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')}; */
  background-color: white;
  width: 60px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// const Handle = styled.div`
//   width: 20px;
//   height: 20px;
//   background-color: orange;
//   border-radius: 4px;
//   margin-right: 8px;
// `;

export default function Icon(props) {


  return (
    <Draggable 
      draggableId={props.icon.id}
      index={props.index}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          // {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {/* <Handle {...provided.dragHandleProps}/> */}
          <Avatar icon={props.icon} provided={provided}/>
          {/* {domainName(props.icon.content).toUpperCase()} */}
        </Container>
      )}
    </Draggable>
  );
}