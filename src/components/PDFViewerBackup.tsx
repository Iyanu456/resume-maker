// PdfSection.tsx
import React, { useState, useRef } from "react";
import { BlobProvider } from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";
import { Document as DocumentView, Page as PageView } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import MyDoc from "./PDF";


interface PdfSectionProps {
  handleScreenResize: () => number;
  info: any;
  className: string;
 
}

export default function PdfSection(props: PdfSectionProps) {
    const [numPages, setNumPages] = useState(1)
    const [pageNum, setPageNum] = useState(1)
    const [renderedPageNumber, setRenderedPageNumber] = useState(Number);




    const isLoading = renderedPageNumber !== pageNum;



  function nextPage() {
    if (pageNum >= numPages) setPageNum(pageNum);
    else setPageNum(pageNum + 1);
  }


  function prevPage() {
    if (pageNum > 0 && pageNum === 1) setPageNum(pageNum);
    else setPageNum(pageNum - 1);
  }


  return (
    <div className={props.className}>
      <BlobProvider document={<MyDoc info={props.info} />}>

        {({ blob, error }) => {
         
          if (error) { return <div>Error: {error.message}</div>; }

          else { return (
            <div>
              <DocumentView
                className="page"
                file={blob}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
               
              >
                {isLoading && renderedPageNumber ? (<PageView
                  pageNumber={renderedPageNumber}
                  scale={props.handleScreenResize()}
                />) : null}
                    <PageView
              pageNumber={pageNum}
              onRenderSuccess={() => setRenderedPageNumber(pageNum)}
            />
              </DocumentView>
              
            </div>
          );
        }}}
      </BlobProvider>
      <div className="flex gap-4">
                <button onClick={prevPage}>Previous</button>
                <button onClick={nextPage}>Next</button>
              </div>
    </div>
  );
}




<DocumentView
                className={shouldShowPreviousDocument ? 'hidden' : 'page'}
                file={instance.blob}
                loading={null}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              >
              <PageView
                pageNumber={pageNum}
                scale={props.handleScreenResize()}
                onRenderSuccess={()=>{setPreviousRenderValue(currentRenderValue)}}
                
              />
            </DocumentView>




import React, { useState, useEffect } from "react";
import { pdf } from "@react-pdf/renderer";
import { Document as DocumentView, Page as PageView } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import MyDoc from "./PDF";
import { useAsync } from 'react-use';

interface PdfSectionProps {
  handleScreenResize: () => number;
  info: any;
  className: string;
}

export default function PdfSection(props: PdfSectionProps) {
  const [numPages, setNumPages] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const [previousRenderValue, setPreviousRenderValue] = useState<any | null>(null);

  const render = useAsync(async () => {
    const blob = await pdf(<MyDoc info={props.info} />).toBlob();
    const url = URL.createObjectURL(blob);
    return url;
  }, [props.info]);

  useEffect(() => {
    if (render.value && !render.loading) {
      setPreviousRenderValue(render.value);
    }
  }, [render.value]);

  function nextPage() {
    setPageNum((prevPageNum) => (prevPageNum >= numPages ? prevPageNum : prevPageNum + 1));
  }

  function prevPage() {
    setPageNum((prevPageNum) => (prevPageNum > 1 ? prevPageNum - 1 : prevPageNum));
  }


  const isFirstRendering = !previousRenderValue;

  const isLatestValueRendered = previousRenderValue === render.value;
  const isBusy = render.loading || !isLatestValueRendered;

  const shouldShowTextLoader = isFirstRendering && isBusy;
  const shouldShowPreviousDocument = !isFirstRendering && isBusy;

  return (
    <div className={props.className}>
      <div>
        {shouldShowPreviousDocument && previousRenderValue && (
          <DocumentView
            className="page"
            file={previousRenderValue}
            loading={null}
          >
            <PageView
              pageNumber={pageNum}
              scale={props.handleScreenResize()}
            />
          </DocumentView>
        )}

        <DocumentView
          className={shouldShowPreviousDocument ? 'hidden' : 'page'}
          file={render.value}
          loading={null}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          <PageView
            pageNumber={pageNum}
            scale={props.handleScreenResize()}
            onRenderSuccess={() => setPreviousRenderValue(render.value)}
          />
        </DocumentView>
      </div>
      <div className="flex gap-4">
        <button onClick={prevPage}>Previous</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}



// PdfSection.tsx
import React, { useState, useRef, useEffect } from "react";
import { BlobProvider } from "@react-pdf/renderer";
import { usePDF, pdf } from "@react-pdf/renderer";
import { Document as DocumentView, Page as PageView } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import MyDoc from "./PDF";
import {useAsync} from 'react-use';



interface PdfSectionProps {
  handleScreenResize: () => number;
  className: string;
  info: any;
  previousRenderValue: any;
  onRenderSuccess: (a: any) => any
}

export default function PdfSection(props: PdfSectionProps) {
    const [numPages, setNumPages] = useState(1)
    const [pageNum, setPageNum] = useState(1)
   //const [previousRenderValue, setPreviousRenderValue] = useState<any | null>(null);
   //const [currentRenderValue, setCurrentRenderValue] = useState<any | null>(null)
    
    const render = useAsync(async () => {

    const blob = await pdf(<MyDoc info={props.info} />).toBlob();
    const url = URL.createObjectURL(blob);

    return url;
  }, [props.info]);


  //useEffect(() => setCurrentRenderValue(render.value), [render.value]);

  function nextPage() {
    if (pageNum >= numPages) setPageNum(pageNum);
    else setPageNum(pageNum + 1);
  }


  function prevPage() {
    if (pageNum > 0 && pageNum === 1) setPageNum(pageNum);
    else setPageNum(pageNum - 1);
  }

  //const shouldShowPreviousDocument = previousRenderValue !== null && instance.blob !== previousRenderValue;

  const isFirstRendering = !props.previousRenderValue;

  const isLatestValueRendered = props.previousRenderValue === render.value;
  const isBusy = render.loading || !isLatestValueRendered;

  const shouldShowTextLoader = isFirstRendering && isBusy;
  const shouldShowPreviousDocument = !isFirstRendering && isBusy;

  return (
    <div className={props.className}>
            <div>
            {true  ?
              (<DocumentView
                className="page"
                file={props.previousRenderValue}
                loading={null}
               
              >
                <PageView
                  pageNumber={pageNum}
                  loading={null}
                  scale={props.handleScreenResize()}
                />
                   
              </DocumentView>) : null}

              
              <DocumentView
                className={shouldShowPreviousDocument ? 'page' : 'page' }
                file={render.value}
                loading={null}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              >
              <PageView
                pageNumber={pageNum}
                loading={null}
                scale={props.handleScreenResize()}
                onRenderSuccess={props.onRenderSuccess(render.value)}
                
              />
            </DocumentView>
              
            </div>
      <div className="flex gap-4">
                <button onClick={prevPage}>Previous</button>
                <button onClick={nextPage}>Next</button>
              </div>
    </div>
  );
}

// PdfSection.tsx
import React, { useState, useRef, useEffect } from "react";
import { BlobProvider } from "@react-pdf/renderer";
import { usePDF, pdf } from "@react-pdf/renderer";
import { Document as DocumentView, Page as PageView } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import MyDoc from "./PDF";
import {useAsync} from 'react-use';



interface PdfSectionProps {
  handleScreenResize: () => number;
  className: string;
  info: any;
  previousRenderValue: any;
  onRenderSuccess: (a: any) => any
}

export default function PdfSection(props: PdfSectionProps) {
    const [numPages, setNumPages] = useState(1)
    const [pageNum, setPageNum] = useState(1)
   //const [previousRenderValue, setPreviousRenderValue] = useState<any | null>(null);
   //const [currentRenderValue, setCurrentRenderValue] = useState<any | null>(null)
    
    const render = useAsync(async () => {

    const blob = await pdf(<MyDoc info={props.info} />).toBlob();
    const url = URL.createObjectURL(blob);

    return url;
  }, [props.info]);


  //useEffect(() => setCurrentRenderValue(render.value), [render.value]);

  function nextPage() {
    if (pageNum >= numPages) setPageNum(pageNum);
    else setPageNum(pageNum + 1);
  }


  function prevPage() {
    if (pageNum > 0 && pageNum === 1) setPageNum(pageNum);
    else setPageNum(pageNum - 1);
  }

  //const shouldShowPreviousDocument = previousRenderValue !== null && instance.blob !== previousRenderValue;

  const isFirstRendering = !props.previousRenderValue;

  const isLatestValueRendered = props.previousRenderValue === render.value;
  const isBusy = render.loading || !isLatestValueRendered;

  const shouldShowTextLoader = isFirstRendering && isBusy;
  const shouldShowPreviousDocument = !isFirstRendering && isBusy;

  return (
    <div className={props.className}>
            <div>
            {true  ?
              (<DocumentView
                className="page"
                file={props.previousRenderValue}
                loading={null}
               
              >
                <PageView
                  pageNumber={pageNum}
                  loading={null}
                  scale={props.handleScreenResize()}
                />
                   
              </DocumentView>) : null}

              
              <DocumentView
                className={shouldShowPreviousDocument ? 'page' : 'page' }
                file={render.value}
                loading={null}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              >
              <PageView
                pageNumber={pageNum}
                loading={null}
                scale={props.handleScreenResize()}
                onRenderSuccess={props.onRenderSuccess(render.value)}
                
              />
            </DocumentView>
              
            </div>
      <div className="flex gap-4">
                <button onClick={prevPage}>Previous</button>
                <button onClick={nextPage}>Next</button>
              </div>
    </div>
  );
}
