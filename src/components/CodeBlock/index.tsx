import React from 'react';
import copy from 'copy-to-clipboard';
import { trackCopyClicks } from '../../utils/track';
import { Flex, Button, View } from '@aws-amplify/ui-react';

const COPY = 'copy';
const COPIED = 'copied';
const FAILED = 'failed to copy';
const CONSOLE = 'console';

type CopyMessageType = typeof COPY | typeof COPIED | typeof FAILED;

type CodeBlockProps = {
  lineCount: string;
  language: string;
  children: React.ReactElement[];
};

type CodeBlockState = {
  copyMessage: CopyMessageType;
};

class CodeBlock extends React.Component<CodeBlockProps, CodeBlockState> {
  element?: HTMLDivElement;

  constructor(props) {
    super(props);
    this.state = { copyMessage: COPY };
  }

  lineNumbers = () => {
    const lineCount = parseInt(this.props.lineCount);
    if (lineCount > 1 && this.props.language !== CONSOLE) {
      return (
        <View>
          <div>
            {new Array(lineCount).fill(null).map((_, i) => (
              <span key={String(i + 1)}>{String(i + 1)}</span>
            ))}
          </div>
        </View>
      );
    }
  };

  setElement = (ref: HTMLDivElement | undefined) => {
    if (ref !== null) {
      this.element = ref;
    }
  };

  copyToClipboard = () => {
    if (this.element && this.element.textContent) {
      if (
        this.element?.firstElementChild?.classList.contains(
          'highlight-source-diff'
        )
      ) {
        const textContent = this.element.textContent;
        let copyLines = textContent.split('\n');
        let copyText = copyLines
          .filter((line) => {
            return !line.startsWith('-');
          })
          .map((line) => {
            if (line.startsWith('+')) {
              return line.replace('+', ' ');
            } else {
              return line;
            }
          })
          .join('\n');

        copy(copyText);
        trackCopyClicks(copyText);
      } else {
        copy(this.element.textContent);
        trackCopyClicks(this.element.textContent);
      }
      this.setState({ copyMessage: COPIED });
    } else {
      this.setState({ copyMessage: FAILED });
    }
    setTimeout(() => {
      this.setState({ copyMessage: COPY });
    }, 1500);
  };

  copyButton = () => {
    if (this.props.language !== CONSOLE) {
      return (
        <Button onClick={this.copyToClipboard}>
          <span>{this.state.copyMessage}</span>
        </Button>
      );
    }
  };

  render() {
    if (this.props.children === undefined) return <div></div>;
    const oneLine =
      this.props.lineCount === '1' || this.props.language === CONSOLE;

    return (
      <Flex>
        {this.lineNumbers()}
        <div ref={this.setElement}>{this.props.children}</div>
        {this.copyButton()}
      </Flex>
    );
  }
}

export default CodeBlock;
