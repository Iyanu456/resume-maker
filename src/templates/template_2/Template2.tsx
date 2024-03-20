import { Div } from '../../Div.tsx';
import Education from './Education.tsx';
import Skills from './Skills.tsx';
import Experience from './Experience.tsx';
import Projects from './Projects.tsx';

interface DocumentProps {
  style: {
    firstName: any;
    profession: any;
    title: any;
    subtitle: any;
    line: any;
    dateStyle: any;
    // Add more style properties as needed
  };
  info: {
    education?: {
      // Define the structure of the education object
      school: string;
      degree: string;
      duration: string;
    }[];
    experience?: {
      // Define the structure of the experience object
      jobTitle: string;
      company: string;
      description: string;
      duration: string;
    }[];
    skill?: {
      // Define the structure of the skill object
      skill: string;
    }[];
    project?: {
      // Define the structure of the project object
      project: string;
      about: string;
      description: string;
      duration: string;
    }[];
    contactInfo?: {
      // Define the structure of the contactInfo object
      name?: string;
      label: string;
      src?: string;
    }[];
    personalInfo?: {
      // Define the structure of the personalInfo object
      fullname: string;
      jobTitle: string;
    }[];
  };
}

const docData = {
  fontSize: '11pt',
  strokeWidth: 3,
  strokeLength: '516pt',
};

export default function MyDoc2(props: DocumentProps) {
  const {
    style,
    info: { personalInfo, contactInfo, education, skill, experience, project },
  } = props;

  return (
    <Div style={{ padding: "25pt 40pt", fontSize: "11pt", display: 'flex' }}>
      <Div style={{ display: 'flex', gap: '8pt', flexDirection: 'column', margin: 'auto', border: '2px solid black' }}>
        {personalInfo &&
          personalInfo.map(({ fullname, jobTitle }) => (
            <Div>
              <p style={style.firstName}>{fullname}</p>
              <p style={style.profession}>{jobTitle}</p>
            </Div>
          ))}
        <Div style={{display: 'flex', gap: '8pt', flexDirection: 'row', margin: '0 auto'} } >
          {contactInfo &&
            contactInfo.map(({ label, src }, index) => (
              <a
                key={index}
                href={src}
                style={{
                  color: 'black',
                  textDecoration: 'none',
                }}
              >
                {label}
              </a>
            ))}
            </Div>
        <Div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15pt',
            marginTop: 15,
          }}
        >
          {/*education &&
            education.some((education) =>
              Object.values(education).some((value) => value !== '')
            ) && (
              <Education
                titleStyle={style.title}
                schoolStyle={style.subtitle}
                lineStyle={style.line}
                strokeWidth={docData.strokeWidth}
                strokeLength={docData.strokeLength}
                fontSize={docData.fontSize}
                data={education}
              />
            )*/}
          {/*skill &&
            skill.some((skill) =>
              Object.values(skill).some((value) => value !== '')
            ) && (
              <Skills
                titleStyle={style.title}
                schoolStyle={style.subtitle}
                lineStyle={style.line}
                strokeWidth={docData.strokeWidth}
                strokeLength={docData.strokeLength}
                fontSize={docData.fontSize}
                data={skill}
              />
            )*/}
          {/*experience &&
            experience.some((experience) =>
              Object.values(experience).some((value) => value !== '')
            ) && (
              <Experience
                titleStyle={style.title}
                positionStyle={style.subtitle}
                lineStyle={style.line}
                dateStyle={style.dateStyle}
                strokeWidth={docData.strokeWidth}
                strokeLength={docData.strokeLength}
                fontSize={docData.fontSize}
                data={experience}
              />
            )*/}
          {/*project &&
            project.some((project) =>
              Object.values(project).some((value) => value !== '')
            ) && (
              <Projects
                titleStyle={style.title}
                projectStyle={style.subtitle}
                lineStyle={style.line}
                dateStyle={style.dateStyle}
                strokeWidth={docData.strokeWidth}
                strokeLength={docData.strokeLength}
                fontSize={docData.fontSize}
                data={project}
              />
            )*/}
        </Div>
      </Div>
    </Div>
  );
}
