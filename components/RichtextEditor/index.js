/* eslint-disable react/no-danger */
import React, { forwardRef, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const RichtextEditor = forwardRef(({ value, onChange, onBlur }, ref) => {
  const config = React.useMemo(
    () => (
      {
        readonly: false,
        height: 400,
      },
      {
        ssr: false,
      }
    ),
    []
  );

  return (
    <div>
      <JoditEditor config={config} value={value} ref={ref} onChange={onChange} onBlur={onBlur} />
    </div>
  );
});

export default RichtextEditor;
