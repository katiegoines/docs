import Container from '../Container';
import ExternalLink from '../ExternalLink';
import InternalLink from '../InternalLink';
import * as links from '../../constants/links';
import * as img from '../../constants/img';
import { forwardRef } from 'react';
import { Flex } from '@aws-amplify/ui-react';

// eslint-disable-next-line no-empty-pattern
const DocsFooter = forwardRef(function DocsFooter({}, ref) {
  return (
    <Container backgroundColor="color-ink-hv">
      <footer ref={ref}>
        <Flex>
          <img alt="" src={img.AMPLIFY.lightSrc} />
          <div>
            <h3>Amplify</h3>
            <InternalLink href="/start">Getting Started</InternalLink>
            <ExternalLink href={links.DISCORD}>Community Chat</ExternalLink>
            <InternalLink href="/contribute">Contribute</InternalLink>
          </div>
        </Flex>
        <Flex>
          <Flex>
            <ExternalLink anchorTitle="Twitter" href={links.TWITTER}>
              <img alt={img.TWITTER.alt} src={img.TWITTER.src} />
            </ExternalLink>
            <ExternalLink anchorTitle="Discord" href={links.DISCORD}>
              <img alt={img.DISCORD.alt} src={img.DISCORD.lightSrc} />
            </ExternalLink>
            <ExternalLink anchorTitle="GitHub" href={links.GITHUB}>
              <img alt={img.GITHUB.alt} src={img.GITHUB.lightSrc} />
            </ExternalLink>
          </Flex>
          <Flex>
            <span>
              <div>
                <p>
                  <img alt="" src={img.AWS.lightSrc} width="13" height="8" />
                  Amplify open source software, documentation and
                  <br /> community are supported by Amazon Web Services.
                </p>
                <p>
                  © {new Date().getFullYear()}, Amazon Web Services, Inc. and
                  its affiliates.
                </p>
                <p>
                  All rights reserved. View the{' '}
                  <ExternalLink href={links.TERMS}>site terms</ExternalLink> and{' '}
                  <ExternalLink href={links.PRIVACY}>
                    privacy policy
                  </ExternalLink>
                  .
                </p>
              </div>
              <div className="margin-top-md">
                Flutter and the related logo are trademarks of Google LLC. We
                are not endorsed by or affiliated with Google LLC.
              </div>
            </span>
          </Flex>
        </Flex>
      </footer>
    </Container>
  );
});

export default DocsFooter;
