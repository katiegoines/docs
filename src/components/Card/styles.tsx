import React from 'react';
import InternalLink from '../InternalLink';

import { MQFablet, MQDesktop } from '../media';
import { Image } from '@aws-amplify/ui-react';

type CardProps = {
  className?: string;
  href?: string;
  external?: boolean;
};

const docsCard: React.FC<CardProps> = ({
  children,
  className,
  href,
  external
}) => {
  const target = external ? '_blank' : undefined;
  if (!href) return <div className={className}>{children}</div>;
  return (
    <InternalLink href={href} passHref={true} legacyBehavior>
      <a target={target}>
        {external && (
          <Image src="/assets/external-link-black.svg" alt="External link" />
        )}
        <div className={className}>{children}</div>
      </a>
    </InternalLink>
  );
};
