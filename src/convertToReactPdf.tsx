import React, { ReactNode } from "react";
import { View, Text, Link, Svg, Line, Page } from "@react-pdf/renderer";

const htmlToReactPDFMapping: { [key: string]: React.ComponentType<any> } = {
  div: View,
  p: Text,
  a: Link,
  h1: Text,
  svg: Svg,
  line: Line,
  span: Text,
  strong: ({ children }: { children: ReactNode }) => (
    <Text style={{ fontWeight: 'bold' }}>{children}</Text>
  ),
  b: ({ children }: { children: ReactNode }) => (
    <Text style={{ fontWeight: 'bold' }}>{children}</Text>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <View style={{ flexDirection: 'column', marginTop: 8, fontSize: 11 }}>{children}</View>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <View style={{ flexDirection: 'row', marginTop: 5 }}>
      <Text style={{ fontSize: 11 }}>•</Text>
      <Text style={{ fontSize: 11 }}>{children}</Text>
    </View>
  ),
};

export const convertToReactPDFComponents = (element: any, styles?: React.CSSProperties): ReactNode => {
  try {
    if (!element) {
      return null;
    }

    if (typeof element.type === "function") {
      const functionalElement = element.type(element.props);
      return convertToReactPDFComponents(functionalElement);
    }

    if (typeof element === "object") {
      const { type, props } = element;
      const Component = props.className === "page" ? Page : (htmlToReactPDFMapping[type] || type);
      

      if (!Component) {
        throw new Error(`No mapping found for component type: ${type}`);
      }

      const children =
        props.children !== null
          ? React.Children.map(props.children, (child) => convertToReactPDFComponents(child, props.style))
          : null;

      const styleProps = props.style ? { style: props.style } : {};
      const hrefProps = props.href ? { src: props.href } : {};

      // Extract additional attributes like height, width, and position
      const { height, width, x, y, wrap, ...otherProps } = props;
      const positionProps = { height, width, x, y };

      // Conditionally add wrap attribute if wrap prop is true
      //props.className === "wrap" ? { wrap: wrap, ...otherProps } : (htmlToReactPDFMapping[type] || type);
      
      const componentProps = wrap ? { wrap, ...otherProps } : otherProps;

      return (
        <Component {...styleProps} {...hrefProps} {...positionProps} {...componentProps}>
          {children}
        </Component>
      );
    }

    if (typeof element === "string" || typeof element === "number") {
      return element as ReactNode;
    }

    const children = React.Children.map(
      element,
      (child) => convertToReactPDFComponents(child, styles)
    );

    return <>{children}</>;
  } catch (error: any) {
    console.error(`Error in convertToReactPDFComponents: ${error.message}`);
    console.log("Element causing error:", element);
    return null;
  }
};
