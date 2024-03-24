import { convertToReactPDFComponents } from "./convertToReactPdf";
import { Document, Page } from "@react-pdf/renderer";



interface docProps {
    component: any;
}

export const PDFDocument = ({ component }: docProps) => {

	const reactPDFComponent = convertToReactPDFComponents(component);

	return (
		<>
			{
				<Document>
					<Page style={{ padding: '30pt 40pt', fontSize: "11pt", flexDirection: 'column'}} wrap>{reactPDFComponent}</Page>

				</Document>
			}
		</>
	);
};
