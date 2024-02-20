import React, { useState, useEffect, ChangeEvent } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import MyDoc from './components/PDF';
import PersonalDetails from './components/forms/PersonalDetailsForm';
import EducationForm from './components/forms/EducationForm';
import PdfSection from './components/PDFViewer';
import { generateFormData } from './formData';

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

    education: [{
      school: '',
    degree: '',
    duration: '',
    }],
  });

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
  const scaleFactor = 1.6;

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

  const handleScreenResize = (): number => {
    // Use a formula or any logic you prefer to calculate the scale based on the window width
    console.log(screenWidth / 2300);
    return (screenWidth / 2300) * scaleFactor; // You can adjust this formula based on your requirements
  };

  const info = {
    firstname: pdfRenderedProps.firstname,
    lastname: pdfRenderedProps.lastname,
    title: pdfRenderedProps.title,
    email: pdfRenderedProps.email,
    phoneNo: pdfRenderedProps.phoneNo,
    education: pdfRenderedProps.education
  };


  const [educationArray, setEducationArray] = useState([
    { school: '', degree: '', duration: '' },
  ])

  const handleEducationSave = (index: number, data: any) => {
    setPdfRenderedProps((prevProps) => {
      const newEducationArray = [...prevProps.education];
      newEducationArray[index] = data;

      return {
        ...prevProps,
        education: newEducationArray,
      };
    });
  };

  // Add a new form and corresponding education object
  const handleAddEducation = () => {
    setPdfRenderedProps((prevProps) => {
      const newEducationArray = [...prevProps.education, { school: '', degree: '', duration: '' }];

      return {
        ...prevProps,
        education: newEducationArray,
      };
    });
  };

  // Render EducationForm components based on the pdfRenderedProps
  const educationForms = pdfRenderedProps.education.map((data, index) => (
    <EducationForm
      key={index}
      formStyle='mx-auto w-[100%] h-[max-content] px-[2.2em]'
      index={index}
      data={data}
      onSave={handleEducationSave}
    />
  ));

  return (
    <div className='grid'>
      <div className='main'>
        <div className='grid w-auto py-[2em] place-items-center overflow-y-scroll'>
          <PersonalDetails
            formStyle='mx-auto w-[100%] pt-[3em] px-[2.2em] h-[max-content]'
            onFirstNameChange={(e) => handleChange(e, 'firstname')}
            onLastNameChange={(e) => handleChange(e, 'lastname')}
          />
          <hr className='w-[100%] my-[1.8em]'/>
          {educationForms}
          <button onClick={handleAddEducation}>Add Education</button>
          <hr className='w-[100%] my-[1.8em]'/>
          {/*<PDFDownloadLink document={<MyDoc info={info}/>}>
            Download
          </PDFDownloadLink>*/}
        </div>

        <div className='pdf-parent grid place-items-center desktop'>
          <PdfSection
            className='grid pt-[4em] pb-[6em] desktop'
            handleScreenResize={handleScreenResize}
            info={info}
            scaleFactor={scaleFactor}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
