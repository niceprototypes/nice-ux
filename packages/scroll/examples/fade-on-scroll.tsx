/**
 * Fade on Scroll Example
 *
 * This example demonstrates various fade effects using `<Scroll fade>`.
 */

import React from 'react'
import { Scroll } from '@niceprototypes/scroll'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const Hero = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
`

const Section = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Card = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 400px;
  background: #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #666;
`

export default function FadeExample() {
  return (
    <Scroll root>
      {/* Hero section with fade in */}
      <Scroll fade={{ start: 0, peak: 30, opacity: [0.3, 1, 0] }}>
        <Hero>
          <div>
            <h1>Fade Effects Demo</h1>
            <p>Scroll down to see various fade animations</p>
          </div>
        </Hero>
      </Scroll>

      <Container>
        {/* Fade in example */}
        <Section>
          <Scroll fade={{ start: 20, peak: 50 }}>
            <Card>
              <h2>Fade In</h2>
              <p>This card fades in as you scroll.</p>
              <p>
                <strong>Configuration:</strong> start=20, peak=50
              </p>
            </Card>
          </Scroll>
        </Section>

        {/* Fade in and out example */}
        <Section>
          <Scroll fade={{ start: 10, peak: 50, end: 90, opacity: [0.2, 1, 0.2] }}>
            <Card>
              <h2>Fade In and Out</h2>
              <p>This card fades in as it enters, then fades out as it exits.</p>
              <p>
                <strong>Configuration:</strong> Fades from 0.2 to 1 to 0.2
              </p>
            </Card>
          </Scroll>
        </Section>

        {/* Parallax-style fade for background */}
        <Section>
          <Scroll fade={{ start: 0, peak: 30, end: 70, opacity: [0.3, 1, 0.3] }}>
            <div>
              <ImageWrapper>Background Image</ImageWrapper>
              <Card style={{ marginTop: '2rem' }}>
                <h2>Parallax-Style Fade</h2>
                <p>The image above uses a subtle fade effect for a parallax feel.</p>
              </Card>
            </div>
          </Scroll>
        </Section>

        {/* Quick fade */}
        <Section>
          <Scroll fade={{ start: 30, peak: 40 }}>
            <Card>
              <h2>Quick Fade</h2>
              <p>This card fades in quickly over a short scroll distance.</p>
              <p>
                <strong>Configuration:</strong> Only 10% scroll distance (30-40)
              </p>
            </Card>
          </Scroll>
        </Section>

        {/* Slow fade */}
        <Section>
          <Scroll fade={{ start: 0, peak: 80 }}>
            <Card>
              <h2>Slow Fade</h2>
              <p>This card fades in slowly over a long scroll distance.</p>
              <p>
                <strong>Configuration:</strong> 80% scroll distance (0-80)
              </p>
            </Card>
          </Scroll>
        </Section>
      </Container>
    </Scroll>
  )
}