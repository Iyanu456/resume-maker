import { Div } from '../../Div';
import parse from "html-react-parser";
import { convertToHTML } from './convertToHTML';
import { useScaleFactor } from '../../ScaleContext';

interface projectProps {
  titleStyle: any,
  projectStyle?: any,
  data: {
    project: string; 
    about: string;
    description: string;
    duration: string;
    visible: boolean;
  }[] | any,
  lineStyle: any,
  dateStyle: any,
  strokeWidth: number;
  strokeLength: string;
  fontSize: string;
}



export default function Projects(props: projectProps) {
  const {scaleFactor} = useScaleFactor()

  return (
    <Div style={{ fontSize: `${parseInt(props.fontSize) * scaleFactor}`, width: `${515 * scaleFactor}pt`}}>
      <p style={props.titleStyle}>Projects</p>
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
      <Div style={{display: 'flex', flexDirection: 'column', gap: `${5 * scaleFactor}pt`, fontFamily: 'Calibri'}} >
      {props.data.map(({ project, about, description, duration, visible }: { project:string, about:string, description:string, duration:string, visible:boolean }, index: number) => {
        if (project === "" && about === "" && description === "" && duration === "") return null;
        if (project === "" && about === "" && description === "" && duration === "" && visible === true) return null;
        if (visible === false) return null;
        return (
          <Div style={{}} key={index} >
            <Div style={{display: 'flex', flexDirection: 'row',}}>
              <Div style={{display: 'flex', flexDirection: 'row', gap: '2pt'}}>
                <p style={props.projectStyle}>{ project !=="" ? `${project} - ` : null }</p>
                <p>&nbsp;{about}</p>
              </Div>
              <p style={{margin: 'auto 0 auto auto', fontFamily: 'Calibri'}}>{`${duration}`}</p>
            </Div>
            <Div /*</Div>dangerouslySetInnerHTML={{ __html: description }}*/ style={{ marginTop: `${3 * scaleFactor}pt`, maxWidth: `${390 * scaleFactor}pt`, display: 'flex', flexDirection: 'column', gap: `${1 * scaleFactor}pt`, fontSize: `${11 * scaleFactor}pt`}}>
              {parse(convertToHTML(description))}
            </Div>
          </Div>
        )
      })}
      </Div>
    </Div>
  )
}