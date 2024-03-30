// import { useState, useEffect } from 'react';
import { Div } from '../../Div'
import { useScaleFactor } from '../../ScaleContext'

interface skillsProps {
  titleStyle: any,
  schoolStyle: any,
  data: {
    skill: string;
    visible: boolean;
  }[];
  lineStyle: any,
  strokeWidth: number;
  strokeLength: string;
  fontSize: any;
}

const Skills: React.FC<skillsProps> = (props) => {
  const { scaleFactor } = useScaleFactor()
  return (
    <Div style={{marginBottom: 15 * scaleFactor, fontSize: `${props.fontSize * scaleFactor}`}}>
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
      <Div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: `${8 * scaleFactor}pt`, maxWidth: `${515 * scaleFactor}pt`}}>
        {props.data.map(({ skill, visible }, index) => {
          if (skill === "") return null;
          if (visible === false) return null;
          return (
         
            <p  key={index} style={{fontFamily: 'Inter', fontWeight: 'semibold', wordBreak: 'break-word'}}>{`• ${skill}`}&nbsp;&nbsp;</p>

          )
        })}
      </Div>
    </Div>
  )
}

export default Skills;
