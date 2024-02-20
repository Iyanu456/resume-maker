import { View, Line, Svg, Text } from '@react-pdf/renderer';

interface EducationProps {
  titleStyle: any;
  schoolStyle: any;
  data: { school: string; degree: string; duration: string }[];
  lineStyle: any;
  strokeWidth: number;
  strokeLength: string;
  fontSize: string;
}

const Education: React.FC<EducationProps> = (props) => {
  return (
    <View style={{ marginBottom: 15, fontSize: `${props.fontSize}`, lineHeight: '1.6pt' }}>
      <Text style={props.titleStyle}>Education</Text>
      <Svg height="10" width={props.strokeLength} style={props.lineStyle}>
        <Line x1="0" y1="0" x2="100%" y2="0" strokeWidth={props.strokeWidth} stroke="rgb(0,0,0)" />
      </Svg>
      {props.data.map(({ school, degree, duration }, index) => (
        <View key={index} style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={props.schoolStyle}>{school !== "" ? (`${school}, `) : null }</Text>
            <Text>{degree}</Text>
          </View>
          <Text style={{margin: '0 0 0 auto'}}>{duration}</Text>
        </View>
      ))}
    </View>
  );
};

export default Education;
