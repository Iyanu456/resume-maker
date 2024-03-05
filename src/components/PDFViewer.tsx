// PdfSection.tsx
//import React, { useState, useRef } from "react";
import { BlobProvider } from "@react-pdf/renderer";
//import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import { Document as DocumentView, Page as PageView } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import MyDoc from "./PDF";
import ResizableDiv from "./Placeholder";

interface PdfSectionProps {
  handleScreenResize: () => number;
  info: any;
  className: string;
  scaleFactor: number;
  pageNum: number;
  numPages: number;
  onLoadSuccess: (num: any) => any;
  onRenderSuccess: () => void;
  
 
}

export default function PdfSection(props: PdfSectionProps) {
    //const [numPages, setNumPages] = useState(1)
    //const [pageNum, setPageNum] = useState(1)
    //const [renderedPageNumber, setRenderedPageNumber] = useState(Number);




    //const isLoading = renderedPageNumber !== pageNum;



  //function nextPage() {
  //  if (pageNum >= numPages) setPageNum(pageNum);
  //  else setPageNum(pageNum + 1);
  //}


  //function prevPage() {
  //  if (pageNum > 0 && pageNum === 1) setPageNum(pageNum);
  //  else setPageNum(pageNum - 1);
  //}


  return (
    <div className={props.className}>
      {/*<div className="flex gap-4 mb-5">
                <button onClick={prevPage}>Previous</button>
                <button onClick={nextPage}>Next</button>
  </div>*/}
  
      <BlobProvider document={<MyDoc info={props.info} />}>

        {({ blob, error }) => {
         
          if (error) { return null }

          else { return (
            <div>
              <DocumentView
                className="page"
                noData={(() => <ResizableDiv scaleFactor={props.scaleFactor}/>)}
                file={blob}
                onLoad={() => null}
                loading={() => <ResizableDiv scaleFactor={props.scaleFactor}/>}
                onLoadSuccess={props.onLoadSuccess}
               
              >
                    <PageView
                    noData={() => <ResizableDiv scaleFactor={props.scaleFactor}/>}
                    onLoad={() => null}
                    loading={() => <ResizableDiv scaleFactor={props.scaleFactor} />}
              pageNumber={props.pageNum}
              scale={props.handleScreenResize()}

              onRenderSuccess={props.onRenderSuccess}
            />
              </DocumentView> 
            </div>
          );
        }}}
      </BlobProvider>
      
    </div>
  );
}
