// Скрипт для карусели менеджеров
class ManagerCarousel {
    constructor() {
        this.wrapper = document.querySelector('.individual_manager_wrapper');
        this.prevBtn = document.querySelector('.nav-btn.prev');
        this.nextBtn = document.querySelector('.nav-btn.next');
        this.items = document.querySelectorAll('.individual_manager_item');
        this.currentIndex = 0;

        this.init();
    }

    init() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());


        this.updateVisibleCount();
        this.updateButtons();
        window.addEventListener('resize', () => {
            this.updateVisibleCount();
            this.updateButtons();
        });
    }

    updateVisibleCount() {
        const width = window.innerWidth;
        if (width <= 768) {
            this.visibleCount = 1;
        } else if (width <= 1024) {
            this.visibleCount = 2;
        } else {
            this.visibleCount = 3;
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--; // Только на 1 шаг назад
            this.scrollToCurrent();
        }
        this.updateButtons();
    }

    next() {
        const maxIndex = this.items.length - this.visibleCount;
        if (this.currentIndex < maxIndex) {
            this.currentIndex++; // Только на 1 шаг вперед
            this.scrollToCurrent();
        }
        this.updateButtons();
    }

    scrollToCurrent() {
        const item = this.items[this.currentIndex];
        if (item) {
            // Прокручиваем к текущему элементу
            const scrollPosition = item.offsetLeft - this.wrapper.offsetLeft;

            this.wrapper.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }

    updateButtons() {
        const maxIndex = this.items.length - this.visibleCount;

        // Отключаем кнопку "назад" если мы в начале
        this.prevBtn.disabled = this.currentIndex === 0;

        // Отключаем кнопку "вперед" если показаны последние карточки
        this.nextBtn.disabled = this.currentIndex >= maxIndex;

        console.log(`Index: ${this.currentIndex}, Max: ${maxIndex}, Visible: ${this.visibleCount}`);
    }
}

// Инициализация карусели
document.addEventListener('DOMContentLoaded', () => {
    new ManagerCarousel();
});

// Скрипт для QnA
class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq_item');
        this.init();
    }

    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq_question');

            question.addEventListener('click', () => {
                this.toggleItem(item);
            });

            // Добавляем поддержку клавиатуры
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleItem(item);
                }
            });
        });
    }

    toggleItem(clickedItem) {
        const isActive = clickedItem.classList.contains('active');

        // Закрываем все элементы
        this.faqItems.forEach(item => {
            item.classList.remove('active');
        });

        // Если элемент не был активен - открываем его
        if (!isActive) {
            clickedItem.classList.add('active');
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new FAQAccordion();
});

// Яндекс Карты
function initMap() {
    const map = new ymaps.Map('map', {
        center: [55.76, 37.64], // Координаты Москвы
        zoom: 14
    });

    // Добавляем метку
    const placemark = new ymaps.Placemark([55.76, 37.64], {
        hintContent: 'Наш офис',
        balloonContent: 'г. Москва, ул. Примерная, д. 123'
    });

    map.geoObjects.add(placemark);
}

// Инициализация карты
if (typeof ymaps !== 'undefined') {
    ymaps.ready(initMap);
}