export type Theme = {
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