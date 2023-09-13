import Layout from '../components/Layout';
// import { Grid } from '@theme-ui/components';
import { useEffect, useRef, useState } from 'react';
import MetaContent from '../components/Page/metaContent';
import { Container } from '../components/Container';
import Card from '../components/Card';
import {
  filterOptionsByName,
  filterMetadataByOption
} from '../utils/filter-data';
import {
  getChapterDirectory,
  getProductDirectory,
  isProductRoot
} from '../utils/getLocalDirectory';

import { Image, Text, Heading, Grid } from '@aws-amplify/ui-react';

function ChooseFilterPage({
  directoryPath,
  address,
  filterKind,
  filters = [],
  currentFilter = 'all',
  message = ''
}) {
  // "url" cannot be a CFP prop for legacy reasons
  let url = address;
  const [_, setHref] = useState('https://docs.amplify.aws');
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    setHref(window.location.href);
  }, []);

  url = url.split('/q/')[0];

  let title = '',
    chapterTitle = '';
  if (isProductRoot(url)) {
    title = (getProductDirectory(url) as {
      productRoot: { title: string };
    }).productRoot.title;
  } else {
    const chapterDirectory = getChapterDirectory(url);
    if (typeof chapterDirectory !== 'undefined') {
      const { title: cTitle, items } = chapterDirectory as {
        title: string;
        items: { route: string; title: string }[];
      };
      chapterTitle = cTitle;
      for (const item of items) {
        if (item.route === url) title = item.title;
      }
    }
  }

  if (filters.length === 0) filters = filterOptionsByName[filterKind];

  const children = (
    <Container>
      <section>
        {message && <Heading level={3}>{message}</Heading>}

        <Grid templateColumns="1fr, null, null, 4fr" rowGap={3}>
          {filters.map((filter) => (
            <Card
              className="vertical"
              href={`${url}/q/${filterKind}/${filter}`}
              key={filter}
            >
              <Image
                alt={filterMetadataByOption[filter].label + ' icon'}
                src={filterMetadataByOption[filter].graphicURI}
              />
              <Text>
                <h4>{filterMetadataByOption[filter].label}</h4>
              </Text>
            </Card>
          ))}
        </Grid>
      </section>
    </Container>
  );
  return (
    <Layout
      meta={{
        title:
          chapterTitle === ''
            ? `${title} - Choose a platform`
            : `${chapterTitle} - ${title} - Choose a platform`,
        chapterTitle: '',
        description: `Selection page for ${title}`
      }}
      ref={footerRef}
    >
      <MetaContent
        title={title}
        chapterTitle={chapterTitle}
        headers={[]}
        children={children}
        filters={filters}
        filterKey={currentFilter}
        filterKind={filterKind}
        url={url}
        directoryPath={directoryPath}
        parentPageLastUpdatedDate=""
        footerRef={footerRef}
      />
    </Layout>
  );
}

ChooseFilterPage.getInitialProps = (initialProps) => {
  return initialProps.query;
};
export default ChooseFilterPage;
