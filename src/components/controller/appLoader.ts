import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'c139f2d4d466473a98e63265a20469ee',
        });
    }
}

export default AppLoader;
