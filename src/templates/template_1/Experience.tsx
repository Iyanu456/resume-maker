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
        link: string;
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
            {props.data.map(({ jobTitle, company, description, duration, link, visible }: { jobTitle: string, company:string, description:string, duration:string, link: string, visible:boolean }, index: number) => {
                if (jobTitle === "" && description === "" && duration === "" && link === "") return null; 
                if (visible === false) return null;
                return (
                    <Div style={{}} key={index} >
                        <Div style={{display: 'flex', flexDirection: 'row'}}>
                                <Div style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "2pt",
                    }}>
                                    <p style={props.positionStyle}>
                                        <a href={link}>{ jobTitle !== "" ? `${jobTitle}` : null }</a>
                                    </p>
                                    {link !== "" && <a href={link} ><svg
                                    className="mt-[3.5pt] hidden"
                                    width="10pt"
                                    height="10pt"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    >
                                    <path
                                        d="M7.75 18.5C4.17 18.5 1.25 15.58 1.25 12C1.25 8.42 4.17 5.5 7.75 5.5C8.16 5.5 8.5 5.84 8.5 6.25C8.5 6.66 8.16 7 7.75 7C4.99 7 2.75 9.24 2.75 12C2.75 14.76 4.99 17 7.75 17C10.51 17 12.75 14.76 12.75 12C12.75 11.59 13.09 11.25 13.5 11.25C13.91 11.25 14.25 11.59 14.25 12C14.25 15.58 11.33 18.5 7.75 18.5Z"
                                        fill="#292D32"
                                    />
                                    <path
                                        d="M16 18.75C15.59 18.75 15.25 18.41 15.25 18C15.25 17.59 15.59 17.25 16 17.25C18.89 17.25 21.25 14.89 21.25 12C21.25 9.11 18.89 6.75 16 6.75C13.11 6.75 10.75 9.11 10.75 12C10.75 12.41 10.41 12.75 10 12.75C9.59 12.75 9.25 12.41 9.25 12C9.25 8.28 12.28 5.25 16 5.25C19.72 5.25 22.75 8.28 22.75 12C22.75 15.72 19.72 18.75 16 18.75Z"
                                        fill="#292D32"
                                    />
                                    </svg></a>}
                                    <p>&nbsp;{company !== "" ? `- ${company}` : null}</p>
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
