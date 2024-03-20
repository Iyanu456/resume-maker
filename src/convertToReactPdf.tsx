import React, { ReactNode } from "react";
import { View, Text, Link, Svg, Line } from "@react-pdf/renderer"; // Import React components from your library

const htmlToReactPDFMapping: { [key: string]: React.ComponentType<any> } = {
  div: View,
  p: Text,
  a: Link,
  h1: Text,
  svg: Svg,
  line: Line,
  span: Text,
  //Document: Document,
  //Page: Page,
  // Add more mappings as needed
};

export const convertToReactPDFComponents = (element: any): ReactNode => {
  try {
    if (!element) {
      return null
      //throw new Error("Element is null or undefined.");
      
    }

    if (typeof element.type === "function") {
      // If the element is a functional component, create an element from it and convert the result
      const functionalElement = element.type(element.props);
      return convertToReactPDFComponents(functionalElement);
    }

    if (typeof element === "object") {
      const { type, props } = element;
      const Component = htmlToReactPDFMapping[type] || type;

      if (!Component) {
        //return null
        throw new Error(`No mapping found for component type: ${type}`);
      }

      const children =
        props.children !== null
          ? React.Children.map(props.children, convertToReactPDFComponents)
          : null;

      const styleProps = props.style ? { style: props.style } : {};
      const hrefProps = props.href ? { src: props.href } : {};

      // Extract additional attributes like height, width, and position
      const { height, width, x, y, ...otherProps } = props;
      const positionProps = { height, width, x, y };

      return (
        <Component {...styleProps} {...hrefProps} {...positionProps} {...otherProps}>
          {children}
        </Component>
      );
    }

    if (typeof element === "string" || typeof element === "number") {
      return element as ReactNode;
    }

    const children = React.Children.map(
      element,
      convertToReactPDFComponents
    );

    return <>{children}</>;
  } catch (error: any) {
    //console.error("Error in convertToReactPDFComponents:", error.message);
    return (/*<Text>Error in convertToReactPDFComponents</Text>;*/ null)
  }
};
