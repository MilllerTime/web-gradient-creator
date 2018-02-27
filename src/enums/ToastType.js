// Static enum for toast message types
const ToastType = {
	// Server worker has cached all content
	SW_INSTALL: 'SW_INSTALL',
	// Service worker has installed an update
	SW_UPDATE: 'SW_UPDATE',
	// Device is in offline mode
	OFFLINE: 'OFFLINE'
};


// Check if value is a valid type. Useful for dev validation.
const allTypes = Object.values(ToastType);
ToastType.isValid = type => allTypes.includes(type);

export default Object.freeze(ToastType);
