// Get the form controls and list elements used by the application.
const form = document.querySelector('#chapter-form');
const input = document.querySelector('#favchap');
const list = document.querySelector('#list');
const message = document.querySelector('#form-message');

// Map accepted Book of Mormon book names to their display capitalization.
const books = new Map([
  ['1 nephi', '1 Nephi'],
  ['2 nephi', '2 Nephi'],
  ['jacob', 'Jacob'],
  ['enos', 'Enos'],
  ['jarom', 'Jarom'],
  ['omni', 'Omni'],
  ['words of mormon', 'Words of Mormon'],
  ['mosiah', 'Mosiah'],
  ['alma', 'Alma'],
  ['helaman', 'Helaman'],
  ['3 nephi', '3 Nephi'],
  ['4 nephi', '4 Nephi'],
  ['mormon', 'Mormon'],
  ['ether', 'Ether'],
  ['moroni', 'Moroni'],
]);

// Handle form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Validate input format: "Book Chapter" or "Book Chapter:Verse"
  const match = input.value.trim().match(/^(.+?)\s+(\d+)(?:\s*:\s*(\d+))?$/);
  if (!match) {
    message.textContent = 'Enter a Book of Mormon reference, such as Alma 5 or Alma 2:3.';
    input.focus();
    return;
  }

  // Normalize the book name and convert the chapter and optional verse to numbers.
  const book = books.get(match[1].trim().replace(/\s+/g, ' ').toLowerCase());
  const chapterNumber = Number(match[2]);
  const verseNumber = match[3] === undefined ? undefined : Number(match[3]);

  // Reject names that are not in the Book of Mormon.
  if (!book) {
    message.textContent = 'Book not recognized. Check the spelling, such as 1 Nephi, Alma, or Moroni.';
    input.focus();
    return;
  }

  // Require positive, safe integer values for the chapter and optional verse.
  if (
    !Number.isSafeInteger(chapterNumber) ||
    chapterNumber < 1 ||
    (verseNumber !== undefined && (!Number.isSafeInteger(verseNumber) || verseNumber < 1))
  ) {
    message.textContent = 'Enter a chapter and optional verse number greater than zero, such as 1 Nephi 2:3.';
    input.focus();
    return;
  }

  const chapter = `${book} ${chapterNumber}`;
  const reference = verseNumber === undefined ? chapter : `${chapter}:${verseNumber}`;

  // Treat any reference from the same chapter as a duplicate.
  if ([...list.children].some((item) => item.dataset.chapter === chapter.toLowerCase())) {
    message.textContent = `${chapter} is already in your list.`;
    input.focus();
    return;
  }

  // Keep the list at ten entries or fewer.
  if (list.children.length >= 10) {
    message.textContent = 'Your list already has 10 chapters. Delete one before adding another.';
    input.focus();
    return;
  }

  // Create the list item and its accessible delete button.
  const item = document.createElement('li');
  item.dataset.chapter = chapter.toLowerCase();
  item.append(document.createTextNode(reference));

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.classList.add('delete');
  deleteButton.textContent = 'Delete';
  deleteButton.setAttribute('aria-label', `Delete ${reference}`);
  deleteButton.addEventListener('click', () => {
    
    // Remove the reference, announce the updated count, and return focus to the input.
    item.remove();
    message.textContent = `${reference} removed. ${list.children.length} of 10 chapters in your list.`;
    input.focus();
  });

  // Add the reference, clear the field, and announce the successful update.
  item.append(deleteButton);
  list.append(item);
  input.value = '';
  message.textContent = `${reference} added. ${list.children.length} of 10 chapters in your list.`;
  input.focus();
});