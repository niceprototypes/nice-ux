import React from 'react'
import Button, { IconComponentProps } from '../src'

/**
 * Example icon component that implements IconComponentProps
 * This demonstrates how to create a custom icon component
 */
const ExampleIcon: React.FC<IconComponentProps> = ({
  name,
  size = 3,
  color = 'currentColor',
  rotation = 0,
  strokeWidth = 2,
  className
}) => {
  // Calculate icon size based on button size
  const iconSize = size * 6

  // Icon definitions - in a real app, these would come from an icon library
  const getIconPath = (iconName?: string) => {
    switch (iconName) {
      case 'arrow':
        return <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      case 'check':
        return <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
      case 'plus':
        return <path d="M12 5v14m-7-7h14" strokeLinecap="round" strokeLinejoin="round" />
      case 'x':
        return <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
      case 'search':
        return (
          <>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )
      default:
        // Default spacer icon (invisible)
        return null
    }
  }

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.2s ease'
      }}
      className={className}
    >
      {getIconPath(name)}
    </svg>
  )
}

/**
 * Example showing buttons with icons
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
            iconComponent={ExampleIcon}
            onClick={handleClick}
          >
            Next
          </Button>
          <Button
            icon="arrow"
            iconPosition="left"
            iconRotation={180}
            iconComponent={ExampleIcon}
            onClick={handleClick}
          >
            Previous
          </Button>
          <Button
            icon="check"
            iconPosition="left"
            iconComponent={ExampleIcon}
            status="primary"
            onClick={handleClick}
          >
            Save
          </Button>
          <Button
            icon="plus"
            iconPosition="left"
            iconComponent={ExampleIcon}
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
            iconComponent={ExampleIcon}
            aria-label="Search"
            onClick={handleClick}
          />
          <Button
            icon="plus"
            iconComponent={ExampleIcon}
            status="primary"
            aria-label="Add new item"
            onClick={handleClick}
          />
          <Button
            icon="x"
            iconComponent={ExampleIcon}
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
            iconComponent={ExampleIcon}
            onClick={handleClick}
          >
            Right
          </Button>
          <Button
            icon="arrow"
            iconRotation={90}
            iconComponent={ExampleIcon}
            onClick={handleClick}
          >
            Down
          </Button>
          <Button
            icon="arrow"
            iconRotation={180}
            iconComponent={ExampleIcon}
            onClick={handleClick}
          >
            Left
          </Button>
          <Button
            icon="arrow"
            iconRotation={270}
            iconComponent={ExampleIcon}
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
            iconComponent={ExampleIcon}
            onClick={handleClick}
          >
            Small
          </Button>
          <Button
            size={2}
            icon="check"
            iconComponent={ExampleIcon}
            onClick={handleClick}
          >
            Medium
          </Button>
          <Button
            size={3}
            icon="check"
            iconComponent={ExampleIcon}
            onClick={handleClick}
          >
            Large
          </Button>
          <Button
            size={4}
            icon="check"
            iconComponent={ExampleIcon}
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