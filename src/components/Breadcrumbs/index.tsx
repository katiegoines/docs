import Link from 'next/link';
import {
  filterMetadataByOption,
  filterOptionsByName
} from '../../utils/filter-data';
import React from 'react';
import { Breadcrumbs, SelectField } from '@aws-amplify/ui-react';

type FilterSelectProps = {
  filters: string[];
  filterKey: string;
  filterKind: string;
  url: string;
};

type FilterSelectState = {
  isOpen: boolean;
};

const getFirstPathSegment = (path: string): string | undefined => {
  return path.split('/').filter((x) => !!x)[0];
};

const multiLibVersionPlatforms = ['ios'];

const convertToRouteHerf = (
  filter: FilterSelectProps,
  targetFilterKey: string
) => {
  let url = filter.url.startsWith('/') ? `file://${filter.url}` : filter.url;
  if (url.includes('?')) url = url.slice(0, url.indexOf('?'));
  if (url.includes('#')) url = url.slice(0, url.indexOf('#'));

  let path = new URL(url).pathname;

  const queryIndex = path.lastIndexOf('/q/');
  if (queryIndex >= 0) {
    path =
      path.substring(0, queryIndex) +
      `/q/${filter.filterKind}/${targetFilterKey}`;
  }
  return path;
};

export default class DocsBreadcrumbs extends React.Component<
  FilterSelectProps,
  FilterSelectState
> {
  wrapperRef: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();

    this.state = { isOpen: false };
  }

  toggleVis = () => {
    this.setState((oldState) => {
      return { isOpen: !oldState.isOpen };
    });
  };

  renderFilter = (name) => {
    if (name === this.props.filterKey) return;

    let href: object | string = convertToRouteHerf(this.props, name);
    if (!this.props.url.includes('/q/')) {
      href = this.props.url + `/q/${this.props.filterKind}/${name}`;
    }

    return (
      <Link href={href} key={name} legacyBehavior>
        <a onClick={this.toggleVis} className="filter-row">
          <img
            alt=""
            src={filterMetadataByOption[name]?.graphicURI}
            height="28px"
            width="28px"
          />
          <span>{filterMetadataByOption[name]?.label}</span>
        </a>
      </Link>
    );
  };

  renderUnsupportedFilter = (name) => {
    if (name === this.props.filterKey) return;

    let href: object | string = convertToRouteHerf(this.props, name);
    if (!this.props.url.includes('/q/')) {
      href = this.props.url + `/q/${this.props.filterKind}/${name}`;
    }

    return (
      <div className="filter-row">
        <img
          alt=""
          src={filterMetadataByOption[name]?.graphicURI}
          height="28px"
          width="28px"
        />
        <span>{filterMetadataByOption[name]?.label}</span>
      </div>
    );
  };

  render() {
    let allFilters = this.props.filters.slice();

    const filterName = function(filter) {
      let filterName = '';
      switch (filter) {
        case 'js':
          filterName = 'JavaScript';
          break;
        case 'react-native':
          filterName = 'React Native';
          break;
        case 'android':
          filterName = 'Android';
          break;
        case 'ios':
          filterName = 'Swift';
          break;
        case 'flutter':
          filterName = 'Flutter';
          break;
        default:
          break;
      }
      return filterName;
    };

    if (this.props.filterKind in filterOptionsByName) {
      allFilters = filterOptionsByName[this.props.filterKind];
    }
    const unsupportedFilters = [{}];
    const selectedFilter = {
      filter: this.props.filterKey,
      filterName: filterName(this.props.filterKey)
    };
    const supportedFilters = [{}];

    for (const filter of allFilters) {
      if (!this.props.filters.includes(filter)) {
        let shouldAdd = true;

        // special cases
        if (this.props.url.startsWith('/sdk')) {
          shouldAdd = filter !== 'flutter' && filter !== 'js';
        }

        if (shouldAdd) {
          unsupportedFilters.push({
            filter: filter,
            filterName: filterName(filter)
          });
        }
      } else if (
        this.props.filters.includes(filter) &&
        filter !== this.props.filterKey
      ) {
        supportedFilters.push({
          filter: filter,
          filterName: filterName(filter)
        });
      }
    }

    const crumbs = this.props.url.split('/');
    crumbs.splice(crumbs.indexOf('lib') - 1, 2);
    crumbs.splice(crumbs.indexOf('q'));

    return (
      <Breadcrumbs.Container>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
          <Breadcrumbs.Separator />
        </Breadcrumbs.Item>
        {this.props.filters.length != 0 && (
          <Breadcrumbs.Item>
            <SelectField
              label="branch"
              labelHidden
              variation="quiet"
              size="small"
              onChange={(e) => (window.location.href = e.target.value)}
            >
              <option
                key={selectedFilter.filter}
                value={`/lib/q/platform/${selectedFilter}/`}
              >
                {selectedFilter.filterName}
              </option>
              {supportedFilters.map((filter) => (
                <option
                  key={filter.filter}
                  value={`/lib/q/platform/${filter.filter}/`}
                >
                  {filter.filterName}
                </option>
              ))}
              {unsupportedFilters.map((filter) => (
                <option key={filter.filter} value={filter.filter} disabled>
                  {filter.filterName}
                </option>
              ))}
            </SelectField>
            <Breadcrumbs.Separator />
          </Breadcrumbs.Item>
        )}
        {crumbs.map((el) => (
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href={this.props.url}>{el}</Breadcrumbs.Link>
            <Breadcrumbs.Separator />
          </Breadcrumbs.Item>
        ))}
      </Breadcrumbs.Container>
    );
  }
}
