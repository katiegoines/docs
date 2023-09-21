import {
  WebComponentProps,
  TableGenerator
} from '../../utils/ui-component-props.types';
import { Table, TableHead } from '@aws-amplify/ui-react';

/**
 * Both css and slots only document name and description, so we can share
 * the table generation logic here.
 */
const createBaseTable = (entries) => {
  if (!entries) return undefined;
  const rows = entries.map((entry, index) => {
    const name = entry.name;
    const description = entry.docs;
    if (!name || !description) return undefined;
    return (
      <tr key={index}>
        <td>
          <code>{name}</code>
        </td>
        <td>{description}</td>
      </tr>
    );
  });
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

/**
 * For attributes, we need to document more information than the base ones,
 * so we create multiple tables.
 */
const attrTableGenerator = (docs) => {
  let count = 0;
  const tables = docs?.props.map((prop) => {
    const groupId = `prop-${prop.attr || String(count)}`;
    if (!prop.attr) {
      count++;
    }

    return (
      <div key={groupId}>
        <Table>
          <thead>
            <tr>
              <th colSpan={2}>
                <TableHead>{prop.name}</TableHead>
              </th>
            </tr>
          </thead>
          <tbody>
            {prop.attr && (
              <tr>
                <th>Attribute</th>
                <td>{prop.attr}</td>
              </tr>
            )}
            <tr>
              <th>Description</th>
              <td>{prop.docs}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{prop.type}</td>
            </tr>
            {prop.default && (
              <tr>
                <th>Default</th>
                <td>{prop.default}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  });
  return tables;
};

const cssTableGenerator = (docs) => {
  return createBaseTable(docs.styles);
};

const slotsTableGenerator = (docs) => {
  return createBaseTable(docs.slots);
};

export const tableGeneratorMap: Record<WebComponentProps, TableGenerator> = {
  attr: attrTableGenerator,
  css: cssTableGenerator,
  slots: slotsTableGenerator
};
