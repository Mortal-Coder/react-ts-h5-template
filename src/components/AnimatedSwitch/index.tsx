import { White } from '@/typings';
import { cloneElement, FC, memo, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './index.less';

const AnimatedSwitch: FC<White.AnimatedSwitchProps> = ({
  children,
  classNames,
  primaryKey,
  timeout = 200,
  ...other
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <TransitionGroup
      childFactory={(child) =>
        cloneElement(child, { classNames } as React.ComponentProps<
          typeof CSSTransition
        >)
      }>
      <CSSTransition
        key={primaryKey}
        timeout={timeout}
        classNames={classNames}
        appear
        mountOnEnter
        unmountOnExit={false}
        nodeRef={nodeRef}
        {...other}>
        <div ref={nodeRef}>{children}</div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default memo(AnimatedSwitch);
