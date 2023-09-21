import { Icon, View } from '@aws-amplify/ui-react';

export const ThumbsUpIcon = () => (
  <View as="span">
    <Icon
      ariaLabel="Thumbs up"
      pathData="M6 6.42c0-.27.06-.55.19-.79l1.64-3.28c.1-.21.32-.34.55-.34.34 0 .62.28.62.62v3.33h3.44a2 2 0 0 1 1.94 2.48l-1.01 4.05a2 2 0 0 1-1.94 1.52H6V6.42ZM6 14H2V7h4"
      viewBox={{
        minX: 0,
        minY: 0,
        width: 16,
        height: 16
      }}
      fill="none"
    />
  </View>
);
