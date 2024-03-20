import { Div } from '../../Div';

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
    <Div style={{marginBottom: 15, marginTop: -10, fontSize: `${props.fontSize}`}}>
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
      <Div style={{display: 'flex', flexDirection: 'column', gap: '5pt'}} >
      {props.data.map(({ project, about, description, duration }, index) => {
        if (project === "" && about === "" && description === "" && duration === "") return null;
        return (
          <Div style={{marginBottom: 10}} key={index} >
            <Div style={{display: 'flex', flexDirection: 'row', marginBottom: 2}}>
              <Div style={{display: 'flex', flexDirection: 'row'}}>
                <p style={props.projectStyle}>{ project !=="" ? `${project} - ` : null }</p>
                <p>&nbsp;{about}</p>
              </Div>
              <p style={{margin: 'auto 0 auto auto', fontFamily: 'Inter'}}>{`${duration}`}</p>
            </Div>
            <p style={{maxWidth: '80%'}}>{ description != "" ? `• ${description}` : null }</p>
          </Div>
        )
      })}
      </Div>
    </Div>
  )
}
