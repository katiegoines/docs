import {
  Collection,
  Card,
  Grid,
  Heading,
  Image,
  Text
} from '@aws-amplify/ui-react';
import InternalLink from '../InternalLink';

export default function FeaturesGrid() {
  return (
    <>
      <Heading level={4}>Explore Features</Heading>
      <Collection
        type="list"
        direction="row"
        gap="20px"
        wrap="nowrap"
        items={[
          {
            title: 'Authentication',
            text:
              'Enable sign-in, sign-up and sign-out within minutes with pre-built UI components and powerful authentication APIs',
            href: '/lib/auth/getting-started',
            src: '/assets/features/auth.svg',
            alt: ''
          },
          {
            title: 'Storage',
            text:
              'A simple mechanism for managing user content in public, protected or private storage',
            href: '/lib/storage/getting-started',
            src: '/assets/features/storage.svg',
            alt: ''
          },
          {
            title: 'GraphQL API',
            text:
              'Easy and secure solution to access your backend data with support for real-time updates using GraphQL',
            href: '/lib/graphqlapi/getting-started',
            src: '/assets/features/api.svg',
            alt: ''
          },
          {
            title: 'DataStore',
            text:
              'Seamlessly synchronize and persist online & offline data to the cloud as well as across devices',
            href: '/lib/datastore/getting-started',
            src: '/assets/features/datastore.svg',
            alt: ''
          }
        ]}
        gap="1.5rem"
      >
        {(item, index) => (
          <InternalLink href={item.href}>
            <Card
              key={index}
              borderRadius="medium"
              maxWidth="20rem"
              variation="outlined"
            >
              <Image src={item.src} alt={item.alt} />
              <Heading level={4}>{item.title}</Heading>
              <Text>{item.text}</Text>
            </Card>
          </InternalLink>
        )}
      </Collection>
    </>
  );
}
