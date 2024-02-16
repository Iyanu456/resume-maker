// PdfSection.tsx
import { useState } from "react";
import { BlobProvider } from "@react-pdf/renderer";
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
        {({ blob, loading, error }) => {
          if (loading) {
            return null;
          }

          if (error) {
            return <div>Error: {error.message}</div>;
          }

          return (
            <div>
              <div className="flex gap-4">
                <button onClick={prevPage}>Previous</button>
                <button onClick={nextPage}>Next</button>
              </div>
              <DocumentView
                className="page"
                file={blob}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              >
                <PageView
                  pageNumber={pageNum}
                  scale={props.handleScreenResize()}
                />
              </DocumentView>
            </div>
          );
        }}
      </BlobProvider>
    </div>
  );
}
