import { PDFDocument } from './DocumentFile';
import { saveAs } from 'file-saver'
import { pdf } from '@react-pdf/renderer'
import Icon from './Icon';



interface downloadProps {
  component: any;
  className: string;
  iconVisible?: boolean;
}
const Download = ({component, className, iconVisible}: downloadProps) => {

   

  const handleDownload = async () => {
    const blob = await pdf(<PDFDocument component={component} />).toBlob()
    saveAs(blob, 'untitled.pdf')
  }

  return <button className={`${className} flex gap-2`} onClick={handleDownload}>
    <p>Download</p>
    {iconVisible && <Icon src='/document-copy.svg' />}
  </button>
}

export default Download