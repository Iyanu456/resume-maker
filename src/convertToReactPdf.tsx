import React, { ReactNode } from "react";
import { View, Text, Link, Svg, Line, Image } from "@react-pdf/renderer"; // Import React components from your library


const htmlToReactPDFMapping: { [key: string]: React.ComponentType<any> } = {
  div: View,
  p: Text,
  a: ({ children, ...props }: { children: ReactNode }) => {

    return (
      <Link {...props} style={{color: 'rgb(15, 15, 15)', textDecoration: 'none'}}>
        {children}
      </Link>
    );
  },
  h1: Text,
  svg: Svg,
  line: Line,
  span: Text,
  img: Image,
  strong: ({ children }: { children: ReactNode }) => {
    //console.log("<ul>", children);
    return (
      <Text style={{fontWeight: 'semibold'}}>
        {children}
      </Text>
    );
  },
  b: ({ children }: { children: ReactNode }) => {
    //console.log("<ul>", children);
    return (
      <Text style={{fontWeight: 'bold'}}>
        {children}
      </Text>
    );
  },
  ul: ({ children }: { children: ReactNode }) => {
    //console.log("<ul>", children);
    return (
      <View style={{flexDirection: 'column', gap: '8pt', fontSize: '11pt', paddingLeft: '4pt'}}>
        {children}
      </View>
    );
  },
  li: ({ children }: { children: ReactNode }) => {
    console.log("<li>", children);
    const [content] = React.Children.toArray(children);
    return (
      <View style={{flexDirection: 'row', gap: '5pt'}}>
        <Text style={{fontSize: '11pt'}}>•</Text>
        <Text style={{fontSize: '11pt'}}>{content}</Text>
      </View>
        
     
    );
  },
  // Add more mappings as needed
};

export const convertToReactPDFComponents = (element: any): ReactNode => {
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
      const Component = htmlToReactPDFMapping[type] || type;

      if (!Component) {
        throw new Error(`No mapping found for component type: ${type}`);
      }

      const children =
        props.children !== null
          ? React.Children.map(props.children, convertToReactPDFComponents)
          : null;

      const styleProps = props.style ? { style: props.style } : {};
      const hrefProps = props.href ? { src: props.href } : {};
      const heightProps = props.height ? { src: props.height } : {};
      const widthProps = props.width ? { src: props.width } : {};

      // Extract additional attributes like height, width, and position
      const { height, width, x, y, ...otherProps } = props;
      const positionProps = { height, width, x, y };

      return (
        <Component {...styleProps} {...hrefProps} {...positionProps} {...heightProps} {...widthProps} {...otherProps}>
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
    console.error(`Error in convertToReactPDFComponents: ${error.message}`);
    console.log("Element causing error:", element);
    return null;
  }
};