import React from 'react';
interface PropsType {
  style?: any;
  className?: string;
  onClick?: any;
  type: string;
}

const IconFont: React.FC<PropsType> = ({ style, type, className, onClick }) => (
  <span
    style={style}
    className={`iconfont ${type} ${className ? className : ''}`}
    onClick={() => {
      onClick && onClick();
    }}
  />
);

export default IconFont;
