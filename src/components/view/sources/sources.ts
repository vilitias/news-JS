import { SourceObject } from '../../controller/controller';
import './sources.css';

class Sources {
    draw(data: SourceObject[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');
        if (!(sourceItemTemp instanceof HTMLTemplateElement)) {
            throw new Error('element not found!');
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true);
            if (!(sourceClone instanceof DocumentFragment)) {
                throw new Error('not a fragment');
            }

            const sourceItemNameElement = sourceClone.querySelector('.source__item-name');
            if (!(sourceItemNameElement instanceof HTMLSpanElement)) {
                throw new Error('not a div');
            }
            sourceItemNameElement.textContent = item.name;

            const sourceItem = sourceClone.querySelector('.source__item');
            if (!(sourceItem instanceof HTMLDivElement)) {
                throw new Error('not a div');
            }
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });
        const sourcesElement = document.querySelector('.sources');
        if (!(sourcesElement instanceof HTMLDivElement)) {
            throw new Error('not a div');
        }
        sourcesElement.append(fragment);
    }
}

export default Sources;
