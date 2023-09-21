import { Icon, View } from '@aws-amplify/ui-react';

export const MenuIcon = ({ ariaLabel, onClick }) => (
  <View as="span">
    <Icon
      ariaLabel={ariaLabel}
      onClick={onClick}
      pathData="M15 8H1M15 3H1M15 13H1"
      stroke="currentColor"
      strokeWidth="2"
      viewBox={{
        minX: 0,
        minY: 0,
        width: 16,
        height: 16
      }}
    />
  </View>
);
