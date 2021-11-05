import React from 'react'

import './Icon.scss'

import '@mdi/font/scss/materialdesignicons.scss'

export enum IconType {
    OUTLINED = "-outlined",
    FILLED = "",
    ROUNDED = "-round",
    SHARP = "-sharp",
    TWO_TONE = "-two-tone"
}

export enum IconHoverType {
    NONE,
    ROUND,
    ROUND_SQUARE,
    SQUARE
}

export interface IconProps {
    icon: string
    type: IconType
    hoverType: IconHoverType
    canHold: boolean
}

export interface IconState {
    isHolding: boolean
}

export default class Icon extends React.Component<IconProps, IconState> {
    
    public static defaultProps: Partial<IconProps> = {
        icon: "error",
        type: IconType.FILLED,
        hoverType: IconHoverType.NONE,
        canHold: false
    };

    constructor(props: IconProps) {
        super(props)
        this.state = { isHolding: false }
    }

    toggleHold = () => {
        if (this.props.canHold)
            this.setState({ isHolding: !this.state.isHolding })
    }

    getHoverStyle = () : string => {
        switch (this.props.hoverType) {
            case IconHoverType.NONE:
                return "";
            case IconHoverType.ROUND:
                return "element-icon-round";
            case IconHoverType.ROUND_SQUARE:
                return "element-icon-round-square";
            case IconHoverType.SQUARE:
                return "element-icon-square";
        }
    }

    render = () => {
        
        return (
            <div className={ "element-icon " + (this.state.isHolding ? "element-icon-holding " : "") + this.getHoverStyle() }>
                <span style={{fontSize: 20}} className={ "mdi mdi-" + this.props.icon + " " + this.props.type } ></span>
            </div>
        )
    }
}
