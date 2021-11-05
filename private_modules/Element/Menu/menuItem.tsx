import React from 'react'
import $ from 'jquery'

import Icon, { IconHoverType } from '@element/Icon'

import './MenuItem.scss'

export interface MenuItemProps {
    itemType: 'Icon' | 'Image'
    icon: string
    tooltip: string
    target?: string
    href?: string
}

export interface MenuItemState {

}

export default class MenuItem extends React.Component<MenuItemProps, MenuItemState> {
    
    public static defaultProps: Partial<MenuItemProps> = {
        itemType: 'Icon',
        icon: 'error',
        tooltip: "",
        target: undefined,
        href: undefined
    };

    constructor(props: MenuItemProps) {
        super(props)
        this.state = { }
    }

    onClick = () => {
        if (this.props.href)
            window.open(this.props.href, '_blank')?.focus()
        else if (this.props.target)
            $('#content').animate({ scrollTop: document.getElementById(this.props.target)?.offsetTop - 44 }, 200);
    }

    render = () => {
        return (
            <>
                { this.props.itemType == 'Icon' ?
                    <p onClick={this.onClick} data-tip={this.props.tooltip}><Icon hoverType={IconHoverType.ROUND} icon={this.props.icon} /></p>:
                    <div></div>
                }
            </>
        )
    }
}
