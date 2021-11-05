import React from 'react'

import Icon from '@element/Icon'

import './Card.scss'

export interface ICardProps {
    icon: string
    title: string
}

export interface ICardState {

}

export default class Card extends React.Component<ICardProps, ICardState> {

    public static defaultProps: Partial<ICardProps> = {
        icon: "",
        title: ""
    };

    render() {
        return (
            <div className="card">
                { this.props.icon == "" ? <></> : <Icon icon={this.props.icon}/> }
                { this.props.title == "" ? <></> : <span className='card-title'>{ this.props.title }</span> }
                <span className='card-content'>{ this.props.children }</span>
            </div>
        )
    }
}