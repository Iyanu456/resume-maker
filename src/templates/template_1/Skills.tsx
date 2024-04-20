// import { useState, useEffect } from 'react';
import { Div } from '../../Div'
//import parse from "html-react-parser";
import { useScaleFactor } from '../../ScaleContext'
//import { convertToHTML } from './convertToHTML';

interface skillsProps {
  titleStyle: any,
  schoolStyle: any,
  data: {
    skill: string;
    skillInformation: string;
    visible: boolean;
  }[];
  lineStyle: any,
  strokeWidth: number;
  strokeLength: string;
  fontSize: any;
}

function removeHtmlTags(text: string): string {
  return text.replace(/<[^>]*>/g, "");
}

const Skills: React.FC<skillsProps> = (props) => {
  const { scaleFactor } = useScaleFactor()
  return (
    <Div style={{ fontSize: `${props.fontSize * scaleFactor}`}}>
      <p style={props.titleStyle}>Skills</p>
      <svg height="10" width={props.strokeLength} style={props.lineStyle}>
        <line
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          strokeWidth={props.strokeWidth}
          stroke="rgb(0,0,0)"
        />
      </svg>
      <Div style={{display: 'flex', flexDirection: 'column', gap: `${2 * scaleFactor}pt`, width: `${515 * scaleFactor}pt`}}>
      {props.data.map(({ skill, skillInformation, visible }, index: number) => {
                if (skill=== "" && skillInformation === "") return null; 
                if (visible === false) return null;
                return (
                    <Div style={{display: 'flex', flexDirection: 'row'}} key={index} >
                        <Div style={{width: `${515 * scaleFactor}pt`, fontSize: `${11 * scaleFactor}pt`}}>
                          <p style={{fontFamily: 'Calibri', margin: 'auto 0'}}><b>{`${skill !== "" ? `${skill}: ` : ""}`}</b>{removeHtmlTags(skillInformation)}</p>
                        </Div>
                               
                         
                    </Div>
                )
            })}
     
      </Div>
    </Div>
  )
}

export default Skills;
