import { Message } from '@aws-amplify/ui-react';

type CalloutProps = {
  info?: boolean;
  warning?: boolean;
};
const Callout: React.FC<CalloutProps> = ({ info, warning, children }) => {
  if (typeof warning === 'undefined') info = true;
  const colorTheme = warning ? 'warning' : 'info';

  return <Message colorTheme={colorTheme}>{children}</Message>;
};

export default Callout;
