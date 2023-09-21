import { View } from '@aws-amplify/ui-react';
import ExternalLink from '../ExternalLink';

export default function ExternalLinkButton({ href, children }) {
  return (
    <View as="div">
      <ExternalLink href={href}>
        <a>{children}</a>
      </ExternalLink>
    </View>
  );
}
