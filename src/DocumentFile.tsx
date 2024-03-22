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
					<Page wrap>{reactPDFComponent}</Page>
				</Document>
			}
		</>
	);
};
