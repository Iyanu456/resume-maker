import React from "react";



interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
	style?: React.CSSProperties;
  className?: string;
  wrap?: boolean;
}

const Div: React.FC<DivProps> = ({ children, style, className, wrap }) => {
	const divStyle: React.CSSProperties = {
		display: "grid",
		...style, // Merging passed style with default style
	};

  let myAttr = {'wrap': wrap}

	return <div {...myAttr} className={className} style={divStyle}>{children}</div>;
};


interface H1Props {
    children: React.ReactNode;
    style?: React.CSSProperties;
  }
  
  const H1: React.FC<H1Props> = ({ children, style }) => {
    const h1Style: React.CSSProperties = {
      fontSize: "26.8pt",
      fontWeight: "400",
      //wordWrap: 'normal',
      maxWidth: "100%",
      //wordBreak: 'break-word',
      ...style // Merging passed style with default style
    };
  
    return <h1 style={h1Style}>{children}</h1>;
  };
  
  export {Div, H1};
  