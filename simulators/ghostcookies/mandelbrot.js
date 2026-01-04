// Ghost Cookies - Fraud Detection Visualization
// Theme configuration
let theme = {
    background: "#000000",
    foreground: "#00FF88",
    accent: "#005522",
    grid: "#003311"
};

// Load theme
async function loadTheme() {
    try {
        const response = await fetch('config.json');
        const config = await response.json();
        if (config.theme) {
            theme = config.theme;
        }
    } catch (e) {
        console.log('Using default theme');
    }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// View state - perspective view with properly aligned orthogonal axes
// Angles chosen to show axes more straight (less diagonal)
let viewState = {
    rotationX: 15,  // Minimal vertical rotation for straighter appearance
    rotationY: 20,  // Minimal horizontal rotation - axes appear more straight
    zoom: 1.2,      // Increased zoom for better visibility
    centerX: 0,
    centerY: 0,
    time: 0
};

// Shop configuration
let shopConfig = {
    type: 'efficient',
    periods: 50,
    resources: 100,
    threshold: 0.3,
    markovDepth: 3,
    complexity: 2.0
};

// Animation state
let animationRunning = true;
let animationFrameId = null;

// Current shop instance (must be declared before use)
let currentShop = null;

// Resize canvas
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    draw();
}

// Shop Classes
class Shop {
    constructor(type, config) {
        this.type = type;
        this.config = config;
        this.operations = [];
        this.markovBlankets = [];
        this.fractalPoints = [];
    }
    
    generateOperations() {
        this.operations = [];
        for (let i = 0; i < this.config.periods; i++) {
            const operation = this.generateOperation(i);
            this.operations.push(operation);
        }
        this.generateMarkovBlankets();
        if (this.type === 'mandelbrot') {
            this.generateFractal();
        }
    }
    
    generateOperation(period) {
        let cost, efficiency;
        
        switch (this.type) {
            case 'efficient':
                // Optimal: low cost, high efficiency
                cost = 0.2 + Math.random() * 0.1;
                efficiency = 0.85 + Math.random() * 0.1;
                break;
            case 'inefficient':
                // Clear suboptimal: high cost, low efficiency
                cost = 0.6 + Math.random() * 0.3;
                efficiency = 0.3 + Math.random() * 0.2;
                break;
            case 'mandelbrot':
                // Complex fractal-based pattern
                const c = this.mandelbrotValue(period / this.config.periods);
                cost = 0.3 + c * 0.5;
                efficiency = 0.4 + (1 - c) * 0.4;
                // Hidden second-order benefit
                if (c > 0.7) {
                    efficiency += 0.15; // Hidden gain
                }
                break;
        }
        
        return {
            period,
            cost,
            efficiency,
            resources: this.config.resources * (0.9 + Math.random() * 0.2)
        };
    }
    
    mandelbrotValue(t) {
        // Simplified Mandelbrot calculation for visualization
        const maxIter = 100;
        const escapeRadius = 2;
        const cx = -0.75 + Math.sin(t * Math.PI * 2) * 0.5;
        const cy = Math.cos(t * Math.PI * 2) * 0.5;
        
        let x = 0, y = 0;
        let iter = 0;
        
        while (x * x + y * y < escapeRadius * escapeRadius && iter < maxIter) {
            const xtemp = x * x - y * y + cx;
            y = 2 * x * y + cy;
            x = xtemp;
            iter++;
        }
        
        return Math.min(1, iter / maxIter);
    }
    
    generateMarkovBlankets() {
        this.markovBlankets = [];
        const depth = this.config.markovDepth;
        
        for (let i = 0; i < this.operations.length; i++) {
            const blanket = {
                operation: i,
                parents: [],
                spouses: [],
                cost: 0,
                inefficiency: 0
            };
            
            // Generate dependencies (parents and spouses)
            for (let d = 0; d < depth; d++) {
                const parentIdx = Math.max(0, i - (d + 1));
                const spouseIdx = i + (d + 1);
                
                if (parentIdx >= 0) {
                    blanket.parents.push(parentIdx);
                }
                if (spouseIdx < this.operations.length) {
                    blanket.spouses.push(spouseIdx);
                }
            }
            
            // Calculate exponential cost stacking
            let stackCost = this.operations[i].cost;
            for (let d = 0; d < blanket.parents.length; d++) {
                stackCost *= 1 + (0.2 * (d + 1)); // Exponential growth
            }
            blanket.cost = stackCost;
            blanket.inefficiency = Math.min(1, stackCost - this.operations[i].cost);
            
            this.markovBlankets.push(blanket);
        }
    }
    
    generateFractal() {
        if (this.type !== 'mandelbrot') return;
        
        this.fractalPoints = [];
        const width = 200;
        const height = 200;
        const maxIter = 50;
        const escapeRadius = 2;
        
        for (let px = 0; px < width; px++) {
            for (let py = 0; py < height; py++) {
                const cx = (px / width) * 3 - 2;
                const cy = (py / height) * 2 - 1;
                
                let x = 0, y = 0;
                let iter = 0;
                
                while (x * x + y * y < escapeRadius * escapeRadius && iter < maxIter) {
                    const xtemp = x * x - y * y + cx;
                    y = 2 * x * y + cy;
                    x = xtemp;
                    iter++;
                }
                
                if (iter < maxIter) {
                    const density = iter / maxIter;
                    this.fractalPoints.push({
                        x: cx,
                        y: cy,
                        density,
                        iter
                    });
                }
            }
        }
    }
    
    calculateMetrics() {
        const avgEfficiency = this.operations.reduce((sum, op) => sum + op.efficiency, 0) / this.operations.length;
        const avgCost = this.operations.reduce((sum, op) => sum + op.cost, 0) / this.operations.length;
        const maxMarkovCost = Math.max(...this.markovBlankets.map(b => b.cost));
        const fraudProb = Math.min(1, (avgCost - 0.3) / 0.7);
        
        let fractalDim = 0;
        if (this.fractalPoints.length > 0) {
            // Approximate fractal dimension
            fractalDim = 1.5 + (this.fractalPoints.length / 40000) * 0.5;
        }
        
        return {
            efficiency: avgEfficiency,
            costDensity: avgCost,
            markovHeight: maxMarkovCost,
            fractalDimension: fractalDim,
            fraudProbability: fraudProb
        };
    }
    
    getSecondOrderInfo() {
        switch (this.type) {
            case 'efficient':
                // Efficient shops have optimized resource allocation
                const avgEfficiency = this.operations.reduce((sum, op) => sum + op.efficiency, 0) / this.operations.length;
                if (avgEfficiency > 0.8) {
                    return `Optimal Resource Allocation: High efficiency (${(avgEfficiency * 100).toFixed(1)}%) enables maximum throughput with minimal waste. Second-order benefit: Reduced operational overhead and improved scalability for future expansion.`;
                }
                return "Efficient Operations: Standard optimization patterns maintain high performance with minimal resource overhead.";
                
            case 'inefficient':
                // Inefficient shops show clear waste but might have hidden benefits
                const avgCost = this.operations.reduce((sum, op) => sum + op.cost, 0) / this.operations.length;
                const highCostOps = this.operations.filter(op => op.cost > 0.7);
                if (highCostOps.length > this.operations.length * 0.3) {
                    return `Resource Waste Detected: ${highCostOps.length} operations show high cost patterns (avg: ${(avgCost * 100).toFixed(1)}%). Second-order analysis: While inefficient, these patterns may indicate buffer capacity for peak demand handling or redundancy for system resilience.`;
                }
                return "Inefficient Operations: Suboptimal resource allocation detected. No significant second-order benefits identified - optimization recommended.";
                
            case 'mandelbrot':
                // Complex fractal patterns with hidden benefits
                const highComplexityOps = this.operations.filter(op => op.cost > 0.6 && op.efficiency > 0.5);
                if (highComplexityOps.length > 0) {
                    return `Hidden Resource Monitoring: ${highComplexityOps.length} operations show apparent inefficiency but provide superior long-term resource allocation insights. These complex fractal patterns enable predictive optimization unavailable to simple models. Second-order benefit: Advanced pattern recognition enables proactive fraud detection and dynamic resource reallocation.`;
                }
                return "Complex Patterns Detected: Mandelbrot shop operations show fractal-based inefficiencies that may provide hidden monitoring benefits.";
                
            default:
                return "Second-order benefits: Analysis pending.";
        }
    }
}

// Create shop instance
function createShop(type) {
    currentShop = new Shop(type, shopConfig);
    currentShop.generateOperations();
    updateMetrics();
    
    // Cancel any existing animation frame
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    // Start drawing/animation
    draw();
}

// Drawing functions
function clear() {
    ctx.fillStyle = theme.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGrid() {
    ctx.strokeStyle = theme.grid;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.1; // Reduced opacity to avoid covering elements
    
    const gridSize = 50;
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    ctx.globalAlpha = 1.0;
}

function project3D(x, y, z) {
    // Improved 3D to 2D projection with proper orthogonal axis alignment
    const rx = viewState.rotationX * Math.PI / 180;
    const ry = viewState.rotationY * Math.PI / 180;
    
    // Rotate around Y axis first (horizontal rotation)
    let x1 = x * Math.cos(ry) - z * Math.sin(ry);
    let z1 = x * Math.sin(ry) + z * Math.cos(ry);
    
    // Rotate around X axis second (vertical rotation)
    let y1 = y * Math.cos(rx) - z1 * Math.sin(rx);
    z1 = y * Math.sin(rx) + z1 * Math.cos(rx);
    
    // Project to 2D with improved perspective
    const perspective = 800;
    const distance = perspective + z1;
    const scaleFactor = distance > 0 ? perspective / distance : 1;
    
    // Better scaling for consistent axis appearance
    const baseScale = Math.min(canvas.width, canvas.height) / 800;
    
    return {
        x: canvas.width / 2 + (x1 * baseScale + viewState.centerX) * scaleFactor * viewState.zoom,
        y: canvas.height / 2 + (y1 * baseScale + viewState.centerY) * scaleFactor * viewState.zoom,
        z: z1
    };
}

function drawOperations() {
    if (!currentShop || !currentShop.operations.length) return;
    
    const ops = currentShop.operations;
    // Increased scale for better visibility (was 0.3, now 0.5)
    const scale = Math.min(canvas.width, canvas.height) * 0.5;
    
    // Draw efficiency surface (4D projected to 3D/2D)
    ctx.strokeStyle = theme.foreground;
    ctx.lineWidth = 3; // Increased for better visibility
    ctx.shadowBlur = 8; // Glow for visibility
    ctx.shadowColor = theme.foreground;
    
    // Draw surface lines
    for (let i = 0; i < ops.length - 1; i++) {
        const op1 = ops[i];
        const op2 = ops[i + 1];
        
        // X = period, Y = efficiency, Z = cost (4th dim = resources)
        // Improved scaling - spread data out more for better visibility
        const xScale = scale * 1.5; // Wider spread
        const yScale = scale; // Keep Y scale
        const zScale = scale * 0.8; // Increase Z depth
        
        const p1 = project3D(
            ((i / ops.length) - 0.5) * xScale * 2,  // X: periods
            (op1.efficiency - 0.5) * yScale,        // Y: efficiency
            (op1.cost - 0.5) * zScale               // Z: cost
        );
        const p2 = project3D(
            (((i + 1) / ops.length) - 0.5) * xScale * 2,
            (op2.efficiency - 0.5) * yScale,
            (op2.cost - 0.5) * zScale
        );
        
        // Color based on 4th dimension (resources)
        const resourceNorm = (op1.resources - 50) / 150;
        const r = Math.floor(0 + resourceNorm * 255);
        const g = Math.floor(255 - resourceNorm * 100);
        const b = Math.floor(136);
        ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }
    
    // Draw Markov blankets
    drawMarkovBlankets();
    
    // Draw fractal if Mandelbrot shop
    if (currentShop.type === 'mandelbrot') {
        drawFractal();
    }
    
    ctx.shadowBlur = 0;
}

function drawMarkovBlankets() {
    if (!currentShop || !currentShop.markovBlankets.length) return;
    
    const blankets = currentShop.markovBlankets;
    const scale = Math.min(canvas.width, canvas.height) * 0.5;
    const xScale = scale * 1.5;
    const yScale = scale;
    const zScale = scale * 0.8;
    
    for (let i = 0; i < blankets.length; i++) {
        const blanket = blankets[i];
        const op = currentShop.operations[blanket.operation];
        
        const basePos = project3D(
            ((blanket.operation / blankets.length) - 0.5) * xScale * 2,
            (op.efficiency - 0.5) * yScale,
            (op.cost - 0.5) * zScale
        );
        
        // Draw stacked dependencies (parents)
        let stackY = 0;
        for (let d = 0; d < blanket.parents.length; d++) {
            const parentOp = currentShop.operations[blanket.parents[d]];
            const parentPos = project3D(
                ((blanket.parents[d] / blankets.length) - 0.5) * xScale * 2,
                (parentOp.efficiency - 0.5) * yScale,
                (parentOp.cost - 0.5) * zScale
            );
            
            // Color based on inefficiency (red for high)
            const inefficiency = blanket.inefficiency;
            const red = Math.floor(inefficiency * 255);
            const green = Math.floor((1 - inefficiency) * 100);
            ctx.strokeStyle = `rgb(${red}, ${green}, 0)`;
            ctx.lineWidth = 1 + inefficiency * 2;
            ctx.globalAlpha = 0.6;
            
            ctx.beginPath();
            ctx.moveTo(basePos.x, basePos.y - stackY);
            ctx.lineTo(parentPos.x, parentPos.y);
            ctx.stroke();
            
            stackY += 5 * (d + 1); // Exponential stacking
        }
        
        // Draw connection to spouses
        for (let d = 0; d < blanket.spouses.length; d++) {
            const spouseOp = currentShop.operations[blanket.spouses[d]];
            const spousePos = project3D(
                ((blanket.spouses[d] / blankets.length) - 0.5) * xScale * 2,
                (spouseOp.efficiency - 0.5) * yScale,
                (spouseOp.cost - 0.5) * zScale
            );
            
            ctx.strokeStyle = `rgba(0, 255, 136, 0.3)`;
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.4;
            
            ctx.beginPath();
            ctx.moveTo(basePos.x, basePos.y);
            ctx.lineTo(spousePos.x, spousePos.y);
            ctx.stroke();
        }
        
        ctx.globalAlpha = 1.0;
    }
}

function drawFractal() {
    if (!currentShop || !currentShop.fractalPoints.length) return;
    
    const points = currentShop.fractalPoints;
    const time = viewState.time;
    
    // Ensure alpha is set properly for fractals
    ctx.globalAlpha = 0.8; // More visible for better readability
    
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        
        // Animate fractal growth
        const growth = Math.sin(time * 0.01 + point.density * 10) * 0.5 + 0.5;
        const size = 2 + growth * 3;
        
        // Position in 3D space
        const pos = project3D(
            point.x * 100,
            point.y * 100,
            point.density * 50 - 25 + Math.sin(time * 0.02 + i) * 10
        );
        
        // Color based on density and time
        const hue = (point.density * 360 + time * 2) % 360;
        const r = Math.floor(128 + Math.sin(hue * Math.PI / 180) * 127);
        const g = Math.floor(128 + Math.sin((hue + 120) * Math.PI / 180) * 127);
        const b = Math.floor(128 + Math.sin((hue + 240) * Math.PI / 180) * 127);
        
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.shadowBlur = 5;
        ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
        
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.globalAlpha = 1.0;
    ctx.shadowBlur = 0;
}

function drawAxes() {
    // Use consistent scale with data for proper alignment
    const baseScale = Math.min(canvas.width, canvas.height) / 800;
    const scale = Math.min(canvas.width, canvas.height) * 0.5;
    const length = scale; // Match data scale
    
    // Ensure axes are orthogonal - draw from origin along X, Y, Z directions
    const origin = project3D(0, 0, 0);
    const xEnd = project3D(length, 0, 0);   // X axis: +X direction
    const yEnd = project3D(0, length, 0);   // Y axis: +Y direction (up)
    const zEnd = project3D(0, 0, length);   // Z axis: +Z direction (forward)
    
    // Ensure we're drawing with full opacity
    ctx.globalAlpha = 1.0;
    ctx.strokeStyle = theme.foreground;
    ctx.lineWidth = 4; // Thicker for better visibility
    ctx.shadowBlur = 10;
    ctx.shadowColor = theme.foreground;
    
    // X axis (Periods) - horizontal
    if (origin && xEnd && isFinite(origin.x) && isFinite(xEnd.x)) {
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(xEnd.x, xEnd.y);
        ctx.stroke();
    }
    
    // Y axis (Efficiency) - vertical (in 3D space, appears vertical when rotated correctly)
    if (origin && yEnd && isFinite(origin.x) && isFinite(yEnd.x)) {
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(yEnd.x, yEnd.y);
        ctx.stroke();
    }
    
    // Z axis (Cost) - depth
    if (origin && zEnd && isFinite(origin.x) && isFinite(zEnd.x)) {
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(zEnd.x, zEnd.y);
        ctx.stroke();
    }
    
    // Draw axis labels with enhanced visibility for readability
    ctx.shadowBlur = 8;
    ctx.shadowColor = theme.background;
    ctx.font = 'bold 18px monospace'; // Increased from 14px for better readability
    ctx.fillStyle = theme.foreground;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    
    // X axis label with background for contrast
    if (xEnd.x !== undefined && isFinite(xEnd.x)) {
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(xEnd.x + 5, xEnd.y - 12, 120, 24);
        ctx.fillStyle = theme.foreground;
        ctx.fillText('PERIODS →', xEnd.x + 10, xEnd.y);
        ctx.restore();
    }
    
    // Y axis label with background
    if (yEnd.x !== undefined && isFinite(yEnd.x)) {
        ctx.save();
        ctx.translate(yEnd.x - 20, yEnd.y);
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(-5, -12, 140, 24);
        ctx.fillStyle = theme.foreground;
        ctx.fillText('↑ EFFICIENCY', 0, 0);
        ctx.restore();
    }
    
    // Z axis label with background
    if (zEnd.x !== undefined && isFinite(zEnd.x)) {
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(zEnd.x + 5, zEnd.y - 12, 100, 24);
        ctx.fillStyle = theme.foreground;
        ctx.fillText('COST →', zEnd.x + 10, zEnd.y);
        ctx.restore();
    }
    
    // Draw origin marker
    ctx.fillStyle = theme.foreground;
    ctx.beginPath();
    ctx.arc(origin.x, origin.y, 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1.0;
}

function draw() {
    // Reset all context state to defaults
    ctx.globalAlpha = 1.0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
    
    clear();
    
    // Draw grid first (behind everything) with very low opacity
    drawGrid();
    
    // Ensure alpha is reset after grid
    ctx.globalAlpha = 1.0;
    
    if (currentShop) {
        drawOperations();
    }
    
    drawAxes();
    
    // Handle continuous navigation (WASD, arrow keys)
    continuousNavigation();
    
    // Animation loop - only continue if animation is running
    if (animationRunning) {
        viewState.time += 1;
        animationFrameId = requestAnimationFrame(draw);
    }
}

// UI Functions
function selectShop(type) {
    shopConfig.type = type;
    
    // Update button states immediately for instant visual feedback
    // Remove active from all first, then add to selected
    document.getElementById('btn-efficient').classList.remove('active');
    document.getElementById('btn-inefficient').classList.remove('active');
    document.getElementById('btn-mandelbrot').classList.remove('active');
    
    // Add active to selected button immediately
    const activeId = `btn-${type}`;
    document.getElementById(activeId).classList.add('active');
    
    // Show loading indicator
    showLoadingIndicator(`Loading ${type.charAt(0).toUpperCase() + type.slice(1)} Shop data...`);
    
    // Create shop (this might take a moment, so we show feedback first)
    setTimeout(() => {
        createShop(type);
        // Delay hiding to show animation
        setTimeout(() => {
            hideLoadingIndicator();
        }, 300);
    }, 50); // Small delay to ensure UI updates and show spinner
}

// Loading indicator functions with animated spinner
let loadingAnimationFrame = null;
function showLoadingIndicator(message) {
    let loader = document.getElementById('loading-indicator');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'loading-indicator';
        loader.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid #00FF88;
            padding: 40px 60px;
            z-index: 2000;
            box-shadow: 0 0 40px rgba(0, 255, 136, 0.8);
            text-align: center;
            font-size: 18px;
            color: #00FF88;
            border-radius: 8px;
        `;
        document.body.appendChild(loader);
    }
    
    loader.innerHTML = `
        <div style="margin-bottom: 20px; font-weight: bold;">${message}</div>
        <div id="spinner-container" style="margin: 20px auto; width: 60px; height: 60px; position: relative;"></div>
        <div style="font-size: 14px; color: #00AA66; margin-top: 15px;">Generating data...</div>
    `;
    
    // Animated spinner
    const spinnerContainer = document.getElementById('spinner-container');
    const spinnerCanvas = document.createElement('canvas');
    spinnerCanvas.width = 60;
    spinnerCanvas.height = 60;
    spinnerContainer.appendChild(spinnerCanvas);
    const spinnerCtx = spinnerCanvas.getContext('2d');
    
    let spinnerAngle = 0;
    function animateSpinner() {
        spinnerCtx.clearRect(0, 0, 60, 60);
        spinnerCtx.strokeStyle = '#00FF88';
        spinnerCtx.lineWidth = 4;
        spinnerCtx.lineCap = 'round';
        spinnerCtx.shadowBlur = 10;
        spinnerCtx.shadowColor = '#00FF88';
        
        // Draw rotating arc
        spinnerCtx.beginPath();
        spinnerCtx.arc(30, 30, 25, spinnerAngle, spinnerAngle + Math.PI * 1.5);
        spinnerCtx.stroke();
        
        spinnerAngle += 0.1;
        if (spinnerAngle > Math.PI * 2) spinnerAngle = 0;
        
        loadingAnimationFrame = requestAnimationFrame(animateSpinner);
    }
    animateSpinner();
    
    // Make loader visible
    loader.style.display = 'block';
    loader.style.opacity = '1';
}

function hideLoadingIndicator() {
    // Stop spinner animation first
    if (loadingAnimationFrame) {
        cancelAnimationFrame(loadingAnimationFrame);
        loadingAnimationFrame = null;
    }
    
    const loader = document.getElementById('loading-indicator');
    if (loader) {
        // Fade out animation
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.3s';
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 300);
    }
}

function updateMetrics() {
    if (!currentShop) return;
    
    const metrics = currentShop.calculateMetrics();
    const fraudProb = metrics.fraudProbability;
    
    document.getElementById('efficiency').textContent = (metrics.efficiency * 100).toFixed(1) + '%';
    document.getElementById('cost-density').textContent = metrics.costDensity.toFixed(3);
    document.getElementById('markov-height').textContent = metrics.markovHeight.toFixed(3);
    document.getElementById('fractal-dim').textContent = metrics.fractalDimension.toFixed(2);
    document.getElementById('fraud-prob').textContent = (fraudProb * 100).toFixed(1) + '%';
    
    // Update fraud indicator
    const indicator = document.getElementById('fraud-indicator');
    indicator.className = 'fraud-indicator ';
    if (fraudProb < 0.3) {
        indicator.classList.add('fraud-low');
    } else if (fraudProb < 0.7) {
        indicator.classList.add('fraud-medium');
    } else {
        indicator.classList.add('fraud-high');
    }
    
    // Update second-order info
    document.getElementById('second-order-info').textContent = currentShop.getSecondOrderInfo();
}

function resetView() {
    viewState.rotationX = 15; // Match new default (straighter axes)
    viewState.rotationY = 20;
    viewState.zoom = 1.2;
    viewState.centerX = 0;
    viewState.centerY = 0;
    if (!animationRunning) {
        // If animation is paused, draw once
        draw();
    }
}

function toggleAnimation() {
    animationRunning = !animationRunning;
    document.getElementById('btn-animate').textContent = animationRunning ? 'Pause Animation' : 'Start Animation';
    
    if (animationRunning) {
        // Restart animation loop
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        draw();
    } else {
        // Stop animation
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }
}

// Event listeners
document.getElementById('periods').addEventListener('input', (e) => {
    shopConfig.periods = parseInt(e.target.value);
    document.getElementById('periods-value').textContent = shopConfig.periods;
    createShop(shopConfig.type);
});

document.getElementById('resources').addEventListener('input', (e) => {
    shopConfig.resources = parseInt(e.target.value);
    document.getElementById('resources-value').textContent = shopConfig.resources;
    createShop(shopConfig.type);
});

document.getElementById('threshold').addEventListener('input', (e) => {
    shopConfig.threshold = parseFloat(e.target.value);
    document.getElementById('threshold-value').textContent = shopConfig.threshold.toFixed(2);
    updateMetrics();
});

document.getElementById('depth').addEventListener('input', (e) => {
    shopConfig.markovDepth = parseInt(e.target.value);
    document.getElementById('depth-value').textContent = shopConfig.markovDepth;
    createShop(shopConfig.type);
});

document.getElementById('complexity').addEventListener('input', (e) => {
    shopConfig.complexity = parseFloat(e.target.value);
    document.getElementById('complexity-value').textContent = shopConfig.complexity.toFixed(1);
    if (shopConfig.type === 'mandelbrot') {
        createShop('mandelbrot');
    }
});

// Mouse controls
let mouseDown = false;
let mouseButton = 0;
let lastMouseX = 0;
let lastMouseY = 0;

canvas.addEventListener('mousedown', (e) => {
    e.preventDefault();
    mouseDown = true;
    mouseButton = e.button;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
});

canvas.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        
        if (mouseButton === 0) {
            // Left mouse: Pan
            viewState.centerX += deltaX * 0.5;
            viewState.centerY += deltaY * 0.5;
        } else if (mouseButton === 2) {
            // Right mouse: Rotate
            viewState.rotationY += deltaX * 0.5;
            viewState.rotationX += deltaY * 0.5;
        }
        
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        draw();
    }
});

canvas.addEventListener('mouseup', () => {
    mouseDown = false;
    mouseButton = 0;
});

canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    viewState.zoom *= delta;
    viewState.zoom = Math.max(0.1, Math.min(5, viewState.zoom));
    draw();
});

// Instructions pane
let instructionsVisible = false;
function toggleInstructions() {
    instructionsVisible = !instructionsVisible;
    const pane = document.getElementById('instructions-pane');
    if (pane) {
        pane.style.display = instructionsVisible ? 'block' : 'none';
    }
}

// Make toggleInstructions globally accessible
window.toggleInstructions = toggleInstructions;

// Keyboard controls
const keys = {};

// Continuous navigation for WASD and arrow keys
function continuousNavigation() {
    const panSpeed = 2;
    const rotateSpeed = 1;
    let needsRedraw = false;
    
    // WASD for panning
    if (keys['w']) {
        viewState.centerY -= panSpeed;
        needsRedraw = true;
    }
    if (keys['s']) {
        viewState.centerY += panSpeed;
        needsRedraw = true;
    }
    if (keys['a']) {
        viewState.centerX -= panSpeed;
        needsRedraw = true;
    }
    if (keys['d']) {
        viewState.centerX += panSpeed;
        needsRedraw = true;
    }
    
    // Arrow keys for rotation
    if (keys['arrowup']) {
        viewState.rotationX -= rotateSpeed;
        needsRedraw = true;
    }
    if (keys['arrowdown']) {
        viewState.rotationX += rotateSpeed;
        needsRedraw = true;
    }
    if (keys['arrowleft']) {
        viewState.rotationY -= rotateSpeed;
        needsRedraw = true;
    }
    if (keys['arrowright']) {
        viewState.rotationY += rotateSpeed;
        needsRedraw = true;
    }
    
    // If animation is not running but keys are pressed, trigger a redraw
    if (needsRedraw && !animationRunning) {
        // Use requestAnimationFrame to avoid blocking
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(() => {
                draw();
                animationFrameId = null;
            });
        }
    }
}

document.addEventListener('keydown', (e) => {
    // Don't capture keys when typing in inputs
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    
    const key = e.key.toLowerCase();
    keys[key] = true;
    
    // Handle special keys
    if (key === 'i') {
        e.preventDefault();
        toggleInstructions();
    }
    
    // Zoom with < and >
    if (e.key === ',' || e.key === '<') {
        e.preventDefault();
        viewState.zoom *= 0.9;
        viewState.zoom = Math.max(0.1, Math.min(5, viewState.zoom));
        if (!animationRunning) draw();
    } else if (e.key === '.' || e.key === '>') {
        e.preventDefault();
        viewState.zoom *= 1.1;
        viewState.zoom = Math.max(0.1, Math.min(5, viewState.zoom));
        if (!animationRunning) draw();
    }
    
    // Arrow keys (handle as arrowup, arrowdown, etc.)
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        keys['arrowup'] = true;
    }
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        keys['arrowdown'] = true;
    }
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        keys['arrowleft'] = true;
    }
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        keys['arrowright'] = true;
    }
    
    // Prevent default for WASD to avoid page scrolling
    if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
        e.preventDefault();
    }
    
    // Trigger continuous navigation if keys are pressed
    continuousNavigation();
});

document.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    keys[key] = false;
    
    // Handle arrow keys
    if (e.key === 'ArrowUp') keys['arrowup'] = false;
    if (e.key === 'ArrowDown') keys['arrowdown'] = false;
    if (e.key === 'ArrowLeft') keys['arrowleft'] = false;
    if (e.key === 'ArrowRight') keys['arrowright'] = false;
});

// Initialize after DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    loadTheme().then(() => {
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        createShop('efficient');
        // Start animation loop
        if (animationRunning) {
            draw();
        }
    });
});
