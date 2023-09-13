import React, { useEffect } from 'react';
import { useCodeBlockContext } from '../CodeBlockProvider';
import { Tabs, TabItem, Button } from '@aws-amplify/ui-react';

type ContextType = {
  tabOrder: string[];
  setActiveTab: (_1: any, _2?: any) => void;
  setFromLocalStorage: () => void;
};

type SwitcherButtonProps = {
  name: string;
  isActive: boolean;
  ctx: ContextType;
};

const SwitcherButton: React.FC<SwitcherButtonProps> = ({
  name,
  isActive,
  ctx
}) => (
  // eslint-disable-next-line react/jsx-no-bind
  <Button
    active={isActive}
    className={isActive ? 'tab-active' : null}
    onClick={() => ctx.setActiveTab(name)}
  >
    {name}
  </Button>
);

const getActiveIndex = function(
  children: React.ReactElement[],
  tabOrder: string[]
) {
  // The index we want to be active is the first one in priority order (`ctx.tabOrder`)
  // that is also one of the options (i.e., in `children`).
  const nameToIndexMap = {};
  children.forEach((node, index) => {
    nameToIndexMap[node.props.name] = index;
  });
  for (const tabName of tabOrder) {
    if (tabName in nameToIndexMap) {
      return nameToIndexMap[tabName];
    }
  }
};

export default function BlockSwitcher({ children }) {
  // a single child is not passed as an array
  if (!Array.isArray(children)) {
    children = [children];
  }
  const ctx = useCodeBlockContext();
  useEffect(() => {
    // If we haven't seen these tab names before, just add the first one as top priority.
    if (!ctx.tabOrder.includes(children[0].props.name)) {
      ctx.setActiveTab(children[0].props.name, false);
    }

    ctx.setFromLocalStorage();
  }, []);
  const activeIndex = getActiveIndex(children, ctx.tabOrder);

  return (
    <Tabs>
      {children?.map((node, index) => {
        return (
          <TabItem
            title={node.props.name}
            key={index}
            ctx={ctx}
            {...node.props}
          />
        );
      })}
    </Tabs>
  );
}
