// eslint-disable-next-line @typescript-eslint/no-var-requires
import getElementTop from '../../utils/get-element-top';
import FeatureFlagValues from './FeatureFlagValues';
import InternalLink from '../InternalLink';
import { Table, TableRow, View } from '@aws-amplify/ui-react';

export type FeatureFlags = Record<string, Section>;

export type Section = {
  description: string;
  features: Record<string, FeatureFlag>;
};

export type FeatureFlag = {
  description: string;
  type: 'Feature' | 'Release' | 'Experimental';
  valueType: 'Boolean' | 'Number' | 'String';
  versionAdded: string;
  versionDeprecated?: string;
  deprecationDate?: string;
  versionRemoved?: string;
  removalDate?: string;
  values: Value[];
};

export type Value = {
  value: string;
  description: string;
  defaultNewProject: boolean;
  defaultExistingProject: boolean;
};

export default function FeatureFlagSummary({ name, feature }) {
  return (
    <div>
      <InternalLink href={'#' + name}>
        <a
          onClick={() => {
            setTimeout(scroll.bind(undefined, name), 50);
            return false;
          }}
        >
          <h3 id={name}>{name}</h3>
        </a>
      </InternalLink>

      {feature.description ? <p>{feature.description}</p> : undefined}
      <View as="div">
        <Table>
          <thead>
            <TableRow>
              <th>Type</th>
              <th>Added</th>
              <th>Deprecation date</th>
              <th>Deprecated</th>
              <th>Removal date</th>
              <th>Removed</th>
            </TableRow>
          </thead>
          <tbody>
            <tr>
              <td>{feature.type}</td>
              <td>{feature.versionAdded}</td>
              <td>{feature.deprecationDate}</td>
              <td>{feature.versionDeprecated}</td>
              <td>{feature.removalDate}</td>
              <td>{feature.versionRemoved}</td>
            </tr>
          </tbody>
        </Table>
      </View>

      <FeatureFlagValues values={feature.values} />
    </div>
  );
}

const stickyHeaderHeight = 54;
function scroll(hash) {
  const header = document.querySelector(`[id="${hash}"]`);
  const top = getElementTop(header, stickyHeaderHeight);
  if (top !== window.scrollY) {
    window.scrollTo({ top });
  }
}
