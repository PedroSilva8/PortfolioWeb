import React from 'react'
import { Squash as Hamburger } from 'hamburger-react'

import ReactTooltip from 'react-tooltip';
import MenuItem from './menuItem'

import './Menu.scss'
import ThemeHandler from '@root/src/global/ThemeHandler';

export enum Position {
    TOP,
    LEFT,
    BOTTOM,
    RIGHT
}

export enum MenuType {
    NORMAL,
    EXPAND
}

export interface MenuProps {
    /* Menu Data */
    position: Position
    logo: string
    title: string

    /* Menu Button */
    type: MenuType
    menuIcon: string
    seperateMenu: boolean
    onMenuClick: (state: boolean) => void
    isMenuOpen: boolean
    
    /* Menu Buttons */
    children: React.ReactChild[]
    buttonsAlignment: 'Start' | 'End'
}

export interface MenuState {

}

export default class Menu extends React.Component<MenuProps, MenuState> {
    
    public static defaultProps: Partial<MenuProps> = {
        position: Position.LEFT,
        logo: "",
        title: "",
        type: MenuType.EXPAND,
        menuIcon: "menu",
        seperateMenu: false,
        onMenuClick: () => {},
        buttonsAlignment: 'Start'
    };

    constructor(props: MenuProps) {
        super(props)
        this.state = { }
    }

    getPosition = () : React.CSSProperties => {
        switch (this.props.position) {
            case Position.TOP:
                return { top: '0px', flexDirection: 'row' }
            case Position.LEFT:
                return { left: '0px', flexDirection: 'column' }
            case Position.RIGHT:
                return { right: '0px', flexDirection: 'column' }
            case Position.BOTTOM:
                return { bottom: '0px', flexDirection: 'row' }
        }
    }

    getSize = () : React.CSSProperties => {
        if (this.props.position == Position.TOP || this.props.position == Position.BOTTOM)
            return { width: "100%", height: "44px" };
        else
            return { width: "44px", height: "100%" };
    }

    getButtonPosition = () : React.CSSProperties => {
        if (this.props.position == Position.TOP || this.props.position == Position.BOTTOM)
            return { flexDirection: 'row' }
        else
            return { flexDirection: 'column' }
    }

    getButtonAlignment = () : React.CSSProperties => {
        switch (this.props.buttonsAlignment) {
            case 'Start':
                return { justifyContent: 'flex-start' }
            case 'End':
                return { justifyContent: 'flex-end' }
        }
    }

    renderTitle = () => {
        if (this.props.title != "")
            return <>
                { this.props.logo != "" ? <img src={this.props.logo} /> : <></> }
                <h3>{ this.props.title }</h3>
            </>
        else
            return <></>
    }

    renderMenu = () => {
        if (this.props.type == MenuType.EXPAND)
            return  <>
                        <div onClick={() =>  { this.props.onMenuClick(!this.props.isMenuOpen) }} className="element-icon element-icon-round">
                            <Hamburger size={24} duration={0.3} />
                        </div>
                        { this.props.seperateMenu ? <hr /> : <></>}
                    </>
        else
            return <></>;
    }

    render = () => {
        return (
            <>
                <div style={ {...this.getPosition(), ...this.getSize()} } className="element-menu">
                    { this.renderTitle() }
                    { this.renderMenu() }
                    <div style={{...this.getButtonPosition(), ...this.getButtonAlignment()}} className="element-menu-buttons">
                        { this.props.children }
                    </div>
                </div>
                <ReactTooltip border={true} borderColor={ThemeHandler.Secondary()} />
            </>
        )
    }
}
