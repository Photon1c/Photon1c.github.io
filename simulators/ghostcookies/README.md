# Ghost Cookies - Fraud Detection Visualization

![cover](https://github.com/Photon1c/Photon1c.github.io/blob/main/images/ghostcookies.png)

## Overview

The Ghost Cookies Fraud Detection System is an interactive 3D visualization tool designed to identify inefficiencies and potential fraud in franchise operations. The system analyzes three types of shops—Efficient, Inefficient, and Mandelbrot—using Markov blanket dependency analysis, fractal complexity detection, and second-order benefit evaluation.

## Core Concepts

### Shop Types

1. **Efficient Shop**
   - Optimal resource allocation with low cost and high efficiency
   - Minimal waste and streamlined operations
   - High efficiency scores (typically 85-95%)
   - Low cost density (typically 0.2-0.3)

2. **Inefficient Shop**
   - Clear suboptimal patterns with high cost and low efficiency
   - Visible resource waste and operational bottlenecks
   - Low efficiency scores (typically 30-50%)
   - High cost density (typically 0.6-0.9)
   - May show buffer capacity or system resilience as hidden benefits

3. **Mandelbrot Shop**
   - Complex fractal-based inefficiency patterns
   - Apparent inefficiencies that provide hidden monitoring benefits
   - Dynamic patterns that enable predictive optimization
   - Second-order benefits include proactive fraud detection

## Phases and Cycles

### Phase 1: Operation Generation
Each shop generates a series of operations over multiple time periods. During this phase:
- **Operation Periods**: Configurable number of time periods to analyze (default: 50)
- **Resource Level**: Available resources per period (default: 100)
- Operations are generated with cost, efficiency, and resource metrics
- Each operation period represents one cycle in the business operation

### Phase 2: Markov Blanket Analysis
The system analyzes dependency relationships between operations:
- **Markov Depth**: Controls how many layers of dependencies are analyzed (default: 3)
- **Parents**: Previous operations that influence current operations
- **Spouses**: Related operations that share dependencies
- **Exponential Cost Stacking**: Each dependency layer multiplies costs exponentially
  - Layer 1: 1.2x multiplier
  - Layer 2: 1.4x multiplier  
  - Layer 3: 1.6x multiplier
- **Visualization**: Red lines indicate high inefficiency, green lines indicate low inefficiency

### Phase 3: Fractal Pattern Generation (Mandelbrot Shop Only)
For Mandelbrot shops, the system generates complex fractal patterns:
- **Fractal Complexity**: Controls the detail level of generated patterns (default: 2.0)
- **Mandelbrot Set Calculation**: Uses iterative calculations to identify complex, self-similar patterns
- **Hidden Benefits**: Apparent inefficiencies reveal predictive optimization opportunities
- **Animated Visualization**: Fractal points pulse and evolve over time

### Phase 4: Metric Calculation
The system calculates comprehensive metrics:
- **Efficiency Score**: Average efficiency across all operations (0-100%)
- **Cost Density**: Average cost per operation (0-1 scale)
- **Markov Stack Height**: Maximum cost after dependency stacking
- **Fractal Dimension**: Complexity measure for Mandelbrot patterns (1.5-2.0)
- **Fraud Probability**: Risk score based on cost patterns (0-100%)

### Phase 5: Second-Order Benefit Analysis
The system evaluates hidden benefits of apparent inefficiencies:
- **Efficient Shop**: Identifies scalability and optimization benefits
- **Inefficient Shop**: Discovers buffer capacity and system resilience
- **Mandelbrot Shop**: Reveals predictive optimization and proactive fraud detection capabilities

## Operational Cycles

### Cycle 1: Data Generation
- User selects shop type and configures parameters
- System generates operations for all periods
- Markov blankets are created with dependency relationships
- Fractal patterns are generated (Mandelbrot shops only)

### Cycle 2: Visualization Rendering
- 3D surface plot displays efficiency vs. cost over time
- X-axis: Operation Periods (time progression)
- Y-axis: Efficiency Score (vertical)
- Z-axis: Cost Density (depth)
- Color coding: Resource Level (4th dimension)

### Cycle 3: Real-Time Analysis
- Metrics are continuously calculated and updated
- Fraud probability is evaluated based on threshold
- Second-order benefits are analyzed and displayed
- Animation loop updates fractal patterns and visualizations

### Cycle 4: Interactive Exploration
- User can adjust parameters in real-time
- Visualization updates dynamically
- Camera controls allow 3D navigation
- Different shop types can be compared

## Fraud Detection Mechanisms

1. **Exponential Cost Stacking**: Identifies when Markov blanket dependencies create exponentially growing costs that exceed normal operation costs.

2. **Pattern Analysis**: Compares actual efficiency patterns against optimal baselines to detect anomalies.

3. **Fractal Complexity Indicators**: Uses Mandelbrot set calculations to identify complex, hidden inefficiency patterns that simple analysis might miss.

4. **Second-Order Benefit Analysis**: Evaluates whether apparent inefficiencies serve hidden purposes, distinguishing between fraud and strategic complexity.

## Technical Implementation

- **Rendering**: Canvas 2D with 3D projection mathematics
- **3D Projection**: Custom perspective transformation with rotation, zoom, and panning
- **Animation**: RequestAnimationFrame-based animation loop
- **Data Generation**: Procedural generation of operations, Markov blankets, and fractal patterns
- **Interactive Controls**: Mouse (drag, scroll) and keyboard (WASD, arrows, I key)

## Usage

1. **Select Shop Type**: Choose Efficient, Inefficient, or Mandelbrot shop
2. **Adjust Parameters**: Modify operation periods, resources, thresholds, Markov depth, and fractal complexity
3. **Navigate**: Use mouse and keyboard controls to explore the 3D visualization
4. **Analyze**: Review metrics, fraud probability, and second-order benefits
5. **Compare**: Switch between shop types to identify patterns and anomalies

## Key Insights

- **Efficient shops** show consistent, optimal patterns with minimal variance
- **Inefficient shops** display clear waste but may have strategic hidden benefits
- **Mandelbrot shops** demonstrate that apparent inefficiencies can enable superior long-term optimization through complex pattern recognition

The system reveals that fraud detection requires not just identifying inefficiencies, but understanding the deeper purpose and second-order effects of operational patterns.




