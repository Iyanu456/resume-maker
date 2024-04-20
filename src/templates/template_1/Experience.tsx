import { Div } from '../../Div';
import parse from "html-react-parser";
import { convertToHTML } from './convertToHTML';
import { useScaleFactor } from '../../ScaleContext';

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
    strokeWidth?: any;
    strokeLength?: string;
    fontSize: string;
}

const Experience: React.FC<ExperienceProps> = (props) => {
    const {scaleFactor} = useScaleFactor()
    return (
        <Div style={{ fontSize: `${parseInt(props.fontSize) * scaleFactor}`, width: `${515 * scaleFactor}pt`}}>
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
            <Div style={{display: 'flex', flexDirection: 'column', fontFamily: 'Calibri'}} >
            {props.data.map(({ jobTitle, company, description, duration, visible }: { jobTitle: string, company:string, description:string, duration:string, visible:boolean }, index: number) => {
                if (jobTitle === "" && description === "" && duration === "") return null; 
                if (visible === false) return null;
                return (
                    <Div style={{marginBottom: 10 * scaleFactor}} key={index} >
                        <Div style={{display: 'flex', flexDirection: 'row'}}>
                                <Div style={{display: 'flex', flexDirection: 'row'}}>
                                    <p style={props.positionStyle}>{ jobTitle !== "" ? `${jobTitle} - ` : null }</p>
                                    <p>&nbsp;{company}</p>
                                </Div>
                            <p style={props.dateStyle}>{`${duration}`}</p>
                        </Div>
                        <Div style={{maxWidth: `${410 * scaleFactor}pt`, display: 'flex', flexDirection: 'column', gap: `${2 * scaleFactor}pt`, fontSize: `${11 * scaleFactor}pt`}}>
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
