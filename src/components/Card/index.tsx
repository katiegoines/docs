import InternalLink from '../InternalLink';
import { Image, Link } from '@aws-amplify/ui-react';

type CardProps = {
  className?: string;
  href?: string;
  external?: boolean;
};

const Card: React.FC<CardProps> = ({ children, className, href, external }) => {
  if (!href) return <div className={className}>{children}</div>;
  return (
    <InternalLink href={href}>
      <Link>
        {external && (
          <Image
            alt="External link"
            src={`/assets/external-link-black.svg`}
            width="8px"
            height="8px"
            marginLeft="4px"
          />
        )}
        <div className={className}>{children}</div>
      </Link>
    </InternalLink>
  );
};

export default Card;
