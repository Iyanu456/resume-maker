import React, { ReactNode } from "react";
import { View, Text, Link, Svg, Path, Line, Image } from "@react-pdf/renderer"; // Import React components from your library

const htmlToReactPDFMapping: { [key: string]: React.ComponentType<any> } = {
  div: View,
  p: Text,
  a: ({ children, ...props }: { children: ReactNode }) => (
    <Link {...props} style={{ color: 'rgb(15, 15, 15)', textDecoration: 'none' }}>
      {children}
    </Link>
  ),
  h1: Text,
  svg: Svg,
  path: Path,
  line: Line,
  span: Text,
  img: Image,
  strong: ({ children }: { children: ReactNode }) => (
    <Text style={{ fontWeight: 'semibold' }}>
      {children}
    </Text>
  ),
  b: ({ children }: { children: ReactNode }) => (
    <Text style={{ fontWeight: 'bold' }}>
      {children}
    </Text>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <View style={{ flexDirection: 'column', gap: '8pt', fontSize: '11pt', paddingLeft: '4pt' }}>
      {children}
    </View>
  ),
  li: ({ children }: { children: ReactNode }) => {
    const [content] = React.Children.toArray(children);
    return (
      <View style={{ flexDirection: 'row', gap: '5pt' }}>
        <Text style={{ fontSize: '11pt' }}>•</Text>
        <Text style={{ fontSize: '11pt' }}>{content}</Text>
      </View>
    );
  },
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

      // Check if it's an SVG with path children
      if (type === 'svg' && React.Children.toArray(children).some(child => (child as any).type === 'path')) {
        const paths = React.Children.toArray(children).filter(child => (child as any).type === 'path');
        return (
          <Svg  style={{marginTop: "-1pt"}} {...hrefProps} {...positionProps} {...heightProps} {...widthProps} {...otherProps}>
            {paths.map((path, index) => (
              <Path key={index} d={(path as any).props?.children}>{children}</Path>
            ))}
          </Svg>
        );
      }

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
