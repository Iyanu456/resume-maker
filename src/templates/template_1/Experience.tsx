import { Div } from '../../Div';

interface ExperienceProps {
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

const Experience: React.FC<ExperienceProps> = (props) => {
    return (
        <Div style={{marginBottom: 10, fontSize: `${props.fontSize}`}}>
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
            {props.data.map(({ jobTitle, company, description, duration }, index) => {
                if (jobTitle === "" && description === "" && duration === "") return null; 
                return (
                    <Div style={{marginBottom: 10}} key={index} >
                        <Div style={{display: 'flex', flexDirection: 'row', marginBottom: 2}}>
                                <Div style={{display: 'flex', flexDirection: 'row'}}>
                                    <p style={props.positionStyle}>{ jobTitle !== "" ? `${jobTitle} - ` : null }</p>
                                    <p>&nbsp;{company}</p>
                                </Div>
                            <p style={props.dateStyle}>{`${duration}`}</p>
                        </Div>
                                {description !== "" && (
                                <p style={{maxWidth: '75%'}}>{`• ${description}`}</p>)}
                         
                    </Div>
                )
            })}
            </Div>
        </Div>
    )
}

export default Experience;