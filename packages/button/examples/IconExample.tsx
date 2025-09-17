import React from 'react'
import Button from '../src'

/**
 * Example showing buttons with icons using nice-react-icon
 * Icons are automatically rendered from the icon name string
 */
const IconExample: React.FC = () => {
  const handleClick = () => {
    console.log('Icon button clicked!')
  }

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2>Icon Button Examples</h2>

      {/* Icons with text */}
      <section>
        <h3>Icons with Text</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button
            icon="arrow"
            iconPosition="right"
            onClick={handleClick}
          >
            Next
          </Button>
          <Button
            icon="arrow"
            iconPosition="left"
            iconRotation={180}
            onClick={handleClick}
          >
            Previous
          </Button>
          <Button
            icon="check"
            iconPosition="left"
            status="primary"
            onClick={handleClick}
          >
            Save
          </Button>
          <Button
            icon="plus"
            iconPosition="left"
            status="secondary"
            onClick={handleClick}
          >
            Add Item
          </Button>
        </div>
      </section>

      {/* Icon-only buttons */}
      <section>
        <h3>Icon-Only Buttons</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Button
            icon="search"
            aria-label="Search"
            onClick={handleClick}
          />
          <Button
            icon="plus"
            status="primary"
            aria-label="Add new item"
            onClick={handleClick}
          />
          <Button
            icon="x"
            status="secondary"
            aria-label="Close"
            onClick={handleClick}
          />
        </div>
      </section>

      {/* Icon rotations */}
      <section>
        <h3>Icon Rotations</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Button
            icon="arrow"
            iconRotation={0}
            onClick={handleClick}
          >
            Right
          </Button>
          <Button
            icon="arrow"
            iconRotation={90}
            onClick={handleClick}
          >
            Down
          </Button>
          <Button
            icon="arrow"
            iconRotation={180}
            onClick={handleClick}
          >
            Left
          </Button>
          <Button
            icon="arrow"
            iconRotation={270}
            onClick={handleClick}
          >
            Up
          </Button>
        </div>
      </section>

      {/* Different sizes with icons */}
      <section>
        <h3>Icon Sizes</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Button
            size={1}
            icon="check"
            onClick={handleClick}
          >
            Small
          </Button>
          <Button
            size={2}
            icon="check"
            onClick={handleClick}
          >
            Medium
          </Button>
          <Button
            size={3}
            icon="check"
            onClick={handleClick}
          >
            Large
          </Button>
          <Button
            size={4}
            icon="check"
            onClick={handleClick}
          >
            Extra Large
          </Button>
        </div>
      </section>
    </div>
  )
}

export default IconExample