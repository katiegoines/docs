import React from 'react';
import { trackExternalLink } from '../../utils/track';
import { Link, Image } from '@aws-amplify/ui-react';

type ExternalLinkProps = {
  graphic?: string;
  href: string;
  anchorTitle?: string;
  icon?: boolean;
};

const ExternalLink: React.FC<ExternalLinkProps> = ({
  children,
  graphic,
  href,
  anchorTitle
}) => {
  const iconColor = graphic ? graphic : 'black';

  return (
    <Link
      href={href}
      title={anchorTitle}
      isExternal={true}
      onClick={() => {
        trackLink(href);
      }}
    >
      {children}
      <Image
        alt="External link"
        src={`/assets/external-link-${iconColor}.svg`}
        width="8px"
        height="8px"
        marginLeft="4px"
      />
    </Link>
  );
};

export default ExternalLink;

function trackLink(href) {
  trackExternalLink(href);
}
