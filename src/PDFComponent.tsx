import ReactDOMServer from 'react-dom/server';
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
//import './Atpp.css';

function App2() {
  const pdfJSX = () => {
    return (
      <>
        <h1>JSX to PDF Convert Example</h1>
        <h2>Hello React</h2> 
      </>
    )
  }

  const printHandler = () => {
    const printElement = ReactDOMServer.renderToString(pdfJSX());
    // const printElement = pdfJSX();

    html2pdf().from(printElement).save();
  }

  return (
    <div className="App">
      <button onClick={printHandler}>Print</button>
    </div>
  );
}

export default App2;