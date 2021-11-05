
export interface Theme {
    /* Font */
    Font: string
    FontAlt: string
    /* Primary */
    Primary: string
    PrimaryAlt: string

    /* Secondary*/
    Secondary: string
    SecondaryAlt: string
    
    /* Content */
    Background: string
    Surface: string

    /* Alerts */
    Error: string
    Alert: string
    Success: string
}

export default class ThemeHandler {
    
    public static SelectedTheme: string

    public static Themes: { [key: string]: Theme }

    static hexToRgb = (hex: string) : string => {
        var arrBuff = new ArrayBuffer(4);
        var vw = new DataView(arrBuff);
        vw.setUint32(0,parseInt(hex.substring(1), 16),false);
        var arrByte = new Uint8Array(arrBuff);
      
        return arrByte[1] + "," + arrByte[2] + "," + arrByte[3];
    }

    static Update = () => {
        /* Update Font */
        document.documentElement.style.setProperty('--font', this.hexToRgb(ThemeHandler.Font()))
        document.documentElement.style.setProperty('--font-alt', this.hexToRgb(ThemeHandler.Font('alt')))

        /* Update Primary */
        document.documentElement.style.setProperty('--primary', this.hexToRgb(ThemeHandler.Primary()))
        document.documentElement.style.setProperty('--primary-alt', this.hexToRgb(ThemeHandler.Primary('alt')))
        
        /* Update Secondary */
        document.documentElement.style.setProperty('--secondary', this.hexToRgb(ThemeHandler.Secondary()))
        document.documentElement.style.setProperty('--secondary-alt', this.hexToRgb(ThemeHandler.Secondary('alt')))

        /* Update Content */
        document.documentElement.style.setProperty('--background', this.hexToRgb(ThemeHandler.Content()))
        document.documentElement.style.setProperty('--surface', this.hexToRgb(ThemeHandler.Content('surf')))

        /* Update Alerts */
        document.documentElement.style.setProperty('--error', this.hexToRgb(ThemeHandler.Alerts()))
        document.documentElement.style.setProperty('--alert', this.hexToRgb(ThemeHandler.Alerts('ale')))
        document.documentElement.style.setProperty('--success', this.hexToRgb(ThemeHandler.Alerts('suc')))
    }

    static Font = (mode: 'def' | 'alt' = 'def'): string => {
        switch (mode) {
            case "def":
                return ThemeHandler.Themes[ThemeHandler.SelectedTheme].Font
            case 'alt':
                return ThemeHandler.Themes[ThemeHandler.SelectedTheme].FontAlt
        }
    }

    static Primary = (mode: 'def' | 'alt' = 'def') : string =>  {
        switch (mode) {
            case "def":
                return ThemeHandler.Themes[ThemeHandler.SelectedTheme].Primary
            case "alt":
                return ThemeHandler.Themes[ThemeHandler.SelectedTheme].PrimaryAlt
        }
    }

    static Secondary = (mode: 'def' | 'alt' = 'def') : string =>  {
        switch (mode) {
            case "def":
                return ThemeHandler.Themes[ThemeHandler.SelectedTheme].Secondary
            case "alt":
                return ThemeHandler.Themes[ThemeHandler.SelectedTheme].SecondaryAlt
        }
    }

    static Content = (mode: 'back' | 'surf' = 'back') : string =>  {
        switch (mode) {
            case "back":
                return ThemeHandler.Themes[ThemeHandler.SelectedTheme].Background
            case "surf":
                return ThemeHandler.Themes[ThemeHandler.SelectedTheme].Surface
        }
    }

    static Alerts = (mode: 'err' | 'ale' | 'suc' = 'suc') : string =>  {
        switch (mode) {
            case "err":
                return ThemeHandler.Themes[ThemeHandler.SelectedTheme].Error
            case "ale":
                return ThemeHandler.Themes[ThemeHandler.SelectedTheme].Alert
            case "suc":
                return ThemeHandler.Themes[ThemeHandler.SelectedTheme].Success
        }
    }
}