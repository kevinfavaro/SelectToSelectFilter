# SelectToSelectFilter

SelectToSelectFilter is a JavaScript library that allows you to easily convert `select` elements into typeable elements with a predefined list of items. With SelectToSelectFilter, you can transform your `select` elements into more flexible and easy-to-use elements, allowing users to type to filter the available options.

## Installation

Don't need install

## Usage

To use SelectToSelectFilter, import the library into your code and call the `convert` method to convert a `select` element into a filter element:

html:
```html
<header>
  ...
  <script src="./SelectToSelectFilter.js"></script>
  ...
</header>
```

javascript:
```javascript
SelectToSelectFilter.convert('#my-select-element');
//or
SelectToSelectFilter.convert(document.getElementById('my-select-element'));
```

## Usage Examples

Here is an example of how to use SelectToSelectFilter to convert a select element into a filter element:
```javascript
<!-- index.html -->
<select id="my-select-element">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>

<script src="./SelectToSelectFilter.js"></script>
<script>
  SelectToSelectFilter.convert('#my-select-element');
</script>
```
In this example, we have a select element with the id my-select-element and three options. We include the SelectToSelectFilter library using a script tag and then call the convert method to convert the select element into a filter element.

After calling the convert method, the select element will be replaced by an input element that allows users to type to filter the available options. You can use any property you want.

The input text catches the first option from the select tag and puts it into the placeholder. In this case, the first option is removed. You can set the placeholder in the select tag if you need it, and the first option will not be removed.

To get the selected value from the input element, you can get the value of the data-value attribute, because the value is an input text.

## Contributing
Contributions to SelectToSelectFilter are welcome! To contribute, fork the repository, create a new branch, and submit your changes as a pull request.

## License
SelectToSelectFilter is licensed under the MIT License.
