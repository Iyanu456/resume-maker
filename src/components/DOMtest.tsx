import React, { useState  } from 'react';
import { Document, Page, View, Text, Link, PDFDownloadLink } from '@react-pdf/renderer';
import ReactDOMServer from 'react-dom/server';

const htmlToReactPDFMapping = {
  div: View,
  p: Text,
  a: Link,
  // Add more mappings as needed
};

const convertToReactPDFComponents = (element) => {
  try {
    if (!element) {
      throw new Error('Element is null or undefined.');
    }

    if (typeof element === 'object') {
      const { type, props } = element;
      const Component = htmlToReactPDFMapping[type] || type;

      if (!Component) {
        throw new Error(`No mapping found for component type: ${type}`);
      }

      const children =
        props.children !== null
          ? React.Children.map(props.children, convertToReactPDFComponents)
          : null;

      const styleProps = props.style ? { style: props.style } : {};
      const hrefProps = props.href ? { src: props.href } : {} ;

      return <Component {...styleProps} {...hrefProps}>{children}</Component>;
    }

    if (typeof element === 'string' || typeof element === 'number') {
      //const textProps = {
        //style: {
          //...element.props?.style,
        //},
      //};

      return (element)
    }

    const children = React.Children.map(element, convertToReactPDFComponents);

    return <>{children}</>;
  } catch (error) {
    console.error('Error in convertToReactPDFComponents:', error.message);
    return <Text>Error in convertToReactPDFComponents</Text>;
  }
};

const data = ['Item 1', 'Item 2', 'Item 3'];


const styles = {
  firstName: {
    fontSize: '23pt',
    fontFamily: 'Poppins',
    margin: 'auto',
    fontWeight: 'semibold',
    }
}

function DomTest() {
	const [name, setName] = useState("")

	const JsxComponent = (
		<div>
			<p style={styles.firstName}>{name}</p>
			<div style={{ display: 'flex', flexDirection: 'row', gap: '30pt' }}>
				<p>oyerindei13@gmail.com</p>
				<p>iyanu.vercel.app</p>
			</div>
			<a href="https://iyanu.vercel.app">My website</a>
			<div>{data.map((item, index) => <p style={{color: "green"}}  key={index}>{item}</p>)}</div>
		</div>);

	const jsxComponent = JsxComponent
	//const reactPDFComponent = convertToReactPDFComponents(jsxComponent);
	
	//const MyDocument = () => (
	//	<Document>
	//		<Page>{reactPDFComponent}</Page>
	//	</Document>);

	/*const TextViewer = () => {
		const rawTextRepresentation = ReactDOMServer.renderToString(reactPDFComponent);
		return <div>{rawTextRepresentation}</div>;
	};*/


  return (
    <>
      {/*<PDFDownloadLink document={<MyDocument />}>Download</PDFDownloadLink>*/}
      
      {/*<TextViewer />*/}
      	<div style={{ width: '595px', height: '842px', border: '1px solid black', lineHeight: '1pt'}}>
      		{JsxComponent}
		<input value={name} onInput={e => setName(e.target.value)} />
	</div>
    </>
  );
}

export default DomTest;

