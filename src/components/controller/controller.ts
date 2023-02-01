import AppLoader from './appLoader';
import { ResponseCallback } from './loader';

export enum ResponseStatuses {
    'ok' = 'ok',
    'error' = 'error',
}

export type ErrorResponse = { status: ResponseStatuses.error; code: string; message: string };

export type ArticleObject = {
    source: { id: string | null; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};

export type SourceObject = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};

export type SourceData =
    | {
          status: ResponseStatuses.ok;
          sources: SourceObject[];
      }
    | ErrorResponse;

export type NewsData =
    | {
          status: ResponseStatuses.ok;
          totalResults: number;
          articles: ArticleObject[];
      }
    | ErrorResponse;

class AppController extends AppLoader {
    getSources(callback: ResponseCallback<SourceData>) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: ResponseCallback<NewsData>) {
        let target = e.target;
        console.log(target);
        const newsContainer = e.currentTarget;
        console.log(newsContainer, 'current target');
        if (!(newsContainer instanceof HTMLElement)) {
            throw new Error('not a div');
        }

        while (target !== newsContainer) {
            if (!(target instanceof HTMLElement)) {
                throw new Error('not a div');
            }
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId === null) {
                    throw new Error('');
                }
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode;
        }
    }
}

export default AppController;
