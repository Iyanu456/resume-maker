import { useState, useEffect, ChangeEvent } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import MyDoc from './components/PDF';
import PersonalDetails from './components/PersonalDetailsForm';
import PdfSection from './components/PDFViewer';
//import { generateFormData } from './formData';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const App = () => {

  const [userDisplayedInfo, setUserDisplayedInfo] = useState({
    firstname: '',
    lastname: '',
    title: 'Web Developer',
    email: '',
    phoneNo: '',
  });

  const [pdfRenderedProps, setPdfRenderedProps] = useState({
    firstname: '',
    lastname: '',
    title: '',
    email: '',
    phoneNo: '',
  });


  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      setScreenWidth(newScreenWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);


  
  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string): void => {

    const value = e.target.value;
    setUserDisplayedInfo((prevUserInfo) => ({ ...prevUserInfo, [field]: value }));

    // Clear the existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout for delayed update to pdfRenderedProps
    const newTimeoutId = setTimeout(() => {
      setPdfRenderedProps((prevUserInfo) => ({ ...prevUserInfo, [field]: value }));
    }, 1000); // Set your desired delay in milliseconds

    // Update the state with the new timeout ID
    setTimeoutId(newTimeoutId);
  };

function handleScreenResize(): number {
  // Use a formula or any logic you prefer to calculate the scale based on the window width
  return screenWidth / 1600; // You can adjust this formula based on your requirements
}

var info = {
  firstname: pdfRenderedProps.firstname,
  lastname: pdfRenderedProps.lastname,
  title: pdfRenderedProps.title,
  email: pdfRenderedProps.email,
  phoneNo: pdfRenderedProps.phoneNo,
}

//const formData = generateFormData(userDisplayedInfo, handleChange);
var formData = [{
  label: 'First Name',
  id: 'firstnameInput',
  value: userDisplayedInfo.firstname,
  type: 'text',
  handleChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'firstname'),
},
{
  label: 'Last Name',
  id: 'lastnameInput',
  value: userDisplayedInfo.lastname,
  type: 'text',
  handleChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'lastname'),
},
{
  label: 'Email',
  id: 'emailInput', // Corrected id for uniqueness
  value: userDisplayedInfo.email,
  type: 'text',
  handleChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'email'),
},
{
  label: 'Phone No',
  id: 'phoneNoInput', // Corrected id for uniqueness
  value: userDisplayedInfo.phoneNo,
  type: 'text',
  handleChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'phoneNo'),
},
]


  return (
    <div className='main'>
      <div className='grid place-items-center'>
        <PersonalDetails data={formData} />
          <PDFDownloadLink document={<MyDoc info={info}/>}>
            Download
          </PDFDownloadLink>
        
      </div>

        <PdfSection 
        className='pt-[2em] mb-[2em]  desktop'
          handleScreenResize={handleScreenResize}
          info={info}
        
        />
    </div>
  );
};

export default App;