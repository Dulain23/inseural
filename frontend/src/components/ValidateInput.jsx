export const validateInput = (name, value) => {
    switch (name) {
        case 'name':
            if (!value) return 'Full Name is required.';
            if (value.length < 3) return 'Full Name must be at least 3 characters long.';
            if (value.length > 70) return 'Full Name must not exceed 70 characters.';
            return '';
        case 'email':
            if (!value) return 'Email is required.';
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return 'Invalid email address.';
            return '';
        case 'password':
            if (!value) return 'Password is required.';
            if (value.length < 6) return 'Password must be at least 6 characters long.';
            if (value.length > 127) return 'Password must not exceed 127 characters.';
            return '';
        default:
            return '';
    }
};