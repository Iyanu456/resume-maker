import { View, Line, Svg, Text } from '@react-pdf/renderer';

interface projectProps {
    titleStyle: any,
    projectStyle: any,
    data: {
        project: string; 
        description: string;
        features: string[];
        date: string;
    }[],
    lineStyle: any,
    dateStyle: any,
    strokeWidth: number;
}

export default function Projects(props: projectProps) {
    return (
        <View style={{marginBottom: 15, marginTop: -10, fontSize: '13pt', lineHeight: '1.6pt'}}>
            <Text style={props.titleStyle}>Projects</Text>
            <Svg height="10" width="534"style={props.lineStyle}>
                <Line
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                strokeWidth={props.strokeWidth}
                stroke="rgb(0,0,0)"
            />
            </Svg>
            {props.data.map(({ project, description, features, date }) => {
                return (
                    <View style={{marginBottom: 10}}>
                        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 2}}>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <Text style={props.projectStyle}>{`${project} - `}</Text>
                                    <Text>{description}</Text>
                                </View>
                            <Text style={{margin: 'auto 0 auto auto', fontFamily: 'Inter', fontWeight: 'semibold'}}>{`${date}`}</Text>
                        </View>
                        {features.map((item) => {
                            return (
                                <Text style={{maxWidth: '80%'}}>{`• ${item}`}</Text>
                            )
                        })}
                    </View>
                )
            })}
        </View>
    )
}