import { ArticleObject } from '../../controller/controller';
import './news.css';

class News {
    draw(data: ArticleObject[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');

        if (!(newsItemTemp instanceof HTMLTemplateElement)) {
            throw new Error('element not found!');
        }
        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true);
            if (!(newsClone instanceof DocumentFragment)) {
                throw new Error('not a fragment');
            }
            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');
            const newsMetaPhotoElement = newsClone.querySelector('.news__meta-photo');
            if (!(newsMetaPhotoElement instanceof HTMLElement)) {
                throw new Error('not a div');
            }
            newsMetaPhotoElement.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const newsMetaAuthorElement = newsClone.querySelector('.news__meta-author');
            if (!(newsMetaAuthorElement instanceof HTMLElement)) {
                throw new Error('not a div');
            }
            newsMetaAuthorElement.textContent = item.author || item.source.name;

            const newsMetaDateElement = newsClone.querySelector('.news__meta-date');
            if (!(newsMetaDateElement instanceof HTMLElement)) {
                throw new Error('not a div');
            }
            newsMetaDateElement.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const newsDescriptionTitleElement = newsClone.querySelector('.news__description-title');
            if (!(newsDescriptionTitleElement instanceof HTMLElement)) {
                throw new Error('not a div');
            }
            newsDescriptionTitleElement.textContent = item.title;

            const newsDescriptionSourceElement = newsClone.querySelector('.news__description-source');
            if (!(newsDescriptionSourceElement instanceof HTMLElement)) {
                throw new Error('not a div');
            }
            newsDescriptionSourceElement.textContent = item.source.name;

            const newsDescriptionContentElement = newsClone.querySelector('.news__description-content');
            if (!(newsDescriptionContentElement instanceof HTMLElement)) {
                throw new Error('not a div');
            }
            newsDescriptionContentElement.textContent = item.description;

            const newsReadMoreElement = newsClone.querySelector('.news__read-more a');
            if (!(newsReadMoreElement instanceof HTMLElement)) {
                throw new Error('not a div');
            }
            newsReadMoreElement.setAttribute('href', item.url);

            fragment.append(newsClone);
        });
        const newsElement = document.querySelector('.news');
        if (!(newsElement instanceof HTMLElement)) {
            throw new Error('not a div');
        }
        newsElement.innerHTML = '';
        newsElement.appendChild(fragment);
    }
}

export default News;
