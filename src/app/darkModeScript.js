// Setup script to check dark mode preference before page render
function setDarkModeOnLoad() {
  // Check localStorage preference
  const darkModePreference = localStorage.getItem('theme');
  
  // Check system preference if no localStorage preference
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply dark mode if needed
  if (darkModePreference === 'dark' || (!darkModePreference && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

// Try to execute early to prevent flash of wrong theme
if (typeof window !== 'undefined') {
  try {
    setDarkModeOnLoad();
  } catch (e) {
    console.error('Failed to set initial dark mode preference:', e);
  }
}
