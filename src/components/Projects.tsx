import { View, Line, Svg, Text } from '@react-pdf/renderer';

interface projectProps {
    titleStyle: any,
    projectStyle: any,
    data: {
        project: string; 
        about: string;
        description: string;
        duration: string;
    }[],
    lineStyle: any,
    dateStyle: any,
    strokeWidth: number;
    strokeLength: string;
    fontSize: string;
}

export default function Projects(props: projectProps) {
    return (
        <View style={{marginBottom: 15, marginTop: -10, fontSize: `${props.fontSize}`, lineHeight: '1.6pt'}}>
            <Text style={props.titleStyle}>Projects</Text>
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
            {props.data.map(({ project, about, description, duration }) => {
                return (
                    <View style={{marginBottom: 10}}>
                        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 2}}>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <Text style={props.projectStyle}>{ project !=="" ? `${project} - ` : null }</Text>
                                    <Text>{about}</Text>
                                </View>
                            <Text style={{margin: 'auto 0 auto auto', fontFamily: 'Inter', fontWeight: 'semibold'}}>{`${duration}`}</Text>
                        </View>
                        
                                <Text style={{maxWidth: '80%'}}>{ description != "" ? `• ${description}` : null }</Text>
                        
                    </View>
                )
            })}
        </View>
    )
}