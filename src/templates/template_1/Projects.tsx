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
  fontSize: any;
}



export default function Projects(props: projectProps) {
  const {scaleFactor} = useScaleFactor()

  return (
    <Div style={{marginBottom: 15 * scaleFactor, marginTop: -10 * scaleFactor, fontSize: `${props.fontSize * scaleFactor}`, width: `${515 * scaleFactor}pt`}}>
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
      <Div style={{display: 'flex', flexDirection: 'column', gap: `${5 * scaleFactor}pt`}} >
      {props.data.map(({ project, about, description, duration, visible }: { project:string, about:string, description:string, duration:string, visible:boolean }, index: number) => {
        if (project === "" && about === "" && description === "" && duration === "") return null;
        if (project === "" && about === "" && description === "" && duration === "" && visible === true) return null;
        if (visible === false) return null;
        return (
          <Div style={{marginBottom: 10 * scaleFactor}} key={index} >
            <Div style={{display: 'flex', flexDirection: 'row'}}>
              <Div style={{display: 'flex', flexDirection: 'row'}}>
                <p style={props.projectStyle}>{ project !=="" ? `${project} - ` : null }</p>
                <p>&nbsp;{about}</p>
              </Div>
              <p style={{margin: 'auto 0 auto auto', fontFamily: 'Inter'}}>{`${duration}`}</p>
            </Div>
            <Div /*</Div>dangerouslySetInnerHTML={{ __html: description }}*/ style={{maxWidth: `${390 * scaleFactor}pt`, display: 'flex', flexDirection: 'column', gap: `${1 * scaleFactor}pt`, fontSize: `${11 * scaleFactor}pt`}}>
              {parse(convertToHTML(description))}
            </Div>
          </Div>
        )
      })}
      </Div>
    </Div>
  )
}