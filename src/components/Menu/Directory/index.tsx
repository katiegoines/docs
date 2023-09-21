import React from 'react';
import { getProductDirectory } from '../../../utils/getLocalDirectory';
import InternalLink from '../../InternalLink';

import type { DirectoryItem } from '../../../directory/directory';
import { Button, Icon, Flex, View } from '@aws-amplify/ui-react';


export type DirectoryGroupProps = {
  title: string;
  items: DirectoryItem[];
  url: string;
  filterKey: string;
};

export type DirectoryGroupState = {
  isExpanded: boolean;
};

class DirectoryGroup extends React.Component<
  DirectoryGroupProps,
  DirectoryGroupState
> {
  itemsToDisplay: DirectoryItem[] = [];
  currentRoute = '';

  shouldDisplay = ({ filters }): boolean => {
    return (
      // the filter key is undefined
      this.props.filterKey === undefined ||
      // href doesn't have any q/[filter]/[filter]; via ChooseFilterPage
      this.props.filterKey === 'all' ||
      // this page is available independent of filter
      filters === undefined ||
      filters.length === 0 ||
      // this page is available in specific filtered versions (one of which is the globally-selected)
      (filters && filters.includes(this.props.filterKey))
    );
  };

  constructor(props) {
    super(props);
    this.initialize();

    if (
      this.props.items &&
      this.props.items.some(({ route }) => this.currentRoute.startsWith(route))
    ) {
      this.state = { isExpanded: true };
    } else {
      this.state = { isExpanded: this.props.url.startsWith('/start') };
    }
  }

  initialize = () => {
    this.itemsToDisplay = this.props.items.filter(this.shouldDisplay);
    this.currentRoute = this.props.url.split('/q/').shift() as string;
  };

  toggleOpen = () => {
    this.setState(({ isExpanded }) => {
      return { isExpanded: !isExpanded };
    });
  };

  render() {
    this.initialize();
    if (this.itemsToDisplay.length === 0) {
      return <></>;
    }

    return (
      <div>
        <Button onClick={this.toggleOpen}>
          <h4>{this.props.title}</h4>
          <Icon isUp={this.state.isExpanded} />
        </Button>
        {this.state.isExpanded && (
          <Flex direction="column">
            {this.itemsToDisplay.map((item) => (
              <View
                isActive={this.currentRoute === item.route}
                key={item.title}
              >
                <InternalLink href={`${item.route}`}>
                  {item.isCodeTitle ? (
                    <a>
                      <code>{item.title}</code>
                    </a>
                  ) : (
                    item.title
                  )}
                </InternalLink>
                <br />
              </View>
            ))}
          </Flex>
        )}
      </div>
    );
  }
}

type DirectoryProps = {
  url: string;
  filterKey: string;
};

export default class Directory extends React.Component<DirectoryProps> {
  render() {
    const directory = getProductDirectory(this.props.url) as {
      productRoot: { title: string; route: string };
      items: { title: string; items: DirectoryItem[] }[];
    };
    const productRoot = directory.productRoot;

    return (
      <div>
        <InternalLink href={productRoot.route}>
          <a
            isActive={this.props.url.split('/q')[0] === productRoot.route}
          >
            {productRoot.title}
          </a>
        </InternalLink>
        {Object.entries(directory.items).map((folderName) => (
          <DirectoryGroup
            title={folderName[1].title}
            items={folderName[1].items}
            url={this.props.url}
            filterKey={this.props.filterKey}
            key={folderName[1].title}
          />
        ))}
      </div>
    );
  }
}
