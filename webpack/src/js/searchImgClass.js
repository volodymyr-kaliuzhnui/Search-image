import refs from "./refs";
import {error, alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
import imagesMarkup from '../templates/imagesList.hbs'

let {input, gallery, loadMoreBtn} = refs;

defaultModules.set(PNotifyMobile, {});

let debounce = require('lodash.debounce');



class searchImg {
  constructor(url) {
    this.url = url;
    this.APIkay = '20818338-4ad2886b2dd6fde65fdaa2224';
    this.imageName = '';
    this.page = 1;

  }



  init = () => {
    input.addEventListener('input', debounce(this.getValue, 500))
  }

  getValue = (event) => {
    this.imageName = event.target.value;
    this.fetchImages()
  }


  renderPage = (data) => {
    if (this.imageName === "" || data.hits.length === 0){
      alert({
        text: 'Not found!'
      })
      gallery.innerHTML = "";
      this.page = 1;
      loadMoreBtn.classList.remove('active');
      return
    }
    gallery.insertAdjacentHTML('beforeend', imagesMarkup(data));
    loadMoreBtn.classList.add('active');
    loadMoreBtn.addEventListener('click', this.loadMore)
  }

   fetchImages = async () => {
      try {
        let response = await fetch(`${this.url}&q=${this.imageName}&page=${this.page}&per_page=12&key=${this.APIkay}`);
        let data = await response.json();
        this.renderPage(data)
      } catch (error) {
        console.log(error)
      }
  }

  loadMore = () => {
    this.page += 1;
    this.fetchImages();
  }

}

 let images = new searchImg('https://pixabay.com/api/?image_type=photo&orientation=horizontal');
images.init()





