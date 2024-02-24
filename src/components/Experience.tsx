import { View, Line, Svg, Text } from '@react-pdf/renderer';

interface experienceProps {
    titleStyle?: any;
    positionStyle?: any;
    data: {
        jobTitle: string; 
        company: string; 
        description: string; 
        duration: string; 
    }[],
    lineStyle?: any;
    dateStyle?: any;
    strokeWidth?: number;
    strokeLength?: string;
    fontSize?: string;
}

const Experience: React.FC<experienceProps> = (props) => {
    return (
        <View style={{marginBottom: 15, fontSize: `${props.fontSize}`, lineHeight: '1.6pt'}}>
            <Text style={props.titleStyle}>Professional Experience</Text>
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
            {props.data.map(({ jobTitle, company, description, duration }) => {
                return (
                    <View style={{marginBottom: 10}}>
                        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 2}}>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <Text style={props.positionStyle}>{ jobTitle !== "" ? `${jobTitle} - ` : null }</Text>
                                    <Text>{company}</Text>
                                </View>
                            <Text style={props.dateStyle}>{`${duration}`}</Text>
                        </View>
                                {description !== "" && (
                                <Text style={{maxWidth: '75%'}}>{`• ${description}`}</Text>)}
                         
                    </View>
                )
            })}
        </View>
    )
}

export default Experience;