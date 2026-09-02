const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#navLinks');
const joinForm = document.querySelector('#joinForm');
const formMessage = document.querySelector('#formMessage');
const contactForm = document.querySelector('#contactForm');
const contactMessageStatus = document.querySelector('#contactMessageStatus');
const currentDateElement = document.querySelector('#currentDate');
const calendarGrid = document.querySelector('#calendarGrid');
const calendarHeading = document.querySelector('#calendarHeading');
const previousMonth = document.querySelector('#previousMonth');
const nextMonth = document.querySelector('#nextMonth');

function toggleMenu() {
    if (!navLinks || !menuToggle) {
        return;
    }

    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));

    const menuLabel = menuToggle.querySelector('.sr-only');
    if (menuLabel) {
        menuLabel.textContent = isOpen ? 'Close menu' : 'Open menu';
    }
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', toggleMenu);

    navLinks.addEventListener('click', (event) => {
        if (event.target instanceof HTMLAnchorElement && navLinks.classList.contains('open')) {
            toggleMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navLinks.classList.contains('open')) {
            toggleMenu();
            menuToggle.focus();
        }
    });
}

if (joinForm && formMessage) {
    joinForm.addEventListener('submit', (event) => {
        event.preventDefault();
        formMessage.textContent = 'Thanks! Your interest has been submitted.';
        formMessage.classList.add('success-message');
        joinForm.reset();
    });
}

if (contactForm && contactMessageStatus) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        contactMessageStatus.textContent = 'Thanks! Your message has been submitted.';
        contactMessageStatus.classList.add('success-message');
        contactForm.reset();
    });
}

if (currentDateElement) {
    const today = new Date();
    currentDateElement.dateTime = today.toISOString().slice(0, 10);
    currentDateElement.textContent = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

if (calendarGrid && calendarHeading && previousMonth && nextMonth) {
    let displayedMonth = new Date();
    // Edit this list to change which weekdays are marked as meeting days.
    const clubEvents = {
        2: 'Creative Workshop',
        4: 'Project & Collaboration Day'
    };

    function renderCalendar() {
        const year = displayedMonth.getFullYear();
        const month = displayedMonth.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        calendarHeading.textContent = displayedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        calendarGrid.replaceChildren();

        for (let index = 0; index < firstDay; index += 1) {
            const emptyDay = document.createElement('span');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.append(emptyDay);
        }

        for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber += 1) {
            const date = new Date(year, month, dayNumber);
            const day = document.createElement('span');
            day.className = 'calendar-day';
            day.textContent = String(dayNumber);
            day.setAttribute('aria-label', date.toLocaleDateString('en-US', { dateStyle: 'long' }));

            if (date.toDateString() === new Date().toDateString()) {
                day.classList.add('today');
            }
            if (clubEvents[date.getDay()]) {
                day.classList.add('meeting-day');
                day.title = clubEvents[date.getDay()];
                day.setAttribute('aria-label', `${day.getAttribute('aria-label')}. ${clubEvents[date.getDay()]}`);
            }
            calendarGrid.append(day);
        }
    }

    previousMonth.addEventListener('click', () => {
        displayedMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() - 1, 1);
        renderCalendar();
    });
    nextMonth.addEventListener('click', () => {
        displayedMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 1);
        renderCalendar();
    });
    renderCalendar();
}

document.querySelectorAll('.photo-card img').forEach((image) => {
    image.addEventListener('error', () => {
        const card = image.closest('.photo-card');
        if (card) {
            card.classList.add('image-missing');
            card.style.setProperty('--fallback-icon', `"${image.dataset.fallback || '📷'}"`);
        }
        image.remove();
    });
});
