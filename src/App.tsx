import { useState, useEffect, ChangeEvent } from 'react';
import { BlobProvider } from '@react-pdf/renderer';
import { Document as DocumentView, Page as PageView } from 'react-pdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import MyDoc from './components/PDF';
import PersonalDetails from './components/PersonalDetailsForm';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();



// Simple debounce function
function debounce(func: Function, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
}



const App = () => {
  const [displayedFirstName, setDisplayedFirstName] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [title, setTitle] = useState('Web Developer');
  const [numPages, setNumPages] = useState(1)
  const [pageNum, setPageNum] = useState(1)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      setScreenWidth(newScreenWidth);
    };

    //handleResize();

    window.addEventListener('resize', handleResize);
    

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  
  const delayedUpdatePdfFirstName = debounce((value: string) => {
    setFirstName(value);
  }, 800);

  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setDisplayedFirstName(value);
    delayedUpdatePdfFirstName(value);
  };

function nextPage() {
  if (pageNum >= numPages) setPageNum(pageNum)
  else setPageNum(pageNum + 1)
}
function prevPage() {
  if (pageNum > 0 && pageNum === 1) setPageNum(pageNum)
  else setPageNum(pageNum - 1)
}

function handleScreenResize(): number {
  // Use a formula or any logic you prefer to calculate the scale based on the window width
  return screenWidth / 1200; // You can adjust this formula based on your requirements
}

var info = {
  firstname: firstname,
  lastname: lastname,
  title: title,
  email: email,
  phoneNo: phoneNo,
}

var formData =  [
  {
      label: 'First Name',
      id: 'firstnameInput',
      value: displayedFirstName,
      type: 'text',
      handleChange: handleInputChange
},
{
  label: 'Last Name',
  id: 'firstnameInput',
  value: lastname,
  type: 'text',
  handleChange: (e: ChangeEvent<HTMLInputElement>) => {setLastName(e.target.value)}
},
{
      label: 'Email',
      id: 'firstnameInput',
      value: email,
      type: 'text',
      handleChange: (e: ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}
},
{
  label: 'Phone No',
  id: 'firstnameInput',
  value: phoneNo,
  type: 'text',
  handleChange: (e: ChangeEvent<HTMLInputElement>) => {setPhoneNo(e.target.value)}
},
]

  return (
    <div className='main'>
      <div className='grid place-items-center'>
        <PersonalDetails data={formData} />
        
        <div className='flex gap-4'>
            <button onClick={prevPage} >Previous</button>
            <button onClick={nextPage} >Next</button>
          </div>
          <PDFDownloadLink document={<MyDoc info={info}/>}>
            Download
          </PDFDownloadLink>
        
      </div>
      <div className='pt-[2em] h-[100vh] desktop'>
        <BlobProvider document={<MyDoc info={info} />}>
          {({ blob, loading, error }) => {
            if (loading) {
              return null;
            }

            if (error) {
              return <div>Error: {error.message}</div>;
            }

            return (
              <div>
                <DocumentView className='page' file={blob} onLoadSuccess={({ numPages }) => {
                  setNumPages(numPages);
                }}>
                  <PageView pageNumber={pageNum} scale={handleScreenResize()} />
                </DocumentView>
              </div>
            );
          }}
        </BlobProvider>
      </div>
    </div>
  );
};

export default App;