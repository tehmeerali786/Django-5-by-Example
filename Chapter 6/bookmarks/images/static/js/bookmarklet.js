const siteUrl = '//127.0.0.1:8000';
const styleUrl = siteUrl + 'static/css/bookmarklet.css';
const minWidth = 250;
const minHeight = 250;

// load CSS
var head = document.getElementByTagName('head')[0]
var link = document.createElement('link')
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = styleUrl + '?r=' + Math.floor(Math.random()*9999999999999999);
head.appendChild(link);

//load HTML
var body = document.getElementsByTagName('body')[0];
boxHtml = `
            <div id="bookmarklet">
            <a href="#" id="close">&times;</a>
            <h1>Select an image to bookmark:</h1>
            <div class="images"></div>
            </div>
            `

function bookmarkletLaunch() {
    bookmarklet = document.getElementById('bookmarklet');
    var imageFound = bookmarklet.querySelector('.images');


    // clear images found
    imagesFound.innerHtml = '';

    // display bookmarklet
    bookmarklet.style.display = 'block';

    // close event
    bookmarklet.querySelector('#close')
               .addEventListener('click', function(){
                 bookmarklet.style.display = 'none'
               });


// find images in the DOM with the minimum dimension
images = document.querySelectorAll('img[src$=".jpg"], img[src$=".jpg"], img[src$=".png"]');
images.forEach(image => {
  if(image.naturalWidth >= minWidth && image.naturalHeight >= minHeight) {
    var imageFound = document.createElement('img');
    imageFound.src = image.src;
    imageFound.append(imageFound);
  }
})

    // select image event
    imageFound.queryselectorAll('img').forEach(image => {
        image.addEventListener('click', function(event){
          imageselected = event.target;
          bookmarklet.style.display = 'none';
          window.open(siteUrl + 'images/create/?url='
                              + encodeURIComponent(imageSelected.src)
                              + '&title='
                              + encodeURIComponent(document.title), '_blank');
        })
    })
  }
    // laouch the bookmarklet
    bookmarkletLaunch();
