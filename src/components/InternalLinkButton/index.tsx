import { View } from '@aws-amplify/ui-react';
import InternalLink from '../InternalLink';

export default function InternalLinkButton({ href, children }) {
  return (
    <View as="div">
      <InternalLink href={href}>
        <a>{children}</a>
      </InternalLink>
    </View>
  );
}
