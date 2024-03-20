import { PDFDocument } from './DocumentFile';
import { saveAs } from 'file-saver'
import { pdf } from '@react-pdf/renderer'



interface downloadProps {
  component: any;
  className: string;
}
const Download = ({component, className}: downloadProps) => {

   

  const handleDownload = async () => {
    const blob = await pdf(<PDFDocument component={component} />).toBlob()
    saveAs(blob, 'untitled.pdf')
  }

  return <button className={className} onClick={handleDownload}>Download</button>
}

export default Download