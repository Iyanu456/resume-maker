import { useState, useEffect } from 'react';
import { View, Line, Svg, Text } from '@react-pdf/renderer';

interface skillsProps {
    titleStyle: any,
    schoolStyle: any,
    data: {
        skill: string;
      }[];
    lineStyle: any,
    strokeWidth: number;
    strokeLength: string;
    fontSize: string;
}

const Skills: React.FC<skillsProps> = (props) => {
    return (
        <View style={{marginBottom: 15, fontSize: `${props.fontSize}`, lineHeight: '1.4pt'}}>
            <Text style={props.titleStyle}>Skills</Text>
            <Svg height="10" width={props.strokeLength} style={props.lineStyle}>
                <Line
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                strokeWidth={props.strokeWidth}
                stroke="rgb(0,0,0)"
            />
            </Svg>
            <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                {props.data.map(({ skill }) => {
                    return (
                        <Text style={{fontFamily: 'Inter', fontWeight: 'semibold'}}>{`• ${skill}    `}</Text>
                    )
                })}
            </View>
        </View>
    )
}

export default Skills