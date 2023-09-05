import React from 'react';
import { ExternalLinkGraphic } from './styles';
import { trackExternalLink } from '../../utils/track';
import { ExternalLinkIcon } from '../Icons';
import { Link } from '@aws-amplify/ui-react';

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
  anchorTitle,
  icon
}) => {
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
      {graphic && (
        <ExternalLinkGraphic
          alt="External link"
          src={`/assets/external-link-${graphic}.svg`}
          width="8"
          height="8"
        />
      )}
      {icon && <ExternalLinkIcon />}
    </Link>
  );
};

export default ExternalLink;

function trackLink(href) {
  trackExternalLink(href);
}
