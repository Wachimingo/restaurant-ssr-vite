// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
    export interface Theme {
        id: string,
        colors: {
            primaryColor: string,
            secondaryColor: string,
            bodyBackgroundColor: string,
            bodyFontColor: string,
            error: string,
            success: string,
            info: string,
            warning: string,
            navBar: {
                primaryColor: string,
                secondaryColor: string,
            },
            states: {
                new: string,
                pending: string,
                inProgress: string,
                completed: string,
            }
        },
        setTheme?: any,
    }
}