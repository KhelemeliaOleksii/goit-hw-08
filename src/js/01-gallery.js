import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

//create markup of the gallery
const classImg = 'gallery__image';
const classLink = 'gallery__item';
const markupGallary = galleryItems
        .map(({preview:previewImg, original:originalImg, description:alt}) => 
            `
                <a class="${classLink}" href="${originalImg}">
                    <img class="${classImg}" src="${previewImg}" alt="${alt}"/>
                </a>
            `)
        .join('');
const gallaryContainer = document.querySelector(".gallery");

// insert the gallery into HTML
gallaryContainer.innerHTML = markupGallary;

const gallery = new SimpleLightbox('.gallery a',{captionType:"attr", captionsData:'alt', captionDelay:250});
gallery.on('show.simplelightbox');    