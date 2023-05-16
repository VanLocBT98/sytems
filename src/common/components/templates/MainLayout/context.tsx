import React, {
  createContext, useMemo, useState
} from 'react';

export interface LayoutContextResponse {
  collapsed: boolean;
  setCollapsed?: () => void;
  title: string;
  setTitle?: (value: string) => void;
}

export const LayoutContext = createContext<LayoutContextResponse>({
  collapsed: false,
  title: ''
});

interface LayoutProviderProps {
  children: React.ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [collapsed, setIsCollapsed] = useState(false);
  const [title, setTitle] = useState('');
  const context: LayoutContextResponse = useMemo(() => ({
    collapsed,
    setCollapsed: () => setIsCollapsed(!collapsed),
    title,
    setTitle: (value: string) => setTitle(value),
  }), [collapsed, title]);

  return (
    <LayoutContext.Provider value={context}>
      {children}
    </LayoutContext.Provider>
  );
};
