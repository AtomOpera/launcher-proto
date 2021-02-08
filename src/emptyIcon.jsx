import React, { useState } from 'react';
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

const AppIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  /* background-image: linear-gradient(#dde, #aab); */
  border-radius: 50px;
  width: 60px;
  height: 60px;
`;

// const Container = styled.div`
//   // border: 1px solid lightgrey;
//   border-radius: 2px;
//   padding: 8px;
//   margin-bottom: 8px;
//   background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};

//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

// const Handle = styled.div`
//   width: 20px;
//   height: 20px;
//   background-color: orange;
//   border-radius: 4px;
//   margin-right: 8px;
// `;

function Button(props){
  const [ButtonPressed, setButtonPressed] = useState(false);
  const [input, setInput] = useState("");

  return(
    <>{!ButtonPressed 
        && (
          <AppIcon
            style={{
              cursor: "pointer"
            }}
            
            onClick={() => {setButtonPressed(true)}}> + 

          </AppIcon>
        )}
      {ButtonPressed 
        && (
          <>
            <input 
              autoFocus
              onFocus={e => e.currentTarget.select()}
              onChange={e => setInput(e.currentTarget.value)}/>
            <button onClick={() => {
              setButtonPressed(false);
              console.log(props.col);
              props.addLink(input, props.col);

              }}> OK </button>
              {/* {input} */}
          </>
        )}
      {/* <div>{ButtonPressed.toString()}</div> */}
    </>
  );
}

export default function Icon(props) {


  return (
    <Draggable 
      draggableId={"plus"+props.icon}
      index={props.index}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {/* <Handle {...provided.dragHandleProps}/> */}
          <Button />
          {/* {domainName(props.icon.content).toUpperCase()} */}
        </Container>
      )}
    </Draggable>
  );
}