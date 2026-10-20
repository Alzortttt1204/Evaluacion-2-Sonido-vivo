import '@testing-library/jest-dom';
import { afterEach } from 'vitest';

// Cada prueba parte sin sesión guardada
afterEach(() => {
  localStorage.clear();
});
