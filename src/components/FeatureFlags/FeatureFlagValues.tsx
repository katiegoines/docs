import { View, Table, TableHead } from '@aws-amplify/ui-react';

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

export default function FeatureFlagValues({ values }) {
  return (
    <View as="div">
      <Table>
        <thead>
          <tr>
            <TableHead>Value</TableHead>
            <th>Description</th>
            <TableHead>
              Default for
              <br />
              existing projects
            </TableHead>
            <TableHead>
              Default for
              <br />
              new projects
            </TableHead>
          </tr>
        </thead>
        <tbody>
          {values.map((value) => {
            return (
              <tr>
                <td>
                  <code>{value.value}</code>
                </td>
                <TableHead>{value.description}</TableHead>
                <td>{value.defaultExistingProject ? '✅' : ''}</td>
                <td>{value.defaultNewProject ? '✅' : ''}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </View>
  );
}
