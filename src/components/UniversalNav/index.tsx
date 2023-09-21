import { Header, NavContent, SearchContainer } from './styles';
import Container from '../Container';
import SearchBar from '../SearchBar';
import React from 'react';
import { Heading, View } from '@aws-amplify/ui-react';

export default function UniversalNav({ blend }) {
  const backgroundColor = blend ? '' : 'color-orange-hv';
  return (
    <Heading>
      <Container backgroundColor={backgroundColor}>
        <View as="div">
          <View as="div">
            <SearchBar />
          </View>
        </View>
      </Container>
    </Heading>
  );
}
