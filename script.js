// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
	mobileMenuButton.addEventListener('click', () => {
		const isOpen = mobileMenu.classList.toggle('hidden');
		mobileMenuButton.setAttribute('aria-expanded', (!isOpen).toString());
	});

	mobileMenu.querySelectorAll('a.mobile-link').forEach((link) => {
		link.addEventListener('click', () => {
			mobileMenu.classList.add('hidden');
			mobileMenuButton.setAttribute('aria-expanded', 'false');
		});
	});
}

// Active link highlighting on scroll
const navLinks = Array.from(document.querySelectorAll('a.nav-link'));
const sectionIds = ['home', 'about', 'projects', 'contact'];
const sections = sectionIds
	.map((id) => document.getElementById(id))
	.filter(Boolean);

function setActiveLink(id) {
	navLinks.forEach((link) => {
		const href = link.getAttribute('href') || '';
		if (href === `#${id}`) {
			link.classList.add('text-white');
			link.classList.remove('text-white/80');
		} else {
			link.classList.remove('text-white');
			link.classList.add('text-white/80');
		}
	});
}

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				setActiveLink(entry.target.id);
			}
		});
	},
	{
		root: null,
		rootMargin: '-50% 0px -50% 0px',
		threshold: 0,
	}
);

sections.forEach((section) => observer.observe(section));

// Current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

// Contact form basic validation
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

function isValidEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form) {
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const formData = new FormData(form);
		const name = (formData.get('name') || '').toString().trim();
		const email = (formData.get('email') || '').toString().trim();
		const message = (formData.get('message') || '').toString().trim();

		if (!name || !email || !message) {
			if (statusEl) statusEl.textContent = 'Please fill in all fields.';
			return;
		}
		if (!isValidEmail(email)) {
			if (statusEl) statusEl.textContent = 'Please enter a valid email address.';
			return;
		}

		if (statusEl) statusEl.textContent = 'Thanks! Your message was validated locally.';
		form.reset();
	});
}

// Modal logic for project Learn More
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const modalTools = document.getElementById('modal-tools');
const modalDemo = document.getElementById('modal-demo');
const modalClose = document.getElementById('modal-close');
const modalOk = document.getElementById('modal-ok');

function openModal() {
	if (!modal) return;
	modal.classList.remove('hidden');
	document.body.style.overflow = 'hidden';
}

function closeModal() {
	if (!modal) return;
	modal.classList.add('hidden');
	document.body.style.overflow = '';
}

// Wire up buttons
const learnMoreButtons = Array.from(document.querySelectorAll('.learn-more'));
learnMoreButtons.forEach((btn) => {
	btn.addEventListener('click', () => {
		const title = btn.getAttribute('data-title') || 'Project';
		const description = btn.getAttribute('data-description') || '';
		const tools = btn.getAttribute('data-tools') || '';
		const demo = btn.getAttribute('data-demo') || '#';

		if (modalTitle) modalTitle.textContent = title;
		if (modalDesc) modalDesc.textContent = description;
		if (modalTools) modalTools.textContent = tools;
		if (modalDemo) modalDemo.setAttribute('href', demo);

		openModal();
	});
});

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalOk) modalOk.addEventListener('click', closeModal);

if (modal) {
	modal.addEventListener('click', (e) => {
		if (e.target === modal) closeModal();
	});
	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
	});
}
