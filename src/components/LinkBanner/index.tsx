import Container from '../Container';
import ExternalLink from '../ExternalLink';
import * as links from '../../constants/links';
import * as img from '../../constants/img';
import { Image, Flex } from '@aws-amplify/ui-react';

export default function LinkBanner() {
  return (
    <Container backgroundColor="color-ink-md">
      <Flex>
        <ExternalLink href={links.GITHUB} graphic="black">
          <Image alt="" src={img.GITHUB.darkSrc} />
          Amplify GitHub
        </ExternalLink>
      </Flex>
      <Flex>
        <ExternalLink href={links.DISCORD} graphic="black">
          <Image alt="" src={img.DISCORD.blueSrc} />
          Amplify on Discord
        </ExternalLink>
      </Flex>
      <Flex>
        <ExternalLink href={links.MARKETING} graphic="black">
          <Image alt="" src={img.AWS.darkSrc} />
          Amplify Resources
        </ExternalLink>
      </Flex>
      <Flex>
        <ExternalLink href={links.LEARN} graphic="black">
          <Image alt="" src={img.AMPLIFY.darkSrc} />
          Amplify Learn
        </ExternalLink>
      </Flex>
    </Container>
  );
}
