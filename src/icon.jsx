import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import Avatar from './avatar';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Container = styled.div`
  // border: 1px solid lightgrey; 
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

const NewWindowBox = styled.div`
  position: fixed;
  margin-left: 8px;
  margin-top: 4px;
  //margin-left: 40px;
  //margin-top: -50px;
  // left: 10%;
  // top: 10%;
  width: 12px;
  height: 12px;
  background-color: grey;
  border-radius: 4px;
  //margin-right: 8px;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;

export default function Icon(props) {
  const [isShown, setIsShown] = useState(false);


  return (
    <Draggable 
      draggableId={props.icon.id}
      index={props.index}
    >
      {(provided, snapshot) => (
        <Container
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          {...provided.draggableProps}
          // {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {/* <Handle {...provided.dragHandleProps}/> */}
          {isShown &&
            <a href={props.icon.content} target="_blank"><NewWindowBox></NewWindowBox></a>
          }
          <Avatar icon={props.icon} provided={provided}/>
          {/* {domainName(props.icon.content).toUpperCase()} */}
        </Container>
      )}
    </Draggable>
  );
}