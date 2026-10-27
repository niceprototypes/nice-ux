import React from 'react'
import Button from '../src'

/**
 * Basic example showing different button variants and sizes
 */
const BasicExample: React.FC = () => {
  const handleClick = () => {
    console.log('Button clicked!')
  }

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2>Basic Button Examples</h2>

      {/* Status variants */}
      <section>
        <h3>Status Variants</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button status="primary" onClick={handleClick}>
            Primary
          </Button>
          <Button status="secondary" onClick={handleClick}>
            Secondary
          </Button>
          <Button status="default" onClick={handleClick}>
            Default
          </Button>
          <Button status="muted" onClick={handleClick}>
            Muted
          </Button>
          <Button status="highlighted" onClick={handleClick}>
            Highlighted
          </Button>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h3>Sizes</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Button size={1} onClick={handleClick}>
            Size 1
          </Button>
          <Button size={2} onClick={handleClick}>
            Size 2
          </Button>
          <Button size={3} onClick={handleClick}>
            Size 3
          </Button>
          <Button size={4} onClick={handleClick}>
            Size 4
          </Button>
        </div>
      </section>

      {/* States */}
      <section>
        <h3>States</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button state="default" onClick={handleClick}>
            Default
          </Button>
          <Button state="success" onClick={handleClick}>
            Success
          </Button>
          <Button state="error" onClick={handleClick}>
            Error
          </Button>
          <Button state="warning" onClick={handleClick}>
            Warning
          </Button>
          <Button state="active" onClick={handleClick}>
            Active
          </Button>
          <Button state="disabled">
            Disabled
          </Button>
        </div>
      </section>

      {/* Full width */}
      <section>
        <h3>Full Width</h3>
        <Button fullWidth status="primary" onClick={handleClick}>
          Full Width Button
        </Button>
      </section>
    </div>
  )
}

export default BasicExample