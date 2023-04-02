
function handleButtonClick() {
  const checkboxes = document.querySelectorAll('.my-checkbox:checked');
  const bottomDiv = document.querySelector('.items-center .w-full')
  if (bottomDiv && bottomDiv.classList) {
    bottomDiv.classList.add('ignore-div')
  }
  var contentWidth = 600
  const noChecked = checkboxes.length === 0

  const allCheckboxes = document.querySelectorAll('.my-checkbox')
  for (let i = 0; i < allCheckboxes.length; i++) {
    const checkitem = allCheckboxes[i];
    const p = checkitem.parentElement.parentElement
    p.classList.remove('ignore-div')
    if (!checkitem.checked && !noChecked) {
      p.classList.add('ignore-div')
    }
    // do something with the checked item
  }

  const checkbox = allCheckboxes[0]
  // const mainContainer = checkbox.parentElement.parentElement.parentElement
  const mainContainer = document.querySelector('.items-center')
  contentWidth = checkbox.parentElement.clientWidth + 100
  const nextDiv = checkbox.parentElement.parentElement;
  offsetX = (nextDiv.clientWidth - contentWidth) / 2 - 10

  options = { width: contentWidth, x: offsetX, imageTimeout: 0 }

  options.ignoreElements = function (element) {
    if (!element || !element.classList) return true
    if (element.classList.contains('ignore-div') || element.classList.contains('my-checkbox')) return true
    return false
  }

  captureAndDisplayDivAsImage(mainContainer, options)

}


function captureAndDisplayDivAsImage(divToCapture, options) {
  // Use html2canvas to capture the div as an image
  html2canvas(divToCapture, options).then(function (canvas) {
    // Convert canvas to a data URL
    const dataURL = canvas.toDataURL();

    // Open a new tab and display the image
    const tab = window.open();
    tab.document.write('<img src="' + dataURL + '"/>');
  });
}

// Function to add the checkbox before the items-end divs
function addCheckboxBeforeItemsEnd() {
  // Get all the items-end divs
  const itemsEndDivs = document.querySelectorAll('.items-end');

  // Loop through the items-end divs and add a checkbox before each one
  for (let i = 0; i < itemsEndDivs.length; i++) {
    const itemsEndDiv = itemsEndDivs[i];

    // Check if the checkbox has already been added
    const existingCheckbox = itemsEndDiv.previousSibling;
    if (existingCheckbox && existingCheckbox.className === 'my-checkbox') {
      // Checkbox already exists, so skip this div
      continue;
    }

    // Create a new checkbox element
    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.className = 'my-checkbox';

    // Insert the checkbox before the items-end div
    itemsEndDiv.parentNode.insertBefore(newCheckbox, itemsEndDiv);
  }
}

// Set up the mutation observer to watch for changes to the page
const observer = new MutationObserver(addCheckboxBeforeItemsEnd);
observer.observe(document.body, { childList: true, subtree: true });

// Create the "Save to Image" button
const saveButton = document.createElement('button');
saveButton.textContent = 'Export to Image 📥'; // Added the emoji here
saveButton.style.position = 'fixed';
saveButton.style.bottom = '100px';
saveButton.style.right = '50px';
saveButton.addEventListener('click', handleButtonClick);

// Add the button to the document
document.body.appendChild(saveButton);

// Call addCheckboxBeforeItemsEnd once on page load to add the checkbox before existing items-end divs
addCheckboxBeforeItemsEnd();

