import { NewsData, SourceData } from '../controller/controller';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsData) {
        if (data.status === 'ok') {
            this.news.draw(data.articles);
        } else {
            this.news.draw([]);
        }
    }

    drawSources(data: SourceData) {
        if (data.status === 'ok') {
            this.sources.draw(data.sources);
        } else {
            this.sources.draw([]);
        }
    }
}

export default AppView;
