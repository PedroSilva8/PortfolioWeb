import React, { FC } from 'react'
import ReactDOM from 'react-dom'

import ThemeHandler from '@global/ThemeHandler'
import IndexPage from '@page/index'

import '@scss/root.scss'

const App: FC = () => {

    ThemeHandler.SelectedTheme = "Dark"

    ThemeHandler.Themes = { 
        "Dark": {
            Font: '#ffffff',
            FontAlt: '#808080',
            
            Primary: '#303134',
            PrimaryAlt: '#101112',
            
            Secondary: '#533DAB',
            SecondaryAlt: '#4C34A6',
            
            Background: '#28292c',
            Surface: '#202124',
            
            Success: '#43a047',
            Alert: '#fbc02d',
            Error: '#d32f2f'
        }
    }

    ThemeHandler.Update()

    return (
        <IndexPage />
    )
}

ReactDOM.render(<App />, document.getElementById("root"))