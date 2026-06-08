const personalForm = document.querySelector('#personalForm');
const passwordForm = document.querySelector('#passwordForm');

personalForm?.addEventListener('submit', (event) => {
	event.preventDefault();
	showStatus(personalForm.querySelector('.status-message'), 'Changes saved', true);
});

passwordForm?.addEventListener('submit', (event) => {
	event.preventDefault();
	const newPassword = passwordForm.querySelector('#new-password')?.value.trim();
	const confirmPassword = passwordForm.querySelector('#confirm-password')?.value.trim();
	const status = getPasswordStatusNode();
	const isValid = Boolean(newPassword) && newPassword === confirmPassword;
	showStatus(status, isValid ? 'Password updated' : 'Passwords do not match', isValid);
});

function getPasswordStatusNode() {
	let status = passwordForm.querySelector('.status-message');
	const actions = passwordForm.querySelector('.password-stack .actions');
	if (!status && actions) {
		status = document.createElement('div');
		status.className = 'status-message';
		status.setAttribute('role', 'status');
		status.setAttribute('aria-live', 'polite');
		actions.append(status);
	}
	return status;
}

function showStatus(node, message, isSuccess) {
	if (!node) return;
	node.textContent = message;
	node.style.color = isSuccess ? '#00f0af' : '#ff5e6c';
	window.clearTimeout(Number(node.dataset.timer));
	node.dataset.timer = window.setTimeout(() => {
		node.textContent = '';
	}, 2600);
}
