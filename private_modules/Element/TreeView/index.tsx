import React from 'react'

import Input from '@element/Input'

import './TreeView.scss'

export interface TreeViewProps {
    canSearch: boolean
    width: number | string
    minWidth: number | string
    isOpen: boolean
}

export interface TreeViewState {

}

export default class TreeView extends React.Component<TreeViewProps, TreeViewState> {

    public static defaultProps: Partial<TreeViewProps> = {
        canSearch: true,
        width: 'auto',
        minWidth: 'auto',
        isOpen: false
    };

    render() {
        return (
            <div style={{ width: this.props.isOpen ? this.props.width : 0, minWidth: this.props.minWidth, overflow: 'hidden' }} className="element-tree-view">
                { this.props.canSearch ?  
                    <>
                        <div className="element-search-area">
                            <Input placeholder="Search" />
                        </div>
                        <hr></hr>
                    </>:
                    <></>
                }
            </div>
        )
    }
}