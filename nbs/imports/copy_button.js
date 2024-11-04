function copyTextarea2(button) {
  // Find the textarea within the same parent div
  const textarea = button.closest('div').querySelector('textarea');
  if (textarea) {
    textarea.select();
    document.execCommand('copy');
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    setTimeout(() => {
      button.textContent = originalText;
    }, 2000);
  } else {
    console.error('Textarea not found');
  }
}