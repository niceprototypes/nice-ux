import React from 'react'
import Button, { ButtonTheme } from '../src'

/**
 * Example showing different theming options
 */
const ThemingExample: React.FC = () => {
  const handleClick = () => {
    console.log('Themed button clicked!')
  }

  // Custom theme examples
  const darkTheme: ButtonTheme = {
    colors: {
      primary: '#6366f1',
      secondary: '#64748b',
    },
    cssVariables: {
      contentColor: '#f1f5f9',
      contentColorInverse: '#1e293b',
      backgroundColor: '#374151',
      backgroundColorInverse: '#f1f5f9',
      borderColor: '#4b5563',
      borderWidth: '2px',
    }
  }

  const brandTheme: ButtonTheme = {
    colors: {
      primary: '#10b981',
      secondary: '#6b7280',
    },
    cssVariables: {
      contentColor: '#065f46',
      contentColorInverse: '#ffffff',
      backgroundColor: 'transparent',
      backgroundColorInverse: '#10b981',
      borderColor: '#10b981',
      borderWidth: '1px',
    }
  }

  const retroTheme: ButtonTheme = {
    colors: {
      primary: '#f59e0b',
      secondary: '#8b5cf6',
    },
    cssVariables: {
      contentColor: '#451a03',
      contentColorInverse: '#fef3c7',
      backgroundColor: '#fef3c7',
      backgroundColorInverse: '#f59e0b',
      borderColor: '#d97706',
      borderWidth: '3px',
    }
  }

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <h2>Theming Examples</h2>

      {/* Default theme */}
      <section>
        <h3>Default Theme</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button status="primary" onClick={handleClick}>
            Primary
          </Button>
          <Button status="secondary" onClick={handleClick}>
            Secondary
          </Button>
          <Button status="muted" onClick={handleClick}>
            Muted
          </Button>
        </div>
      </section>

      {/* Dark theme */}
      <section style={{
        backgroundColor: '#1f2937',
        padding: '20px',
        borderRadius: '8px',
        color: '#f9fafb'
      }}>
        <h3 style={{ color: '#f9fafb' }}>Dark Theme</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button
            theme={darkTheme}
            status="primary"
            onClick={handleClick}
          >
            Primary Dark
          </Button>
          <Button
            theme={darkTheme}
            status="secondary"
            onClick={handleClick}
          >
            Secondary Dark
          </Button>
          <Button
            theme={darkTheme}
            status="muted"
            onClick={handleClick}
          >
            Muted Dark
          </Button>
        </div>
      </section>

      {/* Brand theme */}
      <section style={{
        backgroundColor: '#f0fdf4',
        padding: '20px',
        borderRadius: '8px'
      }}>
        <h3>Brand Theme (Green)</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button
            theme={brandTheme}
            status="primary"
            onClick={handleClick}
          >
            Brand Primary
          </Button>
          <Button
            theme={brandTheme}
            status="secondary"
            onClick={handleClick}
          >
            Brand Secondary
          </Button>
          <Button
            theme={brandTheme}
            status="muted"
            onClick={handleClick}
          >
            Brand Muted
          </Button>
        </div>
      </section>

      {/* Retro theme */}
      <section style={{
        backgroundColor: '#fffbeb',
        padding: '20px',
        borderRadius: '8px'
      }}>
        <h3>Retro Theme (Bold & Chunky)</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button
            theme={retroTheme}
            status="primary"
            onClick={handleClick}
          >
            Retro Primary
          </Button>
          <Button
            theme={retroTheme}
            status="secondary"
            onClick={handleClick}
          >
            Retro Secondary
          </Button>
          <Button
            theme={retroTheme}
            status="muted"
            onClick={handleClick}
          >
            Retro Muted
          </Button>
        </div>
      </section>

      {/* Size comparison with themes */}
      <section>
        <h3>Theme + Size Variations</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <div>
            <h4>Small Buttons</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <Button size={1} theme={darkTheme} status="primary" onClick={handleClick}>
                Dark Small
              </Button>
              <Button size={1} theme={brandTheme} status="primary" onClick={handleClick}>
                Brand Small
              </Button>
              <Button size={1} theme={retroTheme} status="primary" onClick={handleClick}>
                Retro Small
              </Button>
            </div>
          </div>

          <div>
            <h4>Large Buttons</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <Button size={4} theme={darkTheme} status="primary" onClick={handleClick}>
                Dark Large
              </Button>
              <Button size={4} theme={brandTheme} status="primary" onClick={handleClick}>
                Brand Large
              </Button>
              <Button size={4} theme={retroTheme} status="primary" onClick={handleClick}>
                Retro Large
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Variables documentation */}
      <section style={{
        backgroundColor: '#f8fafc',
        padding: '20px',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <h3>CSS Variables Reference</h3>
        <p>Define these CSS variables in your application to customize the default theme:</p>
        <pre style={{
          backgroundColor: '#1f2937',
          color: '#f9fafb',
          padding: '15px',
          borderRadius: '6px',
          overflow: 'auto'
        }}>
{`:root {
  /* Content colors */
  --content-color-1: #000000;
  --content-color-1-inverse: #ffffff;
  --content-color-2: #374151;
  --content-color-3: #9ca3af;

  /* Background colors */
  --background-color-1-inverse: #000000;

  /* Border colors */
  --border-color-default: #d1d5db;
  --border-width-1: 1px;

  /* Sizes */
  --cell-height-1: 24px;
  --cell-height-2: 32px;
  --cell-height-3: 40px;
  --cell-height-4: 48px;
}`}
        </pre>
      </section>
    </div>
  )
}

export default ThemingExample