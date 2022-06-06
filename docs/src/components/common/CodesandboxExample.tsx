import React from 'react';

type CodesandboxExampleProps = {
  baseURL: string;
};
export function CodesandboxExample({ baseURL }: CodesandboxExampleProps) {
  return (
    <iframe
      src={`${baseURL}?expanddevtools=1&fontsize=14&moduleview=1&theme=dark&view=editor`}
      style={{
        width: '100%',
        height: '500px',
        border: 0,
        borderRadius: '4px',
        overflow: 'hidden',
      }}
      title="json"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
  );
}
