import { useState, useEffect } from 'react';
import ensureMenuScrolledIntoView from '../../utils/ensure-menu-scrolled-into-view';
import { View } from '@aws-amplify/ui-react';

export default function SidebarLayoutToggle({ menuRef, children }) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView && menuRef.current) {
      menuRef.current.openMenu();
    }
    if (!inView && menuRef.current) {
      menuRef.current.closeMenu();
    }
  }, [inView, menuRef]);

  const toggleView = () => {
    if (inView) {
      setInView(false);
    } else {
      setInView(true);
    }
  };
  return (
    <View
      as="div"
      onClick={() => {
        toggleView();
        ensureMenuScrolledIntoView();
      }}
      inView={inView}
    >
      {children}
    </View>
  );
}
