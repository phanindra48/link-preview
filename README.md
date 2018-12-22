# Hyperlink previews on hover

## Setup

### Add below script in `head` tag of your html file

```html
<script src="https://cdn.linkpreview.org/js/previewer.js"></script>
```

### To initialize previewer add below snippet in your html

```JS
  previewer.init({
    // optional
    defaults: {
      ...
    },
    API_KEY: 'YOU_API_KEY',
    selector: '.class_name'
  });
```

### Make sure to initialize after page load

```JS
// vanilla javascript
window.onload = () => {
  // initialize here
}

(or)
// if you are using jquery
$( document ).ready(() => {
  // initialize here
})
```

## Supported Previews

### Articles

![1](./images/1.png)

### Youtube / Vimeo/ Dailymotion videos are supported

![Youtube](./images/3.png) ![Vimeo](./images/4.png) ![Dailymotion](./images/5.png) 