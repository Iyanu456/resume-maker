import { Div } from '../../Div';
import { useScaleFactor } from '../../ScaleContext';

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
  const {scaleFactor} = useScaleFactor()

  return (
    <Div style={{ marginBottom: 15 * scaleFactor, fontSize: `${parseInt(props.fontSize) * scaleFactor}`}}>
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
      <Div style={{display: 'flex', flexDirection: 'column', gap: `${1 * scaleFactor}pt`, fontFamily: 'Calibri'}} >
      {props.data && props.data.map(({ school, degree, duration, visible }: { school: string; degree: string; duration: string, visible: boolean }, index: number) => {
        if (school === "" && degree === "" && duration === "" ) return null;
        else if (visible === false) return null;
        else return (<Div key={index} style={{ display: 'flex', flexDirection: 'row'}}>
          <Div style={{ display: 'flex', flexDirection: 'row' }}>
            <p style={props.schoolStyle}>{school}</p>
            <p>{`${degree !== "" ? (`, ${degree} `) : ""} `}</p>
          </Div>
          <p style={{margin: '0 0 0 auto'}}>{duration}</p>
        </Div>)
})}
      </Div>
    </Div>
  );
};

export default Education;
