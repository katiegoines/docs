import { View } from '@aws-amplify/ui-react';

type ContainerProps = {
  backgroundColor?: string;
};

const Container = ({
  children,
  backgroundColor
}: {
  children: any;
  backgroundColor?: string;
}) => (
  <View as="div" backgroundColor={backgroundColor || 'white'}>
    <View as="div" backgroundColor={backgroundColor || 'white'}>
      {children}
    </View>
  </View>
);

export default Container;
