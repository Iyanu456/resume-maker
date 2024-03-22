import { Div } from '../../Div';

interface EducationProps {
  titleStyle: any;
  schoolStyle: any;
  data: Array<{ school: string; degree: string; duration: string, visible: boolean }> | any;
  lineStyle: any;
  strokeWidth: number;
  strokeLength: string;
  fontSize: string;
}

const Education: React.FC<EducationProps> = (props) => {
  return (
    <Div style={{ marginBottom: 15, fontSize: `${props.fontSize}`}}>
      <p style={props.titleStyle}>Education</p>
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
      <Div style={{display: 'flex', flexDirection: 'column', gap: '5pt'}} >
      {props.data && props.data.map(({ school, degree, duration, visible }: { school: string; degree: string; duration: string, visible: boolean }, index: number) => {
        if (school === "" && degree === "" && duration === "" ) return null;
        else if (visible === false) return null;
        else return (<Div key={index} style={{ display: 'flex', flexDirection: 'row'}}>
          <Div style={{ display: 'flex', flexDirection: 'row' }}>
            <p style={props.schoolStyle}>{school !== "" ? (`${school}, `) : null }</p>
            <p>&nbsp;{degree}</p>
          </Div>
          <p style={{margin: '0 0 0 auto'}}>{duration}</p>
        </Div>)
})}
      </Div>
    </Div>
  );
};

export default Education;
