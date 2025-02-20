import { SwitchTransition, Transition } from 'react-transition-group';
import { useLocation } from 'react-router';

const TransitionComponent = ({ children }) => {
    const location = useLocation();
    return (
        <SwitchTransition>
            <Transition
                key={location.pathname}
                timeout={500}
                nodeRef={children}
            >
                {children}
            </Transition>
        </SwitchTransition>
    );
};

export default TransitionComponent;
