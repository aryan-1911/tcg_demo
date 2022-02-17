import { findParent } from 'helpers';
import React, { useCallback, useEffect, useState } from 'react';

interface IProps {
  breakpoint: number;
  asideClassName: string;
}

export const useAsideMenu = (props: IProps) => {
  const { breakpoint, asideClassName } = props;

  const [isOpen, toggle] = useState(window.innerWidth < breakpoint);
  const handleClick = useCallback(
    (e: MouseEvent) => {
      const isAside = findParent(e.target, asideClassName);

      if (window.innerWidth <= breakpoint && !isOpen && !isAside) {
        toggle(true);
      }
    },
    [toggle, isOpen],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('nav-close');
    } else {
      document.body.classList.remove('nav-close');
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isOpen]);

  return { isOpen, toggle };
};
