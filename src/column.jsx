import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { InlineEditableTextfield } from '@atlaskit/inline-edit';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Icon from './icon';
import EmptyIcon from './emptyIcon'

const Container = styled.div`
  /* margin: 2px; */
  /* border: 1px solid lightgrey; */
  background-color: white;
  border-radius: 2px;
  width: 25%;
  /* width: 220px; */

  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
`;
const Title = styled.h6`
  padding: 6px;
`;
const IconList = styled.div`
  padding: 6px;
  transition: background-color 0.2s ease;
  /* background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};  */
  flex-grow: 1;
  min-height: 100px;
`;

const InlineEditExample = (props) => {
  const [editValue, setEditValue] = useState(props.column.title);

  return (
    // <div
    // // {...props.dragHandleProps}
    //   // style={{
    //   //   padding: `${gridSize()}px ${gridSize()}px ${gridSize() * 6}px`,
    //   // }}
    // >
      <InlineEditableTextfield
        
        defaultValue={editValue}
        //label="Inline editable textfield"
        onConfirm={newValue => {
          props.onTitleEdited(props.column, newValue);
          setEditValue(newValue);
        }}
        placeholder="Click to enter text"
        isCompact
      />
    // </div>
  );
};



export default function Column(props) {
  const [editMode, setEditMode] = useState(false);

  return (
    <Draggable 
      draggableId={props.column.id}
      index={props.index}
    >
      {(provided) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div {...provided.dragHandleProps}>
          <InlineEditExample
            onTitleEdited={props.onTitleEdited}
            column={props.column}
            dragHandleProps={provided.dragHandleProps}
          />
          </div>
          {/* {editMode 
          ? <input
              {...provided.dragHandleProps}
              style={{padding:'6px'}}
           /> 
          : <Title
            onClick={()=>{setEditMode(true)}}
            {...provided.dragHandleProps}
          >{props.title}</Title>} */}
          {/* <div>{props.icons.length}</div> */}
          <Droppable 
            droppableId={props.column.id}
            type="icon"
          >
            {(provided, snapshot) => (
              <IconList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.icons.map((icon, index) =>
                  <Icon 
                    key={icon.id} 
                    icon={icon} 
                    index={index}
                  />
                )}
                
                {/* <EmptyIcon 
                  key={props.icons.length} 
                  icon={props.column.id} 
                  index={props.icons.length}
                /> */}
                {provided.placeholder}
                
              </IconList>
            )}
          </Droppable>
          
        </Container>
      )}
    </Draggable>
  );
}