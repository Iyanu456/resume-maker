import { Document as BlobDocument, Page as BlobPage, Font, View, Text, StyleSheet, Link } from '@react-pdf/renderer';
import Education from './Education';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import { contactInfo, education, projects, experience, skill } from './data';
import poppinsRegular from '../assets/fonts/Poppins-Regular.ttf'
import poppinsBold from '../assets/fonts/Poppins-Bold.ttf'
import poppinsSemiBold from '../assets/fonts/Poppins-SemiBold.ttf'
import interRegular from '../assets/fonts/Inter-Regular.ttf'
import interBold from '../assets/fonts/Inter-Bold.ttf'
import interSemiBold from '../assets/fonts/Inter-SemiBold.ttf'


Font.register({ family: 'Poppins', fonts: [
  {src: poppinsRegular, fontWeight: 'normal'},
  {src: poppinsBold, fontWeight: 'bold'},
  {src: poppinsSemiBold, fontWeight: 'semibold'}
]});
Font.register({ family: 'Inter', fonts: [
  {src: interRegular, fontWeight: 'normal'},
  {src: interBold, fontWeight: 'bold'},
  {src: interSemiBold, fontWeight: 'semibold'}
]});



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
    maxWidth: '70%',
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
  dateStyle: {margin: 'auto 0 auto auto', fontFamily: 'Inter'}
});


interface documentProps {
  info: {
    firstname: string;
    lastname: string;
    title: string;
  };

}

const docData = {
  fontSize: '12pt',
  strokeWidth: 2,
  strokeLength: '516',
}
export default function MyDoc(props: documentProps) {

  return (
  <BlobDocument>
    <BlobPage style={styles.page} size='A4' wrap>
      <View>
        <View>
          <Text style={styles.firstName}>{`${props.info.firstname} ${props.info.lastname}`}</Text>
          <Text style={styles.profession}>{props.info.title}</Text>
          <View style={{display: 'flex', flexDirection: 'row', fontSize: '12pt', fontFamily: 'Inter', margin: '2 auto'}}>
            {contactInfo.map(({ label, src}) => (<Link src={src} style={{marginRight: 10, color: 'black', textDecoration: 'none'}}>{label}</Link>))}
          </View>
          <View style={{marginTop: 22}}>
            <Education
                titleStyle={styles.title}
                schoolStyle={styles.subtitle}
                lineStyle={styles.line}
                strokeWidth={docData.strokeWidth}
                strokeLength={docData.strokeLength}
                fontSize={docData.fontSize}
                data={education}
            />
            <Skills
                titleStyle={styles.title}
                schoolStyle={styles.subtitle}
                lineStyle={styles.line}
                strokeWidth={docData.strokeWidth}
                strokeLength={docData.strokeLength}
                fontSize={docData.fontSize}
                data={skill}
            />
            <Experience
                titleStyle={styles.title}
                positionStyle={styles.subtitle}
                lineStyle={styles.line}
                dateStyle={styles.dateStyle}
                strokeWidth={docData.strokeWidth}
                strokeLength={docData.strokeLength}
                fontSize={docData.fontSize}
                data={experience}
            />
            <Projects
                titleStyle={styles.title}
                projectStyle={styles.subtitle}
                lineStyle={styles.line}
                dateStyle={styles.dateStyle}
                strokeWidth={docData.strokeWidth}
                strokeLength={docData.strokeLength}
                fontSize={docData.fontSize}
                data={projects}
            />
          </View>
        </View>
      </View>
    </BlobPage>
  </BlobDocument>
  )
};