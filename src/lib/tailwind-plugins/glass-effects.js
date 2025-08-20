const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addComponents, theme }) {
    addComponents({
        '.glass-effect': {
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(0.5rem) saturate(1.8)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.05), transparent), radial-gradient(at top center, rgba(255, 255, 255, 0.08) 0%, transparent 60%)',
        },
        '.dark .glass-effect': {
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            borderColor: 'rgba(51, 65, 85, 0.3)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        },
        '.glass-effect-strong': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(1rem) saturate(1.8)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.08), transparent), radial-gradient(at top center, rgba(255, 255, 255, 0.12) 0%, transparent 70%)',
        },
        '.dark .glass-effect-strong': {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            borderBottomColor: 'rgba(51, 65, 85, 0.4)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        },
    })
})