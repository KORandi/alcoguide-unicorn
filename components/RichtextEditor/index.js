/* eslint-disable react/no-danger */
import React, { forwardRef } from 'react';
import dynamic from 'next/dynamic';
import propTypes from 'prop-types';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const RichtextEditor = forwardRef(({ value, onChange, onBlur }, ref) => {
  const config = React.useMemo(
    () => ({
      readonly: false,
      height: 400,
    }),
    []
  );

  return (
    <div>
      <JoditEditor config={config} value={value} ref={ref} onChange={onChange} onBlur={onBlur} />
    </div>
  );
});

RichtextEditor.propTypes = {
  value: propTypes.string,
  onChange: propTypes.func,
  onBlur: propTypes.func,
};

RichtextEditor.defaultProps = {
  value: '',
  onChange: () => {},
  onBlur: () => {},
};

export default RichtextEditor;
