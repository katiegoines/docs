import { Icon, View } from '@aws-amplify/ui-react';

export const CloseIcon = ({ onClick }) => (
  <View as="span">
    <Icon
      width="12px"
      height="12px"
      pathData="m2 2 12 12M14 2 2 14"
      ariaLabel="close"
      onClick={onClick}
      viewBox={{
        minX: 0,
        minY: 0,
        width: 16,
        height: 16
      }}
    />
  </View>
);
