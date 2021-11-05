import React from 'react'

import './ProjectSelector.scss'

export interface IProjectSelectorProps {
    text: string
    link?: string
    image: string
}

export interface IProjectSelectorState {

}

export default class ProjectSelector extends React.Component<IProjectSelectorProps, IProjectSelectorState> {

    public static defaultProps: Partial<IProjectSelectorProps> = {
        text: "",
        link: undefined,
        image: ""
    };

    render() {
        return (
            <div className="ProjectSelector">
                <img src={this.props.image}/>
                <div id='overlay'>
                    { this.props.link ? 
                        <a target="_blank" href={ this.props.link }>{ this.props.text }</a> : 
                        <div>{this.props.text}</div> 
                    }
                </div>
            </div>
        )
    }
}