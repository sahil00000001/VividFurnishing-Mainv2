// API Configuration
export const API_BASE_URL = 'https://sm-furnishing-backend.onrender.com';

// Helper function to build API URLs
export function apiUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint}`;
}