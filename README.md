# Hyperlink previews on hover

## Setup

### Add below script in `head` tag of your html file

```html
<script src="https://s3.amazonaws.com/linkpreview.org/previewer.js"></script>
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
