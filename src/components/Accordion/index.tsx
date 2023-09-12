import { useRef, useState, createElement, useEffect } from 'react';
import { Details, Summary } from './styles';
import { Expand, DeepDive } from './icons';
import { trackExpanderOpen } from '../../utils/track';
import {
  Expander,
  ExpanderItem,
  Flex,
  View,
  useTheme
} from '@aws-amplify/ui-react';

type AccordionProps = {
  title?: string;
  headingLevel?: string;
  eyebrow?: string;
};

export const CustomTitle = ({ eyebrow, anchor }) => {
  const { tokens } = useTheme();
  return (
    <Flex id="docs-expander__summary" className="docs-expander__summary">
      <div className="docs-expander__eyebrow">
        <DeepDive />
        {eyebrow}
      </div>
      {anchor}
      <div className="docs-expander__title__indicator"></div>
    </Flex>
  );
};

const Accordion: React.FC<AccordionProps> = ({
  title,
  headingLevel,
  eyebrow,
  children
}) => {
  const [closeButton, setCloseButton] = useState(true);
  const [initialHeight, setInitialHeight] = useState(0);
  const [expandedHeight, setExpandedHeight] = useState(0);
  const docsExpander = useRef<HTMLElement>(null);

  useEffect(() => {
    const expander = docsExpander.current;

    const initHeight =
      expander?.children['docs-expander__summary']?.offsetHeight;
    const expHeight = getHiddenHeight(expander);

    setInitialHeight(initHeight);
    setExpandedHeight(expHeight);

    // Current decision is to leave the footer close on all expanders
    // if (expandedHeight > window.innerHeight) {
    //   setCloseButton(true);
    // }
  }, [initialHeight, expandedHeight, closeButton]);

  function getHiddenHeight(el) {
    if (!el?.cloneNode) {
      return null;
    }

    const clone = el.cloneNode(true);
    clone.setAttribute('open', '');
    el.after(clone);
    const height = clone.offsetHeight;
    clone.remove();
    return height;
  }

  const headingId = title?.replace(/\s+/g, '-').toLowerCase();
  headingLevel = headingLevel ? 'h' + headingLevel : 'div';
  const expanderTitle = createElement(
    headingLevel,
    {
      id: headingId,
      className: 'docs-expander__title'
    },
    title
  );

  const anchor = createElement(
    'a',
    { href: window.location.pathname + '#' + headingId },
    expanderTitle
  );

  const collapse = [
    {
      maxHeight: expandedHeight + 'px'
    },
    { maxHeight: initialHeight + 'px' }
  ];

  const expand = [
    { maxHeight: initialHeight + 'px' },
    {
      maxHeight: expandedHeight + 'px'
    }
  ];

  const animationTiming = {
    duration: 700,
    iterations: 1
  };

  const setDataStateForAllChildren = function(e, el) {
    console.log(e, el);
    if (e) {
      e.preventDefault();
    }
    if (el.hasChildNodes) {
      // console.log('has child nodes');
      const childArray = Array.from(el.children);
      childArray.forEach((child) => {
        // console.log(child);
        if (child.getAttribute('data-state')) {
          child.setAttribute('data-state', 'closed');
          setDataStateForAllChildren(null, child);
        } else {
          return;
        }
        if (child.classList.contains('amplify-expander__content')) {
          child.setAttribute('hidden', '');
          child
            .getElementsByClassName('amplify-expander__content__text')[0]
            .setAttribute('display', 'none');
        }
        if (child.classList.contains('amplify-expander__trigger')) {
          child.setAttribute('aria-expanded', false);
        }
      });
    }
  };

  const closeAccordion = (e) => {
    e.preventDefault();
    const expander =
      e.target.parentElement.parentElement.parentElement.parentElement;

    expander.setAttribute('data-state', 'closed');
    setDataStateForAllChildren(e, expander);

    const scrollToLoc = expander.offsetTop - 48 - 70 - 10; // account for nav heights and 10px buffer

    // expander.animate(collapse, animationTiming);
    // window.scrollTo({
    //   left: 0,
    //   top: scrollToLoc,
    //   behavior: 'smooth'
    // });
    // }
  };

  const trackOpenClicks = (e) => {
    e.preventDefault();

    if (e.currentTarget.getAttribute('data-state') !== 'open') {
      trackExpanderOpen(anchor.props?.children.props.id);
    }
  };

  return (
    <Expander type="single" isCollapsible={true}>
      <ExpanderItem
        title={<CustomTitle eyebrow={eyebrow} anchor={anchor} />}
        value="item-2"
        onClick={trackOpenClicks}
      >
        <div id="docs-expander__body" className="docs-expander__body">
          {children}
        </div>
        {closeButton ? (
          <button
            id="docs-expander__body__button"
            className="docs-expander__body__button amplify-expander__trigger"
            onClick={closeAccordion}
          >
            <Expand />
          </button>
        ) : null}
      </ExpanderItem>
    </Expander>
  );
};

export default Accordion;
