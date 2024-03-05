import { Document as BlobDocument, Page as BlobPage, Font, View, Text, StyleSheet, Link } from '@react-pdf/renderer';
import Education from './Education';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
//import { contactInfo, education, projects, experience, skill } from './data';
import poppinsRegular from '../assets/fonts/Poppins-Regular.ttf'
import poppinsBold from '../assets/fonts/Poppins-Bold.ttf'
import poppinsSemiBold from '../assets/fonts/Poppins-SemiBold.ttf'
import interRegular from '../assets/fonts/Inter-Regular.ttf'
import interBold from '../assets/fonts/Inter-Bold.ttf'
import interSemiBold from '../assets/fonts/Inter-SemiBold.ttf'


Font.register({
  family: 'Poppins', fonts: [
    { src: poppinsRegular, fontWeight: 'normal' },
    { src: poppinsBold, fontWeight: 'bold' },
    { src: poppinsSemiBold, fontWeight: 'semibold' }
  ]
});
Font.register({
  family: 'Inter', fonts: [
    { src: interRegular, fontWeight: 'normal' },
    { src: interBold, fontWeight: 'bold' },
    { src: interSemiBold, fontWeight: 'semibold' }
  ]
});



const styles = StyleSheet.create({
  page: {
    padding: '40'
  },
  section: {
    padding: '20, 40',
  },
  lastName: {
    fontSize: '30pt',
    fontFamily: 'Poppins',
    letterSpacing: '1.1pt',

  },
  firstName: {
    fontSize: '23pt',
    fontFamily: 'Poppins',
    margin: 'auto',
    fontWeight: 'semibold',
    
    },
  profession: {
    textAlign: 'center',
    fontSize: '16pt',
    fontFamily: 'Inter',
    marginBottom: 15,
  },
  title: {
    fontSize: '14pt',
    fontFamily: 'Inter',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: '12pt',
    fontFamily: 'Inter',
    fontWeight: 'bold'
  },
  line: {
    marginBottom: 2,
  },
  dateStyle: { margin: 'auto 0 auto auto', fontFamily: 'Inter' }
});


interface DocumentProps {
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
      name: string;
      label: string;
      src: string;
    }[];
    personalInfo?: {
      // Define the structure of the personalInfo object
      fullname: string;
      jobTitle: string;
    }[];
  };
}


const docData = {
  fontSize: '12pt',
  strokeWidth: 2,
  strokeLength: '516',
}
export default function MyDoc(props: DocumentProps) {

  return (
    <BlobDocument>
      <BlobPage style={styles.page} size='A4' wrap>
        <View>
          <View>
            {props.info.personalInfo && props.info.personalInfo.map(({ fullname, jobTitle }) => ( <>
            <Text style={styles.firstName}>{`${fullname}`}</Text>
            <Text style={styles.profession}>{jobTitle}</Text></>))}
            <View style={{ display: 'flex', flexDirection: 'row', fontSize: '12pt', fontFamily: 'Inter', margin: '2 auto' }}>
              {props.info.contactInfo && props.info.contactInfo.map(({ name, label, src }) => (<Link src={src} style={{ marginRight: 10, color: 'black', textDecoration: 'none' }}>{label}</Link>))}
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', gap: '8', marginTop: 22 }}>

              {props.info.education && props.info.education.some(education => Object.values(education).some(value => value !== '')) && (
                <Education
                  titleStyle={styles.title}
                  schoolStyle={styles.subtitle}
                  lineStyle={styles.line}
                  strokeWidth={docData.strokeWidth}
                  strokeLength={docData.strokeLength}
                  fontSize={docData.fontSize}
                  data={props.info.education}
                />
              )}
              {props.info.skill && props.info.skill.some(skill => Object.values(skill).some(value => value !== '')) && (
              <Skills
                titleStyle={styles.title}
                schoolStyle={styles.subtitle}
                lineStyle={styles.line}
                strokeWidth={docData.strokeWidth}
                strokeLength={docData.strokeLength}
                fontSize={docData.fontSize}
                data={props.info.skill}
              />)}
              {props.info.experience && props.info.experience.some(experience => Object.values(experience).some(value => value !== '')) && (
              <Experience
                titleStyle={styles.title}
                positionStyle={styles.subtitle}
                lineStyle={styles.line}
                dateStyle={styles.dateStyle}
                strokeWidth={docData.strokeWidth}
                strokeLength={docData.strokeLength}
                fontSize={docData.fontSize}
                data={props.info.experience}
              />)}
              {props.info.project && props.info.project.some(project => Object.values(project).some(value => value !== '')) && (
              <Projects
                titleStyle={styles.title}
                projectStyle={styles.subtitle}
                lineStyle={styles.line}
                dateStyle={styles.dateStyle}
                strokeWidth={docData.strokeWidth}
                strokeLength={docData.strokeLength}
                fontSize={docData.fontSize}
                data={props.info.project}
              />)}
            </View>
          </View>
        </View>
      </BlobPage>
    </BlobDocument>
  )
};