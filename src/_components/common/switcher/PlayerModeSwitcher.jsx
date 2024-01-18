import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import AppState from "../../../_atom/app.atom"
import { useEffect } from "react";
const Wrapper = styled.div`
    .box {
	width: 20em;
	position: absolute;
	-webkit-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	top: 50%;
	left: 50%;
}
.container {
	width: 100%;
	height: 10rem;
	background-color: #2d2936;
	-webkit-box-shadow: 0 2.5em 4.6em rgba(0, 0, 0, 0.3);
	box-shadow: 0 2.5em 4.6em rgba(0, 0, 0, 0.3);
	border-radius: 0.3em;
	position: relative;
}
a {
	display: block;
	background: -o-linear-gradient(315deg, #8175fe, #89befe);
	background: linear-gradient(135deg, #8175fe, #89befe);
	color: #221e27;
	text-align: center;
	font-family: "Poppins", sans-serif;
	font-size: 1.2em;
	padding: 1em 0;
	margin-top: 1em;
	text-decoration: none;
	border-radius: 0.3em;
}
input[type="checkbox"] {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	/* position: absolute; */
	margin: auto;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	cursor: pointer;
	outline: none;
	height: 5.6em;
	width: 12.5em;
	background-color: #000000;
	-webkit-transform: skewX(-7deg);
	-ms-transform: skewX(-7deg);
	transform: skewX(-7deg);
	-webkit-transition: 0.3s;
	-o-transition: 0.3s;
	transition: 0.3s;
}
input[type="checkbox"]:before {
	font-size: 1.5em;
	content: "OFF";
	position: absolute;
	width: 3.75em;
	height: 2.9em;
	background-color: #2d2936;
	color: #a0a0a0;
	top: 0.42em;
	left: 0.42em;
	-webkit-transition: 0.3s;
	-o-transition: 0.3s;
	transition: 0.3s;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	font-family: "Poppins", sans-serif;
	font-weight: 600;
	letter-spacing: 1px;
}
input[type="checkbox"]:checked {
	background: -o-linear-gradient(315deg, #8175fe, #89befe);
	background: linear-gradient(135deg, #8175fe, #89befe);
}
input[type="checkbox"]:checked:before {
	content: "ON";
	left: 4.1em;
	color: #89befe;
}

`;
const PlayerModeSwitcher = () => {
    const [appState, setAppState] = useRecoilState(AppState);
    useEffect(()=>{
        console.log(appState);
    },[appState])
  return (
    <Wrapper>
      {/* <div className="box"> */}
        {/* <div className="container"> */}
          <input type="checkbox" onChange={(e)=>{
            if(e.target.checked){
                setAppState({
                    playerMode: "karaoke"
                })
            }else {
                setAppState({
                    playerMode: "radio"
                })
            }
          }} title="Karaoke/Radio?" />
        {/* </div> */}
      {/* </div> */}
    </Wrapper>
  );
};

export default PlayerModeSwitcher;
