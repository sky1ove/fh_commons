function setupAutocomplete(inputSelector, dropdownSelector) {
    const input = document.querySelector(inputSelector);
    const dropdown = document.querySelector(dropdownSelector);
    const items = Array.from(dropdown.children);

    input.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        let hasVisibleItems = false;
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(value)) {
                item.style.display = 'block';
                hasVisibleItems = true;
            } else {
                item.style.display = 'none';
            }
        });
        dropdown.style.display = hasVisibleItems && value.length > 0 ? 'block' : 'none';
    });

    dropdown.addEventListener('click', function(e) {
        if (e.target.classList.contains('dropdown-item')) {
            input.value = e.target.textContent;
            dropdown.style.display = 'none';
        }
    });

    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}