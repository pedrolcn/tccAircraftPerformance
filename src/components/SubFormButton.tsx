import * as React from 'react';
import { ButtonProps } from 'reactstrap';

export interface SubformButtonProps extends React.HTMLProps<HTMLDivElement> {
  isOpen: boolean;
}

const SubformButton: React.StatelessComponent<SubformButtonProps> = (props) => {
  const { isOpen, children, ...otherProps } = props;

  return (
    <div className={`subform-button${isOpen ? ' active' : ''}`} {...otherProps} >
    {children}
    <span className={ isOpen ? 'caret-up' :'caret-down'} style={{ marginLeft: 'auto' }}></span>
    </div>
  );
};

export default SubformButton;
