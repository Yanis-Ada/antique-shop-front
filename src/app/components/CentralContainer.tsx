import React from 'react';

interface CentralContainerProps {
  children: React.ReactNode;
}

export default function CentralContainer({ children }: CentralContainerProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      width: '100%',
    }}>
      {children}
    </div>
  );
}