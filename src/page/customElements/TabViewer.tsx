import React, { ReactNode } from 'react'

import './TabViewer.scss'

export interface ITabProps { label: string }

const Tab = (props: ITabProps) => {
    const { setActiveTab, activeTab } = useTabs();
    return <div onClick={() => { setActiveTab(props.label)} } className={'tab-button ' + (activeTab == props.label ? 'tab-active' : '') }>{ props.label }</div>;
}

export interface IPanelProps { label: string, id?: string, children: ReactNode }

const Panel = (props: IPanelProps) => useTabs().activeTab == props.label ? <div id={props.id} className='tab-panel'>{ props.children }</div> : <></>;

export interface ITabViewState {
    activeTab: string
    setActiveTab: (label: string) => void
}

interface ITabsComposition {
    Tab: React.FC<ITabProps>;
    Panel: React.FC<IPanelProps>;
}

interface ITabViewerProps {
    default: string
    children?: React.ReactNode;
}

const TabsContext = React.createContext<ITabViewState | undefined>(undefined);

const TabViewer: React.FC<ITabViewerProps> & ITabsComposition = props => {
    const [ activeTab, setActiveTab ] = React.useState(props.default);

    const memoizedContextValue = React.useMemo(
        () => ({
          activeTab,
          setActiveTab,
        }),
        [activeTab, setActiveTab],
    );
    
    return (
        <TabsContext.Provider value={memoizedContextValue}>
            <div className="tab-viewer">
                { props.children }
            </div>
        </TabsContext.Provider>
    )
}

export const useTabs = (): ITabViewState => {
    const context = React.useContext(TabsContext);
    if (!context)
      throw new Error('This component must be used within a <Tabs> component.');
    return context;
};

TabViewer.Tab = Tab;
TabViewer.Panel = Panel;

export default TabViewer;