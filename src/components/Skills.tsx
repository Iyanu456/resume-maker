import { View, Line, Svg, Text } from '@react-pdf/renderer';

interface skillsProps {
    titleStyle: any,
    schoolStyle: any,
    data: string[],
    lineStyle: any,
    strokeWidth: number;
}

const Skills: React.FC<skillsProps> = (props) => {
    return (
        <View style={{marginBottom: 15, fontSize: '13pt', lineHeight: '1.4pt'}}>
            <Text style={props.titleStyle}>Skills</Text>
            <Svg height="10" width="534" style={props.lineStyle}>
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
                {props.data.map((skill) => {
                    return (
                        <Text style={{fontFamily: 'Inter', fontWeight: 'semibold'}}>{`• ${skill}    `}</Text>
                    )
                })}
            </View>
        </View>
    )
}

export default Skills