/* ============================================================
   Hyperticks UI — shared chrome + interactions
   Renders the sidebar and topbar into every app page so the
   shell markup lives in one place, then wires shared behaviours.
   Each page sets <body data-page="..."> to flag the active nav.
   ============================================================ */

(function () {
	const NAV = [
		{ key: 'dashboard', label: 'Dashboard', href: 'index.html' },
		{ key: 'marketplace', label: 'Marketplace', href: 'marketplace.html' },
		{ key: 'wallet', label: 'My Wallet', href: 'wallet.html' },
		{ key: 'blog', label: 'Blog', href: '#' },
		{ key: 'affiliate', label: 'Affiliate', href: 'affiliate.html' },
		{ key: 'announcements', label: 'Announcements', href: '#', badge: 1 },
		{ key: 'orders', label: 'Order History', href: '#' },
		{ key: 'accounts', label: 'Accounts', href: '#' },
		{ key: 'leaderboard', label: 'Leaderboard', href: '#' },
		{ key: 'profile', label: 'Profile Settings', href: 'profile.html' },
		{ key: 'notifications', label: 'Notifications', href: '#', badge: 3 },
		{ key: 'faq', label: 'FAQ', href: '#' },
	];

	const USER = { name: 'Joe Slim', id: '112436', cffp: 110 };

	function renderChrome() {
		const active = document.body.dataset.page || '';

		const sidebar = document.querySelector('.sidebar');
		if (sidebar && !sidebar.children.length) {
			const links = NAV.map((item) => {
				const cls = item.key === active ? ' class="active"' : '';
				const badge = item.badge ? ` <span class="badge">${item.badge}</span>` : '';
				return `<a href="${item.href}"${cls}>${item.label}${badge}</a>`;
			}).join('');
			sidebar.innerHTML = `
				<a class="brand" href="index.html"><span class="mark" aria-hidden="true"></span>Hyperticks</a>
				<nav class="nav" aria-label="Primary">${links}</nav>
				<div class="sidebar-actions">
					<button class="btn-meta" type="button">MetaTrader <span aria-hidden="true">↗</span></button>
					<button class="btn-challenge" type="button" data-go="marketplace.html">Start a New Challenge</button>
					<button class="btn-signout" type="button">SIGN OUT</button>
				</div>`;
		}

		const topbar = document.querySelector('.topbar');
		if (topbar && !topbar.children.length) {
			topbar.innerHTML = `
				<div class="cffp">
					<span><u>CFFP: ${USER.cffp}</u></span>
					<span>&#9432; Redeem 20 CFFP in <strong>08:24</strong></span>
				</div>
				<div class="topuser">
					<span class="avatar-dot" aria-hidden="true"></span>
					<b>${USER.name}</b><span class="sep">|</span>
					<span class="muted">User ID: <b>${USER.id}</b></span>
				</div>`;
		}
	}

	function wireSegmented() {
		document.querySelectorAll('.segmented').forEach((group) => {
			group.addEventListener('click', (event) => {
				const btn = event.target.closest('button');
				if (!btn || !group.contains(btn)) return;
				group.querySelectorAll('button').forEach((b) => b.classList.toggle('is-active', b === btn));
				group.dispatchEvent(new CustomEvent('segment:change', { detail: { value: btn.textContent.trim(), button: btn } }));
			});
		});
	}

	function wireNavigation() {
		document.querySelectorAll('[data-go]').forEach((el) => {
			el.addEventListener('click', () => { window.location.href = el.dataset.go; });
		});
	}

	function wireCopy() {
		document.querySelectorAll('[data-copy]').forEach((el) => {
			el.addEventListener('click', async () => {
				const text = el.dataset.copy;
				try {
					await navigator.clipboard.writeText(text);
					const prev = el.getAttribute('aria-label') || '';
					el.setAttribute('aria-label', 'Copied');
					el.classList.add('copied');
					setTimeout(() => { el.setAttribute('aria-label', prev); el.classList.remove('copied'); }, 1400);
				} catch (_) { /* clipboard unavailable */ }
			});
		});
	}

	function wireExpand() {
		document.querySelectorAll('.expand').forEach((btn) => {
			btn.addEventListener('click', () => {
				btn.textContent = btn.dataset.open ? 'Expand History ⌄' : 'Collapse History ⌃';
				btn.dataset.open = btn.dataset.open ? '' : '1';
			});
		});
	}

	// Status helper shared by profile + checkout forms
	window.showStatus = function (node, message, isSuccess) {
		if (!node) return;
		node.textContent = message;
		node.style.color = isSuccess ? '#00d99a' : '#ff5a65';
		window.clearTimeout(Number(node.dataset.timer));
		node.dataset.timer = window.setTimeout(() => { node.textContent = ''; }, 2800);
	};

	document.addEventListener('DOMContentLoaded', () => {
		renderChrome();
		wireSegmented();
		wireNavigation();
		wireCopy();
		wireExpand();
		if (typeof window.pageInit === 'function') window.pageInit();
	});
})();
