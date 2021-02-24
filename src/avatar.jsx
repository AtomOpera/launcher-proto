import React, { useState } from 'react';
import styled from 'styled-components';

const dev=false;

// const dev=true;
/* border: ${highlight ? '1px solid ': '0px'}; */
/* box-shadow: ${highlight ? '0 0px 8px 0 grey': ''}; */

const NewWindowBox = styled.a`
  position: fixed;
  margin-left: -30px;
  margin-top: -30px;
  //margin-left: 40px;
  //margin-top: -50px;
  // left: 10%;
  // top: 10%;
  width: 12px;
  height: 12px;
  background-color: lightgrey;
  border-radius: 4px;
  //margin-right: 8px;
`;

const AppIcon = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* #f1f1f1 */

  border: ${dev ? '1px solid lightgrey': '0px'};


  /* border: 1px solid lightgrey; */
  background: #f1f1f1;
  /* box-shadow: 0 0px 4px 0 rgba(0, 0, 0, 0.2); */
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  /* background-image: linear-gradient(#dde, #aab); */
  /* box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.2); */
  border-radius: 50px; /* 50 for circle, 9 for iOS square*/
  /* 60 60 for iOS square style */
  width: 50px;
  height: 50px;
`;

const Container = styled.a`
  // border: 1px solid lightgrey;
  /* background-image: linear-gradient(#dde, #aab);
  border-radius: 9px;
  width: 60px;
  height: 60px; */
  border: ${dev ? '1px solid lightgrey': '0px'};
  width: 60px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

const Name = styled.div`
  max-width: 80px;

  border: ${dev ? '1px solid lightgrey': '0px'};
  /* margin-top: -15px; */

  color:black;
  font-size:9px;
  padding:5px 5px 5px 5px;
  display:block;
  text-transform:uppercase;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family:'Josefin Sans';
  //letter-spacing:0.5px;
`;



const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 4px;
  // margin-right: 8px;
`;

const Wrapper = styled.a`text-decoration: none;`;


export default function Avatar(props) {
  const [data, setData] = useState('');
  const [highlight, setHighlight] = useState(false);
  const [isShown, setIsShown] = useState(false);

  function domainName(url){
    const cleanUrl = url.replace('http://', '').replace('https://', '').replace('www.', '');
    return cleanUrl.split('.')[0];
  };

  const getDomIcon = "https://s2.googleusercontent.com/s2/favicons?domain=";

  const getUrlIcon = "https://s2.googleusercontent.com/s2/favicons?domain_url=";

  const handleOnClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  }     


  return (
    // <Wrapper href={props.icon.content} target="blank">
    <Container 
      onMouseDown={handleOnClick}
      href={props.icon.content} target="blank" {...props.provided.dragHandleProps} style={{cursor:"pointer", textDecoration: "none"}}
      
      // onClick={
      //   (event)=> {
      //     // window.open(`${props.icon.content}`, "_blank");
      //     event.blur();
      //     event.preventDefault();
      //   }
      // }
      
       
      key={props.icon.content}
      // onMouseEnter={()=>{setHighlight(true)}}
      // onMouseLeave={()=>{setHighlight(false)}}
      
      
      style={{cursor:"pointer"}}
    >
      {/* {JSON.stringify(props.provided.dragHandleProps)} */}
      {/* <a href={props.icon.content} 
            key={props.icon.content}
            onClick={
              (event)=> {
                window.open(`${props.icon.content}`, "_blank");
                event.preventDefault();
              }
            }
          >  */}
        
        
        <AppIcon href={props.icon.content} >  
        {/* <NewWindowBox {...props.provided.dragHandleProps}/> */}
        {/* <NewWindowBox /> */}
          <img src={getUrlIcon + props.icon.content} alt={props.icon.content} />
        </AppIcon> 
        {" "}
        <Name>{domainName(props.icon.content).toUpperCase()}</Name>
      {/* </a> */}
    </Container>
    // </Wrapper>
  );
}