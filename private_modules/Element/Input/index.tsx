import React from 'react'

import './Input.scss'

export interface InputProps {
    placeholder: string
}

export interface InputState {
    
}

export default class Input extends React.Component<InputProps, InputState> {
    
    public static defaultProps: Partial<InputProps> = {
        
    };

    constructor(props: InputProps) {
        super(props)
        this.state = {  }
    }

    render() {
        return (
            <input placeholder={this.props.placeholder} className="element-input" />
        )
    }
}