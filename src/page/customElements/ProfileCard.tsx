import React from 'react'

import './ProfileCard.scss'

export interface ProfileCardProps {
    title: string
}

export interface ProfileCardState {

}

export default class ProfileCard extends React.Component<ProfileCardProps, ProfileCardState> {

    public static defaultProps: Partial<ProfileCardProps> = {
        title: ""
    };

    render() {
        return (
            <div className="CardTitle">
                <div data-title>
                    <hr/>
                    <h3>{ this.props.title }</h3>
                </div>
                <div data-content>
                    { this.props.children }
                </div>
            </div>
        )
    }
}