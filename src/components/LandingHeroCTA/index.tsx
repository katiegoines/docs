import InternalLink from '../InternalLink';
import InternalLinkButton from '../InternalLinkButton';
import * as img from '../../constants/img';
import { Flex } from '@aws-amplify/ui-react';

export default function LandingHeroCTA() {
  return (
    <Flex>
      <InternalLinkButton href="/start/?sc_icampaign=start&sc_ichannel=docs-home">
        <span>Get started for free</span>
      </InternalLinkButton>
      <Flex>
        <InternalLink href="/start/q/integration/react?sc_icampaign=react-start&sc_ichannel=docs-home">
          <img alt={img.REACT.alt} height={40} width={40} src={img.REACT.src} />
        </InternalLink>
        <InternalLink href="/start/q/integration/next?sc_icampaign=nextjs-start&sc_ichannel=docs-home">
          <img alt={img.NEXT.alt} height={40} width={40} src={img.NEXT.src} />
        </InternalLink>
        <InternalLink href="/start/q/integration/react-native?sc_icampaign=react-native-start&sc_ichannel=docs-home">
          <img
            alt={img.REACTNATIVE.alt}
            height={40}
            width={40}
            src={img.REACTNATIVE.src}
          />
        </InternalLink>
        <InternalLink href="/start/q/integration/vue?sc_icampaign=vue-start&sc_ichannel=docs-home">
          <img alt={img.VUE.alt} height={40} width={40} src={img.VUE.src} />
        </InternalLink>
        <InternalLink href="/start/q/integration/angular?sc_icampaign=js-start&sc_ichannel=docs-home">
          <img
            alt={img.ANGULAR.alt}
            height={40}
            width={40}
            src={img.ANGULAR.src}
          />
        </InternalLink>
        <InternalLink href="/start/q/integration/js?sc_icampaign=js-start&sc_ichannel=docs-home">
          <img alt={img.JS.alt} height={40} width={40} src={img.JS.src} />
        </InternalLink>
        <InternalLink href="/start/q/integration/ios?sc_icampaign=ios-start&sc_ichannel=docs-home">
          <img alt={img.IOS.alt} height={40} width={40} src={img.IOS.src} />
        </InternalLink>
        <InternalLink href="/start/q/integration/android?sc_icampaign=android-start&sc_ichannel=docs-home">
          <img
            alt={img.ANDROID.alt}
            height={40}
            width={40}
            src={img.ANDROID.src}
          />
        </InternalLink>
        <InternalLink href="/start/q/integration/flutter?sc_icampaign=flutter-start&sc_ichannel=docs-home">
          <img
            alt={img.FLUTTER.alt}
            height={40}
            width={40}
            src={img.FLUTTER.src}
          />
        </InternalLink>
      </Flex>
    </Flex>
  );
}
