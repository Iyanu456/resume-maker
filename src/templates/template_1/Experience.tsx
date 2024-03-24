import { Div } from '../../Div';
import parse from "html-react-parser";
import { convertToHTML } from './convertToHTML';

interface ExperienceProps {
    titleStyle?: any;
    positionStyle?: any;
    data: {
        jobTitle: string; 
        company: string; 
        description: string; 
        duration: string; 
        visible: boolean; 
    }[] | any,
    lineStyle?: any;
    dateStyle?: any;
    strokeWidth?: number;
    strokeLength?: string;
    fontSize?: string;
}

const Experience: React.FC<ExperienceProps> = (props) => {
    return (
        <Div style={{marginBottom: 10, fontSize: `${props.fontSize}`, width: '515pt'}}>
            <p style={props.titleStyle}>Professional Experience</p>
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
            {props.data.map(({ jobTitle, company, description, duration, visible }: { jobTitle: string, company:string, description:string, duration:string, visible:boolean }, index: number) => {
                if (jobTitle === "" && description === "" && duration === "") return null; 
                if (visible === false) return null;
                return (
                    <Div style={{marginBottom: 10}} key={index} >
                        <Div style={{display: 'flex', flexDirection: 'row', marginBottom: 2}}>
                                <Div style={{display: 'flex', flexDirection: 'row'}}>
                                    <p style={props.positionStyle}>{ jobTitle !== "" ? `${jobTitle} - ` : null }</p>
                                    <p>&nbsp;{company}</p>
                                </Div>
                            <p style={props.dateStyle}>{`${duration}`}</p>
                        </Div>
                        <Div style={{maxWidth: '390pt', display: 'flex', flexDirection: 'column', gap: '8pt', fontSize: '11pt'}}>
                            {parse(convertToHTML(description))}
                        </Div>
                               
                         
                    </Div>
                )
            })}
            </Div>
        </Div>
    )
}

export default Experience;
