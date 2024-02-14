import { useState} from 'react';
import { BlobProvider } from '@react-pdf/renderer';
import { Document as DocumentView, Page as PageView } from 'react-pdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import MyDoc from './components/PDF';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const App = () => {
  const [name, setName] = useState('Iyanuoluwa Oyerinde');
  const [title, setTitle] = useState('Web Developer');
  const [numPages, setNumPages] = useState(1)
  const [pageNum, setPageNum] = useState(1)

function nextPage() {
  if (pageNum >= numPages) setPageNum(pageNum)
  else setPageNum(pageNum + 1)
}
function prevPage() {
  if (pageNum > 0 && pageNum === 1) setPageNum(pageNum)
  else setPageNum(pageNum - 1)
}

var info = {
  name: name,
  title: title,
}

  return (
    <div className='flex gap-2 justify-center center-align'>
      <div className='grid place-items-center p-4'>
        <form className='grid h-[fit-content] gap-4' onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label className="form-label pb-4" htmlFor="exampleInput">Name</label>
            <br />
            <input 
              className="form-control mt-[0.2em]" 
              id="exampleInput" 
              placeholder=" "
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            
          </div>
          <div>
            <label htmlFor="titleInput">Title:</label>
            <input
              id="titleInput"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='flex gap-4'>
            <button onClick={prevPage} >Previous</button>
            <button onClick={nextPage} >Next</button>
          </div>
          
        </form>
        <PDFDownloadLink document={<MyDoc info={info}/>}>
          Download
        </PDFDownloadLink>
        
      </div>
      <div className='w-[840px] h-[100vh]'>
        <BlobProvider document={<MyDoc info={info} />}>
          {({ blob, url, loading, error }) => {
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
                  <PageView pageNumber={pageNum} scale={1} />
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