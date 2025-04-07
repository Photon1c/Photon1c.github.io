<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Standalone Office Simulator</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            font-family: Arial, sans-serif;
        }
        #loading {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            z-index: 1000;
        }
        #progress-bar-container {
            width: 50%;
            height: 20px;
            background-color: #333;
            border-radius: 10px;
            margin-top: 20px;
        }
        #progress-bar {
            height: 100%;
            background-color: #4CAF50;
            border-radius: 10px;
            width: 0%;
            transition: width 0.3s;
        }
        #controls {
            position: fixed;
            top: 10px;
            left: 10px;
            z-index: 100;
            display: flex;
            gap: 10px;
        }
        .btn {
            padding: 8px 12px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        .btn:hover {
            background-color: #45a049;
        }
        #clock {
            position: fixed;
            top: 10px;
            right: 10px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 16px;
            z-index: 100;
        }
        #instructions {
            position: fixed;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            font-family: monospace;
            text-align: center;
            z-index: 100;
            max-width: 80%;
        }
        .panel {
            position: fixed;
            top: 60px;
            right: 10px;
            width: 300px;
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            z-index: 200;
            display: none;
            max-height: 80vh;
            overflow-y: auto;
        }
        .panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }
        .panel-title {
            margin: 0;
            color: #4CAF50;
        }
        .close-btn {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #666;
        }
        .task-item {
            padding: 10px;
            margin-bottom: 8px;
            background-color: #f5f5f5;
            border-radius: 4px;
            border-left: 4px solid #4CAF50;
        }
        .task-header {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .task-progress {
            width: 100%;
            height: 8px;
            background-color: #ddd;
            border-radius: 4px;
            margin-top: 5px;
        }
        .task-progress-bar {
            height: 100%;
            background-color: #4CAF50;
            border-radius: 4px;
            width: 0%;
        }
        #worker-stats-card {
            position: fixed;
            bottom: 10px;
            right: 10px;
            width: 280px;
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            z-index: 200;
            display: none;
            font-family: Arial, sans-serif;
        }
        #worker-stats-card h3 {
            margin-top: 0;
            color: #4CAF50;
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 5px;
        }
        .stat-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        .stat-label {
            font-weight: bold;
        }
        .stat-bar {
            height: 8px;
            background-color: #eee;
            border-radius: 4px;
            margin-top: 5px;
            width: 100%;
        }
        .stat-fill {
            height: 100%;
            border-radius: 4px;
            background-color: #4CAF50;
        }
        .stat-skills {
            margin-top: 15px;
        }
        .unfocus-btn {
            margin-top: 10px;
            padding: 5px 10px;
            background-color: #f44336;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
        }
    </style>
    <!-- Load external libraries with regular script tags -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/gsap.min.js"></script>
    
    <!-- Simplified OrbitControls script -->
    <script>
        // Simple OrbitControls implementation for Three.js
        THREE.OrbitControls = function(camera, domElement) {
            this.camera = camera;
            this.domElement = domElement;
            this.target = new THREE.Vector3();
            
            // Default settings - improved for smoother experience
            this.enableDamping = true;
            this.dampingFactor = 0.1;
            this.screenSpacePanning = true;
            this.minDistance = 2;
            this.maxDistance = 30;
            this.minPolarAngle = 0.1;
            this.maxPolarAngle = Math.PI / 1.5; // Allow more vertical rotation
            
            // Internal state
            const scope = this;
            const STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2 };
            let state = STATE.NONE;
            
            // Mouse positions
            const pointerPos = new THREE.Vector2();
            const pointerOld = new THREE.Vector2();
            
            // Rotation and scaling factors - Balanced for better control
            const rotateSpeed = 1.0;
            const zoomSpeed = 1.0; // Base zoom speed (actual zoom will be more responsive)
            const panSpeed = 1.0;
            
            // Damping variables
            const rotateStart = new THREE.Vector2();
            const rotateEnd = new THREE.Vector2();
            const rotateDelta = new THREE.Vector2();
            const spherical = new THREE.Spherical();
            const sphericalDelta = new THREE.Spherical();

            // Setup
            this.update = function() {
                const offset = new THREE.Vector3();
                const quat = new THREE.Quaternion().setFromUnitVectors(camera.up, new THREE.Vector3(0, 1, 0));
                const quatInverse = quat.clone().invert();
                
                offset.copy(camera.position).sub(scope.target);
                offset.applyQuaternion(quat); // rotate offset to "y-axis-is-up" space
                spherical.setFromVector3(offset); // Convert to spherical coordinates
                
                if (scope.enableDamping) {
                    spherical.theta += sphericalDelta.theta * scope.dampingFactor;
                    spherical.phi += sphericalDelta.phi * scope.dampingFactor;
                } else {
                    spherical.theta += sphericalDelta.theta;
                    spherical.phi += sphericalDelta.phi;
                }

                // restrict phi to be between desired limits
                spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));
                spherical.makeSafe();
                
                // Apply zoom changes with damping
                if (zoomDelta !== 0) {
                    // Get current scale factor based on distance
                    const scale = spherical.radius / zoomDelta;
                    spherical.radius = scale;
                    
                    // Clamp to min/max distance
                    spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, spherical.radius));
                    
                    // Reset zoom delta with damping
                    if (scope.enableDamping) {
                        zoomDelta = 1.0 + (zoomDelta - 1.0) * (1.0 - scope.dampingFactor);
                        if (Math.abs(zoomDelta - 1.0) < 0.001) zoomDelta = 1.0;
                    } else {
                        zoomDelta = 1.0;
                    }
                }
                
                // Convert back to cartesian coordinates
                offset.setFromSpherical(spherical);
                offset.applyQuaternion(quatInverse); // rotate offset back to "camera-up-vector-is-up" space
                
                camera.position.copy(scope.target).add(offset);
                camera.lookAt(scope.target);

                if (scope.enableDamping === true) {
                    sphericalDelta.theta *= (1 - scope.dampingFactor);
                    sphericalDelta.phi *= (1 - scope.dampingFactor);
                } else {
                    sphericalDelta.set(0, 0, 0);
                }
                
                return true;
            };

            // Zoom handling - direct scaling approach
            let zoomDelta = 1.0;
            
            function onMouseDown(event) {
                event.preventDefault();
                
                if (event.button === 0) {
                    state = STATE.ROTATE;
                    rotateStart.set(event.clientX, event.clientY);
                } else if (event.button === 1) {
                    state = STATE.DOLLY;
                } else if (event.button === 2) {
                    state = STATE.PAN;
                    pointerOld.set(event.clientX, event.clientY); // Use pointerOld for panning start
                }
                
                document.addEventListener('mousemove', onMouseMove, false);
                document.addEventListener('mouseup', onMouseUp, false);
            }
            
            function onMouseMove(event) {
                event.preventDefault();
                
                if (state === STATE.ROTATE) {
                    rotateEnd.set(event.clientX, event.clientY);
                    rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(rotateSpeed);

                    const element = scope.domElement === document ? scope.domElement.body : scope.domElement;

                    // Adjusted for more natural rotation feel
                    sphericalDelta.theta -= 2 * Math.PI * rotateDelta.x / element.clientHeight;
                    sphericalDelta.phi -= 2 * Math.PI * rotateDelta.y / element.clientHeight;

                    rotateStart.copy(rotateEnd);
                    scope.update();

                } else if (state === STATE.DOLLY) {
                    // Dolly/zoom is handled by mouse wheel
                } else if (state === STATE.PAN) {
                    pointerPos.set(event.clientX, event.clientY);
                    const movementX = pointerPos.x - pointerOld.x;
                    const movementY = pointerPos.y - pointerOld.y;
                    pointerOld.copy(pointerPos);
                    
                    panCamera(movementX, movementY);
                }
            }
            
            function onMouseUp() {
                state = STATE.NONE;
                document.removeEventListener('mousemove', onMouseMove, false);
                document.removeEventListener('mouseup', onMouseUp, false);
            }
            
            function onMouseWheel(event) {
                event.preventDefault();
                event.stopPropagation();
                
                // Direct scale approach for better zoom response
                if (event.deltaY > 0) {
                    // Zoom out
                    zoomDelta = 1.1; // Increase by 10%
                } else {
                    // Zoom in
                    zoomDelta = 0.9; // Decrease by 10%
                }
                
                scope.update();
            }

            function panCamera(deltaX, deltaY) {
                const offset = new THREE.Vector3();
                const element = scope.domElement === document ? scope.domElement.body : scope.domElement;

                offset.copy(camera.position).sub(scope.target);
                let targetDistance = offset.length();
                targetDistance *= Math.tan((camera.fov / 2) * Math.PI / 180.0);

                // Scale panning by client height
                const panX = (2 * deltaX * targetDistance / element.clientHeight);
                const panY = (2 * deltaY * targetDistance / element.clientHeight);

                const v = new THREE.Vector3();
                // Pan left/right
                v.setFromMatrixColumn(camera.matrix, 0); // get X column of matrix
                v.multiplyScalar(-panX * panSpeed);
                scope.target.add(v);
                camera.position.add(v);

                // Pan up/down
                v.setFromMatrixColumn(camera.matrix, 1); // get Y column of matrix
                v.multiplyScalar(panY * panSpeed);
                scope.target.add(v);
                camera.position.add(v);
                
                scope.update();
            }
            
            // Add event listeners
            domElement.addEventListener('contextmenu', event => event.preventDefault(), false);
            domElement.addEventListener('mousedown', onMouseDown, false);
            domElement.addEventListener('wheel', onMouseWheel, false);
            
            // Initialize
            this.update();
        };
    </script>
</head>
<body>
    <div id="loading">
        <h2>Loading Office Environment...</h2>
        <div id="progress-bar-container">
            <div id="progress-bar"></div>
        </div>
        <p id="loading-status">Initializing...</p>
    </div>
    
    <div id="controls"></div>
    <div id="clock">09:00:00</div>
    <div id="instructions">Use mouse to orbit, WASD/arrows to move. Keys: [S] Start, [C] Coffee, [R] Reset, [T] Tasks, [P] Projects</div>
    
    <!-- Task Panel -->
    <div id="task-panel" class="panel">
        <div class="panel-header">
            <h3 class="panel-title">Task Manager</h3>
            <button class="close-btn" onclick="togglePanel('task-panel', false)">&times;</button>
        </div>
        <div id="task-list-container">
            <div id="task-actions" style="margin-bottom: 15px;">
                <button class="btn" onclick="addRandomTask()">Add Random Task</button>
            </div>
            <div id="task-list">
                <!-- Tasks will be populated here -->
            </div>
        </div>
    </div>

    <!-- Project Panel -->
    <div id="project-panel" class="panel">
        <div class="panel-header">
            <h3 class="panel-title">Project Manager</h3>
            <button class="close-btn" onclick="togglePanel('project-panel', false)">&times;</button>
        </div>
        <div id="project-list-container">
            <div id="project-actions" style="margin-bottom: 15px;">
                <button class="btn" onclick="addRandomProject()">Add Random Project</button>
            </div>
            <div id="project-list">
                <!-- Projects will be populated here -->
            </div>
        </div>
    </div>
    
    <script>
        // Main variables
        let scene, camera, renderer, controls;
        let worker, desk, computer, chair;
        let clock;
        let simulationTime = 9 * 3600; // Start at 9 AM (in seconds)
        let isWorkDay = false;
        let isOnBreak = false;
        let followingWorker = false;
        let raycaster, mouse;
        let originalCameraPosition = null;
        let originalCameraTarget = null;
        let workerCoffeeCup = null; // Reference to worker's coffee cup
        let coffeeBreakLocation = new THREE.Vector3(6, 0, 4); // Position for coffee break
        let isPaused = false; // Animation paused state
        
        // Worker stats
        const workerStats = {
            name: "Office Worker",
            productivity: 100,
            energy: 100,
            satisfaction: 80,
            skills: {
                coding: 85,
                teamwork: 75,
                communication: 80,
                problemSolving: 90
            },
            tasks: [],
            completedTasks: 0
        };
        
        // Task management
        const tasks = [];
        let nextTaskId = 1;
        const taskTypes = [
            { id: 'coding', name: 'Coding', color: '#3498db', duration: { min: 300, max: 1200 } },
            { id: 'meeting', name: 'Meeting', color: '#e74c3c', duration: { min: 600, max: 1800 } },
            { id: 'planning', name: 'Planning', color: '#2ecc71', duration: { min: 300, max: 900 } },
            { id: 'documentation', name: 'Documentation', color: '#f39c12', duration: { min: 600, max: 1500 } },
            { id: 'testing', name: 'Testing', color: '#9b59b6', duration: { min: 450, max: 1200 } }
        ];
        
        // Project management
        const projects = [];
        let nextProjectId = 1;
        const projectTypes = [
            { id: 'development', name: 'Software Dev', color: '#1abc9c' },
            { id: 'marketing', name: 'Marketing Campaign', color: '#e67e22' },
            { id: 'research', name: 'R&D', color: '#34495e' }
        ];

        // Initialize the simulation
        window.addEventListener('DOMContentLoaded', () => {
            initThreeJS();
            setupEventListeners();
            createWorkerStatsCard();
            animate();
        });
        
        // Initialize Three.js scene and components
        function initThreeJS() {
            // Set up clock
            clock = new THREE.Clock();
            
            // Create scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xf0f0f0);
            
            // Create camera
            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            // Position camera higher up, like at basketball hoop height, looking down
            camera.position.set(0, 7, 6);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            
            // Create renderer
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMap.enabled = true;
            document.body.appendChild(renderer.domElement);
            
            // Initialize raycaster for mouse picking
            raycaster = new THREE.Raycaster();
            mouse = new THREE.Vector2();
            
            // Handle window resizing
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
            
            // Set up camera controls
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.1;
            controls.screenSpacePanning = true;
            controls.minDistance = 2;
            controls.maxDistance = 20;
            controls.minPolarAngle = 0.1;
            controls.maxPolarAngle = Math.PI / 1.5;
            
            // Add lighting
            setupLights();
            
            // Create the office environment
            createOfficeEnvironment();
        }
        
        // Set up scene lighting
        function setupLights() {
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
            
            const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
            mainLight.position.set(5, 10, 5);
            mainLight.castShadow = true;
            mainLight.shadow.mapSize.width = 2048;
            mainLight.shadow.mapSize.height = 2048;
            scene.add(mainLight);
        }
        
        // Create the office environment
        function createOfficeEnvironment() {
            // Create floor
            const floorGeometry = new THREE.PlaneGeometry(20, 20);
            const floorMaterial = new THREE.MeshStandardMaterial({
                color: 0xdadada, // Lighter gray floor
                side: THREE.DoubleSide,
                roughness: 0.8,
                metalness: 0.2
            });
            const floor = new THREE.Mesh(floorGeometry, floorMaterial);
            floor.rotation.x = -Math.PI / 2;
            floor.receiveShadow = true;
            scene.add(floor);
            
            // Create walls and door
            createWalls();
            
            // Create desk
            createDesk();
            
            // Create chair
            createChair();
            
            // Create computer with multiple monitors
            createComputer();
            
            // Add office decorations
            createOfficeDecorations();
            
            // Create coffee station
            createCoffeeStation();
            
            // Create worker (initially at door)
            createWorker();
            
            // Show loading complete
            updateLoadingProgress(100);
            setTimeout(() => {
                document.getElementById('loading').style.display = 'none';
                resetInstructions(); // Set initial instructions
            }, 500);
        }
        
        // Create office walls and door
        function createWalls() {
            const wallMaterial = new THREE.MeshStandardMaterial({ 
                color: 0xf5f5f5, // Off-white walls
                roughness: 0.9 
            });
            
            // Wall texture for variation
            const wallTexture = new THREE.TextureLoader().load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==');
            wallTexture.wrapS = THREE.RepeatWrapping;
            wallTexture.wrapT = THREE.RepeatWrapping;
            wallTexture.repeat.set(5, 5);
            wallMaterial.map = wallTexture;
            
            // Left wall
            const leftWallGeometry = new THREE.BoxGeometry(0.2, 3, 20);
            const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
            leftWall.position.set(-10, 1.5, 0);
            leftWall.receiveShadow = true;
            leftWall.castShadow = true;
            scene.add(leftWall);
            
            // Right wall
            const rightWallGeometry = new THREE.BoxGeometry(0.2, 3, 20);
            const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
            rightWall.position.set(10, 1.5, 0);
            rightWall.receiveShadow = true;
            rightWall.castShadow = true;
            scene.add(rightWall);
            
            // Back wall
            const backWallGeometry = new THREE.BoxGeometry(20, 3, 0.2);
            const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
            backWall.position.set(0, 1.5, -10);
            backWall.receiveShadow = true;
            backWall.castShadow = true;
            scene.add(backWall);
            
            // Front wall with door opening
            // Left section
            const frontWallLeftGeometry = new THREE.BoxGeometry(7, 3, 0.2);
            const frontWallLeft = new THREE.Mesh(frontWallLeftGeometry, wallMaterial);
            frontWallLeft.position.set(-6.5, 1.5, 10);
            frontWallLeft.receiveShadow = true;
            frontWallLeft.castShadow = true;
            scene.add(frontWallLeft);
            
            // Right section
            const frontWallRightGeometry = new THREE.BoxGeometry(10, 3, 0.2);
            const frontWallRight = new THREE.Mesh(frontWallRightGeometry, wallMaterial);
            frontWallRight.position.set(5, 1.5, 10);
            frontWallRight.receiveShadow = true;
            frontWallRight.castShadow = true;
            scene.add(frontWallRight);
            
            // Top section (above door)
            const frontWallTopGeometry = new THREE.BoxGeometry(3, 1, 0.2);
            const frontWallTop = new THREE.Mesh(frontWallTopGeometry, wallMaterial);
            frontWallTop.position.set(-2, 2.5, 10);
            frontWallTop.receiveShadow = true;
            frontWallTop.castShadow = true;
            scene.add(frontWallTop);
            
            // Door frame
            const doorFrameMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
            
            // Left door frame
            const doorFrameLeftGeometry = new THREE.BoxGeometry(0.2, 2, 0.2);
            const doorFrameLeft = new THREE.Mesh(doorFrameLeftGeometry, doorFrameMaterial);
            doorFrameLeft.position.set(-3.5, 1, 10);
            scene.add(doorFrameLeft);
            
            // Right door frame
            const doorFrameRightGeometry = new THREE.BoxGeometry(0.2, 2, 0.2);
            const doorFrameRight = new THREE.Mesh(doorFrameRightGeometry, doorFrameMaterial);
            doorFrameRight.position.set(-0.5, 1, 10);
            scene.add(doorFrameRight);
            
            // Top door frame
            const doorFrameTopGeometry = new THREE.BoxGeometry(3.2, 0.2, 0.2);
            const doorFrameTop = new THREE.Mesh(doorFrameTopGeometry, doorFrameMaterial);
            doorFrameTop.position.set(-2, 2, 10);
            scene.add(doorFrameTop);
            
            // Door (slightly open)
            const doorGeometry = new THREE.BoxGeometry(3, 2, 0.1);
            const doorMaterial = new THREE.MeshStandardMaterial({ color: 0xa52a2a });
            const door = new THREE.Mesh(doorGeometry, doorMaterial);
            door.position.set(-3.5, 1, 9.8);
            door.rotation.y = Math.PI / 6; // Door slightly open
            door.castShadow = true;
            scene.add(door);
        }
        
        // Create decorative elements for the office
        function createOfficeDecorations() {
            // Add some plants
            createPlant(-8, 0, 8, 1, 0x228B22); // Tall plant near entrance
            createPlant(8, 0, -8, 0.8, 0x228B22); // Plant in corner
            createPlant(3, 0.8, -0.5, 0.4, 0x32CD32); // Small plant on desk
            
            // Add a simple wall clock
            createWallClock(-9.9, 2, 0);
            
            // Add a simple painting on the wall
            createPainting(0, 2, -9.9, 3, 2);
            
            // Add a small trash bin
            createTrashBin(1.5, 0, 0.5);
            
            // Add a small filing cabinet
            createFilingCabinet(-2, 0, -0.5);
        }
        
        // Create a simple plant
        function createPlant(x, y, z, scale, color) {
            // Ensure plant is on the floor
            const plantY = Math.max(0, y); // Make sure y is not negative
            
            const plantPot = new THREE.Mesh(
                new THREE.CylinderGeometry(0.2 * scale, 0.15 * scale, 0.3 * scale, 16),
                new THREE.MeshStandardMaterial({ color: 0x8B4513 })
            );
            plantPot.position.set(x, plantY + 0.15 * scale, z); // Bottom of pot at floor level
            plantPot.castShadow = true;
            plantPot.receiveShadow = true;
            scene.add(plantPot);
            
            // Plant leaves/foliage (simplified)
            const plantGroup = new THREE.Group();
            
            // Base foliage
            const baseFoliage = new THREE.Mesh(
                new THREE.SphereGeometry(0.3 * scale, 8, 8),
                new THREE.MeshStandardMaterial({ color: color })
            );
            baseFoliage.position.set(0, 0.3 * scale, 0);
            plantGroup.add(baseFoliage);
            
            // Additional foliage elements for more realistic look
            for (let i = 0; i < 5; i++) {
                const foliage = new THREE.Mesh(
                    new THREE.SphereGeometry(0.2 * scale, 8, 8),
                    new THREE.MeshStandardMaterial({ color: color })
                );
                const angle = (i / 5) * Math.PI * 2;
                const radius = 0.15 * scale;
                foliage.position.set(
                    Math.cos(angle) * radius,
                    0.4 * scale + Math.random() * 0.3 * scale,
                    Math.sin(angle) * radius
                );
                plantGroup.add(foliage);
            }
            
            plantGroup.position.set(x, plantY + 0.3 * scale, z); // Position based on floor level
            plantGroup.castShadow = true;
            scene.add(plantGroup);
        }
        
        // Create a simple wall clock
        function createWallClock(x, y, z) {
            const clockFace = new THREE.Mesh(
                new THREE.CircleGeometry(0.5, 32),
                new THREE.MeshStandardMaterial({ color: 0xffffff })
            );
            clockFace.position.set(x, y, z);
            
            // Add a simple frame
            const clockFrame = new THREE.Mesh(
                new THREE.RingGeometry(0.5, 0.55, 32),
                new THREE.MeshStandardMaterial({ color: 0x333333 })
            );
            clockFrame.position.set(x, y, z + 0.01);
            
            // Create hour and minute hands
            const hourHand = new THREE.Mesh(
                new THREE.BoxGeometry(0.05, 0.25, 0.01),
                new THREE.MeshStandardMaterial({ color: 0x000000 })
            );
            hourHand.position.set(x, y, z + 0.02);
            hourHand.rotation.z = Math.PI / 3;
            
            const minuteHand = new THREE.Mesh(
                new THREE.BoxGeometry(0.03, 0.4, 0.01),
                new THREE.MeshStandardMaterial({ color: 0x000000 })
            );
            minuteHand.position.set(x, y, z + 0.02);
            minuteHand.rotation.z = Math.PI / 6;
            
            scene.add(clockFace, clockFrame, hourHand, minuteHand);
        }
        
        // Create a simple painting
        function createPainting(x, y, z, width, height) {
            // Create canvas texture for the painting
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const context = canvas.getContext('2d');
            
            // Create a simple abstract painting
            context.fillStyle = '#4b6cb7';
            context.fillRect(0, 0, 256, 256);
            
            // Add some random shapes
            for (let i = 0; i < 15; i++) {
                context.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;
                context.beginPath();
                context.arc(
                    Math.random() * 256, 
                    Math.random() * 256, 
                    10 + Math.random() * 30, 
                    0, 
                    Math.PI * 2
                );
                context.fill();
            }
            
            const paintingTexture = new THREE.CanvasTexture(canvas);
            
            // Create painting mesh
            const painting = new THREE.Mesh(
                new THREE.BoxGeometry(width, height, 0.1),
                [
                    new THREE.MeshStandardMaterial({ color: 0x8B4513 }), // right
                    new THREE.MeshStandardMaterial({ color: 0x8B4513 }), // left
                    new THREE.MeshStandardMaterial({ color: 0x8B4513 }), // top
                    new THREE.MeshStandardMaterial({ color: 0x8B4513 }), // bottom
                    new THREE.MeshStandardMaterial({ map: paintingTexture }), // front
                    new THREE.MeshStandardMaterial({ color: 0x8B4513 }) // back
                ]
            );
            
            painting.position.set(x, y, z);
            painting.castShadow = true;
            scene.add(painting);
            
            // Add a simple frame
            const frameGeometry = new THREE.BoxGeometry(width + 0.2, height + 0.2, 0.05);
            const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
            const frame = new THREE.Mesh(frameGeometry, frameMaterial);
            frame.position.set(x, y, z + 0.08);
            scene.add(frame);
        }
        
        // Create a trash bin
        function createTrashBin(x, y, z) {
            const binGeometry = new THREE.CylinderGeometry(0.2, 0.15, 0.4, 16);
            const binMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
            const bin = new THREE.Mesh(binGeometry, binMaterial);
            bin.position.set(x, y + 0.2, z);
            bin.castShadow = true;
            bin.receiveShadow = true;
            scene.add(bin);
        }
        
        // Create a filing cabinet
        function createFilingCabinet(x, y, z) {
            const cabinetGeometry = new THREE.BoxGeometry(0.8, 1.2, 0.5);
            const cabinetMaterial = new THREE.MeshStandardMaterial({ color: 0x708090 });
            const cabinet = new THREE.Mesh(cabinetGeometry, cabinetMaterial);
            cabinet.position.set(x, y + 0.6, z);
            cabinet.castShadow = true;
            cabinet.receiveShadow = true;
            scene.add(cabinet);
            
            // Add drawer handles
            for (let i = 0; i < 3; i++) {
                const handleGeometry = new THREE.BoxGeometry(0.4, 0.03, 0.05);
                const handleMaterial = new THREE.MeshStandardMaterial({ color: 0xC0C0C0 });
                const handle = new THREE.Mesh(handleGeometry, handleMaterial);
                handle.position.set(x, y + 0.3 + i * 0.4, z + 0.25);
                handle.castShadow = true;
                scene.add(handle);
                
                // Add drawer line
                const lineGeometry = new THREE.BoxGeometry(0.8, 0.01, 0.501);
                const lineMaterial = new THREE.MeshStandardMaterial({ color: 0x505050 });
                const line = new THREE.Mesh(lineGeometry, lineMaterial);
                line.position.set(x, y + 0.1 + i * 0.4, z);
                scene.add(line);
            }
        }
        
        // Create desk
        function createDesk() {
            // Larger desk for 3 monitors
            const deskGeometry = new THREE.BoxGeometry(3, 0.8, 1.2);
            const deskMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
            desk = new THREE.Mesh(deskGeometry, deskMaterial);
            desk.position.set(0, 0.4, 0);
            desk.castShadow = true;
            desk.receiveShadow = true;
            scene.add(desk);
        }
        
        // Create chair
        function createChair() {
            // Chair group
            chair = new THREE.Group();
            
            // Chair base (seat)
            const seatGeometry = new THREE.BoxGeometry(0.6, 0.1, 0.6);
            const seatMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
            const seat = new THREE.Mesh(seatGeometry, seatMaterial);
            seat.position.set(0, 0.45, 0.9); // Position closer to desk
            seat.castShadow = true;
            chair.add(seat);
            
            // Chair back
            const backGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.1);
            const back = new THREE.Mesh(backGeometry, seatMaterial);
            back.position.set(0, 0.8, 1.15); // Position at the back of the seat
            back.castShadow = true;
            chair.add(back);
            
            // Chair legs (simplified as one cylinder)
            const legGeometry = new THREE.CylinderGeometry(0.1, 0.2, 0.4, 8);
            const legMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(0, 0.2, 0.9); // Position under the seat
            leg.castShadow = true;
            chair.add(leg);
            
            scene.add(chair);
            return chair;
        }
        
        // Create computer with three monitors
        function createComputer() {
            computer = new THREE.Group();
            
            // Create keyboard
            const keyboardGeometry = new THREE.BoxGeometry(0.6, 0.05, 0.2);
            const peripheralMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
            const keyboard = new THREE.Mesh(keyboardGeometry, peripheralMaterial);
            keyboard.position.set(0, 0.83, 0.2);
            computer.add(keyboard);
            
            // Create mouse
            const mouseGeometry = new THREE.BoxGeometry(0.1, 0.03, 0.15);
            const mouse = new THREE.Mesh(mouseGeometry, peripheralMaterial);
            mouse.position.set(0.5, 0.83, 0.2);
            computer.add(mouse);
            
            // Create the three monitors with proper positioning
            createMonitor(-0.8, 0, 15);  // Left monitor - angled
            createMonitor(0, 0, 0);      // Center monitor
            createMonitor(0.8, 0, -15);  // Right monitor - angled
            
            computer.castShadow = true;
            scene.add(computer);
        }
        
        // Create individual monitor
        function createMonitor(xOffset, zOffset, angleY) {
            // Monitor stand base - sits at back of desk
            const standBaseGeometry = new THREE.CylinderGeometry(0.1, 0.12, 0.05, 8);
            const standMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
            const standBase = new THREE.Mesh(standBaseGeometry, standMaterial);
            standBase.position.set(xOffset, 0.825, -0.3 + zOffset); // Moved back to desk rear
            computer.add(standBase);
            
            // Monitor stand pole
            const standPoleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8);
            const standPole = new THREE.Mesh(standPoleGeometry, standMaterial);
            standPole.position.set(xOffset, 1.075, -0.3 + zOffset); // Moved back with base
            computer.add(standPole);
            
            // Monitor frame
            const monitorFrameGeometry = new THREE.BoxGeometry(0.7, 0.5, 0.05);
            const monitorFrameMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
            const frame = new THREE.Mesh(monitorFrameGeometry, monitorFrameMaterial);
            frame.position.set(xOffset, 1.4, 0.1 + zOffset); // Moved forward for better viewing
            
            // Create screen content with dynamic texture
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 384;
            const ctx = canvas.getContext('2d');
            
            // Fill background
            ctx.fillStyle = '#3498db';
            ctx.fillRect(0, 0, 512, 384);
            
            // Draw some UI elements
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(10, 10, 492, 40); // Top bar
            
            ctx.fillStyle = '#ecf0f1';
            ctx.fillRect(10, 60, 492, 314); // Content area
            
            ctx.fillStyle = '#34495e';
            ctx.fillRect(20, 70, 472, 25); // Header
            
            // Add some text-like lines
            ctx.fillStyle = '#7f8c8d';
            for (let i = 0; i < 12; i++) {
                ctx.fillRect(20, 105 + i * 20, Math.random() * 200 + 200, 10);
            }
            
            // Draw some colored elements
            const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
            for (let i = 0; i < 5; i++) {
                ctx.fillStyle = colors[i];
                ctx.fillRect(350, 105 + i * 40, 100, 30);
            }
            
            const screenTexture = new THREE.CanvasTexture(canvas);
            screenTexture.needsUpdate = true;
            
            // Create screen display with texture
            const screenGeometry = new THREE.PlaneGeometry(0.65, 0.45);
            const screenMaterial = new THREE.MeshBasicMaterial({ 
                map: screenTexture,
                side: THREE.FrontSide
            });
            const screen = new THREE.Mesh(screenGeometry, screenMaterial);
            screen.position.set(0, 0, 0.026); // Slight offset to prevent z-fighting
            frame.add(screen);
            
            // Add monitor tilt for ergonomics (slight backward tilt)
            frame.rotation.x = -0.1;
            
            // Create connecting arm between stand and monitor - longer to reach forward screens
            const armGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.4); // Longer arm to connect base to forward screen
            const arm = new THREE.Mesh(armGeometry, standMaterial);
            arm.position.set(xOffset, 1.35, -0.1 + zOffset); // Positioned between base and screen
            computer.add(arm);
            
            // Rotate the entire monitor if needed (for side monitors)
            frame.rotation.y = angleY * Math.PI / 180;
            
            // Add frame to computer group
            computer.add(frame);
        }
        
        // Create worker
        function createWorker() {
            // Body parts
            const bodyGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.2);
            const headGeometry = new THREE.SphereGeometry(0.15, 16, 16);
            const armGeometry = new THREE.BoxGeometry(0.1, 0.4, 0.1);
            const legGeometry = new THREE.BoxGeometry(0.15, 0.5, 0.15);
            
            const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x0077be });
            const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffb6c1 });
            const limbMaterial = new THREE.MeshStandardMaterial({ color: 0x0077be });
            
            // Create body parts with adjusted offsets so worker faces forward naturally
            const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
            body.position.set(0, 0.3, 0); // Lower the body position slightly
            
            const head = new THREE.Mesh(headGeometry, headMaterial);
            head.position.set(0, 0.67, 0); // Adjust head position relative to body
            
            // Create face (eyes)
            const faceGroup = new THREE.Group();
            
            const eyeGeometry = new THREE.CircleGeometry(0.03, 16);
            const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
            
            const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
            leftEye.position.set(-0.05, 0.02, 0.14);
            
            const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
            rightEye.position.set(0.05, 0.02, 0.14);
            
            faceGroup.add(leftEye);
            faceGroup.add(rightEye);
            
            // Face direction properly to look forward
            faceGroup.rotation.y = Math.PI;
            head.add(faceGroup);
            
            // Arms - adjusted positions
            const leftArm = new THREE.Mesh(armGeometry, limbMaterial);
            leftArm.position.set(-0.25, 0.3, 0);
            
            const rightArm = new THREE.Mesh(armGeometry, limbMaterial);
            rightArm.position.set(0.25, 0.3, 0);
            
            // Legs
            const leftLeg = new THREE.Mesh(legGeometry, limbMaterial);
            leftLeg.position.set(-0.125, -0.25, 0);
            
            const rightLeg = new THREE.Mesh(legGeometry, limbMaterial);
            rightLeg.position.set(0.125, -0.25, 0);
            
            // Create worker group
            worker = new THREE.Group();
            worker.add(body);
            worker.add(head);
            worker.add(leftArm);
            worker.add(rightArm);
            worker.add(leftLeg);
            worker.add(rightLeg);
            
            worker.castShadow = true;
            
            // Position worker at entry point (by door)
            worker.position.set(-2, 1, 9); // Position at the door
            worker.rotation.y = Math.PI / 2; // Facing into the room
            
            scene.add(worker);
        }
        
        // Set up event listeners
        function setupEventListeners() {
            // Add control buttons
            createControlButtons();
            
            // Mouse click for worker selection
            renderer.domElement.addEventListener('click', onMouseClick, false);
            
            // Keyboard controls for panels and worker actions
            document.addEventListener('keydown', (event) => {
                switch(event.key.toUpperCase()) {
                    case 'T':
                        togglePanel('task-panel');
                        break;
                    case 'P':
                        togglePanel('project-panel');
                        break;
                    case 'ESCAPE':
                        closeAllPanels();
                        if (followingWorker) {
                            unfollowWorker();
                        }
                        break;
                    case 'S':
                        startWorkday();
                        break;
                    case 'C':
                        takeCoffeeBreak();
                        break;
                    case 'R':
                        resetWorker();
                        break;
                    case ' ': // Space bar for pause/play
                        toggleAnimation();
                        break;
                    // Navigation controls
                    case 'W':
                    case 'ARROWUP':
                        if (!followingWorker) moveCamera('forward');
                        break;
                    case 'S':
                    case 'ARROWDOWN':
                        if (!followingWorker) moveCamera('backward');
                        break;
                    case 'A':
                    case 'ARROWLEFT':
                        if (!followingWorker) moveCamera('left');
                        break;
                    case 'D':
                    case 'ARROWRIGHT':
                        if (!followingWorker) moveCamera('right');
                        break;
                    case 'Q': // Move up
                        if (!followingWorker) moveCamera('up');
                        break;
                    case 'E': // Move down
                        if (!followingWorker) moveCamera('down');
                        break;
                    case 'F': // Focus/unfollow worker
                        if (followingWorker) {
                            unfollowWorker();
                        } else {
                            followWorker();
                        }
                        break;
                }
            });
        }
        
        // Create control buttons
        function createControlButtons() {
            const controlsDiv = document.getElementById('controls');
            
            const buttons = [
                { text: 'Start Workday (S)', onClick: startWorkday },
                { text: 'Coffee Break (C)', onClick: takeCoffeeBreak },
                { text: 'Reset (R)', onClick: resetWorker },
                { text: 'Tasks (T)', onClick: () => togglePanel('task-panel') },
                { text: 'Projects (P)', onClick: () => togglePanel('project-panel') },
                { text: 'Pause (Space)', onClick: toggleAnimation, attr: 'data-action="pause-play"' }
            ];
            
            buttons.forEach(btn => {
                const button = document.createElement('button');
                button.className = 'btn';
                button.textContent = btn.text;
                button.addEventListener('click', btn.onClick);
                if (btn.attr) {
                    const [attrName, attrValue] = btn.attr.split('=');
                    button.setAttribute(attrName, attrValue.replace(/"/g, ''));
                }
                controlsDiv.appendChild(button);
            });
        }
        
        // Camera movement speed and state
        const cameraSpeed = 0.3;
        let keyStates = {};

        // Handle camera movement
        function moveCamera(direction) {
            const offset = new THREE.Vector3();
            const forward = new THREE.Vector3();
            const right = new THREE.Vector3();
            const up = new THREE.Vector3(0, 1, 0);
            
            // Get forward and right directions from camera
            camera.getWorldDirection(forward);
            right.crossVectors(up, forward).normalize();
            
            switch(direction) {
                case 'forward':
                    offset.copy(forward).multiplyScalar(cameraSpeed);
                    break;
                case 'backward':
                    offset.copy(forward).multiplyScalar(-cameraSpeed);
                    break;
                case 'left':
                    offset.copy(right).multiplyScalar(-cameraSpeed);
                    break;
                case 'right':
                    offset.copy(right).multiplyScalar(cameraSpeed);
                    break;
                case 'up':
                    offset.copy(up).multiplyScalar(cameraSpeed);
                    break;
                case 'down':
                    offset.copy(up).multiplyScalar(-cameraSpeed);
                    break;
            }
            
            camera.position.add(offset);
            controls.target.add(offset);
        }

        // Animation loop
        function animate() {
            if (!isPaused) {
                requestAnimationFrame(animate);
                const deltaTime = clock.getDelta();
                
                // Update controls - Required for damping
                if (!followingWorker) {
                    controls.update(deltaTime);
                } else {
                    // Update camera to follow worker
                    const offsetHeight = 1.5;  // Height above worker
                    const offsetBack = 2;      // Distance behind worker
                    
                    const target = new THREE.Vector3(
                        worker.position.x,
                        worker.position.y + 0.5,
                        worker.position.z
                    );
                    
                    // Calculate camera position based on worker's orientation
                    const workerDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(worker.quaternion);
                    const cameraPosition = new THREE.Vector3(
                        worker.position.x - workerDirection.x * offsetBack,
                        worker.position.y + offsetHeight,
                        worker.position.z - workerDirection.z * offsetBack
                    );
                    
                    // Smoothly move camera
                    camera.position.lerp(cameraPosition, 0.05);
                    controls.target.lerp(target, 0.05);
                    camera.lookAt(target);
                }
                
                // Update simulation time
                updateTime(deltaTime);
                
                // Update worker stats
                updateWorkerStats();
                
                // Update tasks if working
                if (isWorkDay && !isOnBreak) {
                    updateTasks(deltaTime);
                }
                
                // Render scene
                renderer.render(scene, camera);
            } else {
                // Even when paused, we need to render one more frame
                renderer.render(scene, camera);
            }
        }
        
        // Toggle animation pause/play
        function toggleAnimation() {
            isPaused = !isPaused;
            
            // Update button text
            const pausePlayBtn = document.querySelector('[data-action="pause-play"]');
            if (pausePlayBtn) {
                pausePlayBtn.textContent = isPaused ? 'Play (Space)' : 'Pause (Space)';
            }
            
            // If resuming animation, restart the loop
            if (!isPaused) {
                clock.start(); // Restart the clock to avoid big delta time jumps
                animate();
            }
            
            // Update instructions
            if (isPaused) {
                updateInstructions('Simulation paused. Press Space to resume.');
            } else {
                resetInstructions();
            }
        }
        
        // Update simulation time
        function updateTime(deltaTime) {
            // Update time only if workday is in progress and not on break
            if (isWorkDay && !isOnBreak) {
                simulationTime += deltaTime * 60; // Advance time at 60x speed
            }
            
            // Format and display the time
            const hours = Math.floor(simulationTime / 3600);
            const minutes = Math.floor((simulationTime % 3600) / 60);
            const seconds = Math.floor(simulationTime % 60);
            
            const timeString = [
                hours.toString().padStart(2, '0'),
                minutes.toString().padStart(2, '0'),
                seconds.toString().padStart(2, '0')
            ].join(':');
            
            document.getElementById('clock').textContent = timeString;
        }
        
        // Start workday - animate worker walking to desk
        function startWorkday() {
            console.log('Starting workday');
            
            // If on break, first finish the break
            if (isOnBreak) {
                finishCoffeeBreak();
                return;
            }
            
            isWorkDay = true;
            isOnBreak = false;
            
            // Reset position if needed
            if (worker.position.x === coffeeBreakLocation.x && worker.position.z === coffeeBreakLocation.z) {
                // First return to entry position
                gsap.to(worker.position, {
                    x: -2,
                    y: 1,
                    z: 9,
                    duration: 1.5,
                    onComplete: () => walkToDesk()
                });
                
                gsap.to(worker.rotation, {
                    y: Math.PI / 2,
                    duration: 1
                });
            } else if (worker.position.x === 0 && worker.position.y === 0.5 && worker.position.z === 0.9) {
                // Already at desk
                updateInstructions('Worker is already at desk working. Keys: [C] Coffee, [R] Reset, [T] Tasks, [P] Projects');
            } else {
                walkToDesk();
            }
        }
        
        // Animate worker walking to desk
        function walkToDesk() {
            // Path from door to desk:
            // 1. Walk from door into office
            gsap.to(worker.position, {
                x: -2,
                y: 1,
                z: 6,
                duration: 1,
                ease: "power1.inOut",
                onComplete: () => {
                    // 2. Turn toward desk
                    gsap.to(worker.rotation, {
                        y: 0,
                        duration: 0.5,
                        onComplete: () => {
                            // 3. Walk to desk area
                            gsap.to(worker.position, {
                                x: 0,
                                y: 1,
                                z: 3,
                                duration: 1.5,
                                ease: "power1.inOut",
                                onComplete: () => {
                                    // 4. Walk behind chair
                                    gsap.to(worker.position, {
                                        x: 0,
                                        y: 1,
                                        z: 1.8,
                                        duration: 0.8,
                                        ease: "power1.inOut",
                                        onComplete: () => {
                                            // 5. Turn to face chair and desk
                                            gsap.to(worker.rotation, {
                                                y: 0,
                                                duration: 0.5,
                                                onComplete: () => {
                                                    // 6. Sit on chair (move up then forward)
                                                    gsap.to(worker.position, {
                                                        y: 0.5,
                                                        duration: 0.5,
                                                        ease: "power2.out",
                                                        onComplete: () => {
                                                            gsap.to(worker.position, {
                                                                z: 0.9,
                                                                duration: 0.5,
                                                                ease: "power2.out",
                                                                onComplete: () => {
                                                                    // 7. Lean slightly forward
                                                                    gsap.to(worker.rotation, {
                                                                        x: 0.1,
                                                                        duration: 0.5
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
            
            // Update instructions
            updateInstructions('Worker is walking to desk. Keys: [C] Coffee, [R] Reset, [T] Tasks, [P] Projects');
        }
        
        // Take coffee break
        function takeCoffeeBreak() {
            console.log('Taking coffee break');
            
            // Don't do anything if already on break
            if (isOnBreak) {
                updateInstructions('Worker is already on a coffee break.');
                return;
            }
            
            isOnBreak = true;
            
            // First, stand up from chair if at desk
            if (worker.position.y === 0.5 && worker.position.z === 0.9) {
                // Stand up animation
                gsap.to(worker.position, {
                    y: 1,
                    z: 1.5,
                    duration: 0.5,
                    ease: "power1.out",
                    onComplete: walkToCoffeeStation
                });
                
                // Reset any tilt and turn
                gsap.to(worker.rotation, {
                    x: 0,
                    duration: 0.3
                });
            } else {
                // If not at desk, just walk to coffee station
                walkToCoffeeStation();
            }
            
            // Update instructions
            updateInstructions('Worker is taking a coffee break. Productivity paused.');
        }

        // Walk to coffee station
        function walkToCoffeeStation() {
            // Find the coffee station position
            const coffeeStationPosition = new THREE.Vector3(8, 1, 3);
            
            // Turn toward coffee station
            const direction = new THREE.Vector3().subVectors(coffeeStationPosition, worker.position).normalize();
            const angle = Math.atan2(direction.x, direction.z);
            
            gsap.to(worker.rotation, {
                y: angle,
                duration: 0.5,
                onComplete: () => {
                    // Walk to coffee station
                    gsap.to(worker.position, {
                        x: coffeeStationPosition.x - 1, // Stand in front of station
                        z: coffeeStationPosition.z,
                        duration: 2,
                        ease: "power1.inOut",
                        onComplete: pickUpCoffee
                    });
                }
            });
        }

        // Pick up coffee from the station
        function pickUpCoffee() {
            // Create a coffee cup for the worker (using red cup)
            workerCoffeeCup = createCoffeeCup(0, 0, 0, 0xc95959);
            
            // Coffee cup animation: from station to worker's hand
            workerCoffeeCup.position.set(7.6, 0.8, 3);
            
            // Animate picking up coffee
            gsap.to(workerCoffeeCup.position, {
                y: 1.2,
                duration: 0.5,
                ease: "power1.out",
                onComplete: () => {
                    // Attach coffee cup to worker (make it a child of worker)
                    scene.remove(workerCoffeeCup);
                    worker.add(workerCoffeeCup);
                    
                    // Position cup relative to worker
                    workerCoffeeCup.position.set(0.25, 0.2, 0.3);
                    
                    // Now walk to break area
                    goToBreakArea();
                }
            });
        }

        // Go to break area after getting coffee
        function goToBreakArea() {
            // Turn toward break area
            const direction = new THREE.Vector3().subVectors(coffeeBreakLocation, worker.position).normalize();
            const angle = Math.atan2(direction.x, direction.z);
            
            gsap.to(worker.rotation, {
                y: angle,
                duration: 0.5,
                onComplete: () => {
                    // Walk to break area
                    gsap.to(worker.position, {
                        x: coffeeBreakLocation.x,
                        z: coffeeBreakLocation.z,
                        duration: 1.5,
                        ease: "power1.inOut",
                        onComplete: drinkCoffee
                    });
                }
            });
        }

        // Drink coffee animation
        function drinkCoffee() {
            // Rotate slightly to look relaxed
            gsap.to(worker.rotation, {
                y: worker.rotation.y + Math.PI / 6,
                duration: 0.5
            });
            
            // Simulate drinking coffee with a single sip
            const drinkCoffeeAnimation = () => {
                // Lift cup toward face
                gsap.to(workerCoffeeCup.position, {
                    y: 0.5,
                    z: 0.1,
                    duration: 0.8,
                    ease: "power1.inOut",
                    onComplete: () => {
                        // Move cup back down
                        gsap.to(workerCoffeeCup.position, {
                            y: 0.2,
                            z: 0.3,
                            duration: 0.8,
                            ease: "power1.inOut"
                        });
                    }
                });
            };
            
            // Drink once
            drinkCoffeeAnimation();
            
            // Update energy and satisfaction during coffee break
            const coffeeInterval = setInterval(() => {
                if (!isOnBreak) {
                    clearInterval(coffeeInterval);
                    return;
                }
                
                // Boost energy and satisfaction more during coffee
                workerStats.energy = Math.min(100, workerStats.energy + 0.5);
                workerStats.satisfaction = Math.min(100, workerStats.satisfaction + 0.2);
                
                // Update the stats display
                if (document.getElementById('worker-stats-card').style.display === 'block') {
                    updateWorkerStats();
                }
            }, 100);
            
            // Auto-return to work after 3 seconds
            setTimeout(() => {
                if (isOnBreak) {
                    updateInstructions('Coffee break finished. Returning to work...');
                    finishCoffeeBreak();
                }
            }, 3000);
        }
        
        // Reset worker position to entry point
        function resetWorker() {
            console.log('Resetting worker position');
            isWorkDay = false;
            isOnBreak = false;
            
            // Animate worker walking back to entry point
            gsap.to(worker.position, {
                x: -2,
                y: 1,
                z: 9,
                duration: 2
            });
            
            // Reset worker rotation
            gsap.to(worker.rotation, {
                x: 0,
                y: Math.PI / 2,
                duration: 1
            });
            
            // Update instructions
            resetInstructions();
        }
        
        // Update instructions text
        function updateInstructions(text) {
            document.getElementById('instructions').textContent = text;
        }
        
        // Initial instructions
        function resetInstructions() {
            document.getElementById('instructions').textContent = 'Use mouse to orbit, WASD/arrows to move. Keys: [S] Start, [C] Coffee, [R] Reset, [T] Tasks, [P] Projects';
        }
        
        // Update loading progress bar
        function updateLoadingProgress(percent) {
            const progressBar = document.getElementById('progress-bar');
            const loadingStatus = document.getElementById('loading-status');
            
            progressBar.style.width = `${percent}%`;
            
            if (percent < 30) {
                loadingStatus.textContent = 'Loading 3D environment...';
            } else if (percent < 60) {
                loadingStatus.textContent = 'Setting up workspace...';
            } else if (percent < 90) {
                loadingStatus.textContent = 'Almost ready...';
            } else {
                loadingStatus.textContent = 'Starting simulation!';
            }
        }
        
        // --- Panel Management ---
        function togglePanel(panelId, show) {
            const panel = document.getElementById(panelId);
            if (!panel) return;

            const isVisible = panel.style.display === 'block';

            if (show === undefined) {
                // Toggle current state
                panel.style.display = isVisible ? 'none' : 'block';
                if (!isVisible) {
                    if (panelId === 'task-panel') renderTaskList();
                    if (panelId === 'project-panel') renderProjectList();
                }
            } else {
                // Set to specified state
                panel.style.display = show ? 'block' : 'none';
                if (show) {
                    if (panelId === 'task-panel') renderTaskList();
                    if (panelId === 'project-panel') renderProjectList();
                }
            }
        }
        
        function closeAllPanels() {
            document.querySelectorAll('.panel').forEach(panel => {
                panel.style.display = 'none';
            });
        }
        
        // --- Task Management ---
        function addRandomTask() {
            const taskType = taskTypes[Math.floor(Math.random() * taskTypes.length)];
            const taskNames = [
                'Project Planning', 'Client Meeting', 'Bug Fix', 'Feature Implementation',
                'Code Review', 'Documentation Update', 'Database Design', 'UI Redesign',
                'Performance Optimization', 'Security Audit', 'Team Meeting'
            ];
            
            const taskName = taskNames[Math.floor(Math.random() * taskNames.length)];
            const duration = Math.floor(
                Math.random() * (taskType.duration.max - taskType.duration.min) + 
                taskType.duration.min
            );
            
            const task = {
                id: nextTaskId++,
                name: taskName,
                type: taskType.id,
                typeInfo: taskType,
                duration: duration,
                progress: 0,
                percentComplete: 0,
                status: 'new', // Initial status
                createdAt: Date.now()
            };
            
            tasks.push(task);
            
            // Add to worker's tasks
            workerStats.tasks.push(task.id);
            
            renderTaskList();
            
            // Show notification
            showNotification(`New task assigned: ${taskName}`);
        }
        
        function renderTaskList() {
            const taskListContainer = document.getElementById('task-list');
            taskListContainer.innerHTML = '';
            
            if (tasks.length === 0) {
                taskListContainer.innerHTML = '<p>No tasks yet. Add a task to get started.</p>';
                return;
            }
            
            tasks.sort((a, b) => a.createdAt - b.createdAt); // Sort by creation time

            tasks.forEach(task => {
                const taskElement = document.createElement('div');
                taskElement.className = 'task-item';
                taskElement.style.borderLeftColor = task.typeInfo.color;
                if (task.status === 'completed') {
                    taskElement.style.opacity = '0.6';
                    taskElement.style.borderLeftColor = '#95a5a6'; // Grey for completed
                }
                
                const taskHeader = document.createElement('div');
                taskHeader.className = 'task-header';
                
                const taskTitle = document.createElement('div');
                taskTitle.textContent = task.name;
                
                const taskType = document.createElement('div');
                taskType.textContent = task.typeInfo.name;
                taskType.style.color = task.status === 'completed' ? '#95a5a6' : task.typeInfo.color;
                
                taskHeader.appendChild(taskTitle);
                taskHeader.appendChild(taskType);
                
                const taskProgress = document.createElement('div');
                taskProgress.className = 'task-progress';
                
                const taskProgressBar = document.createElement('div');
                taskProgressBar.className = 'task-progress-bar';
                taskProgressBar.style.width = `${task.percentComplete}%`;
                taskProgressBar.style.backgroundColor = task.status === 'completed' ? '#95a5a6' : task.typeInfo.color;
                
                taskProgress.appendChild(taskProgressBar);
                
                const taskDetails = document.createElement('div');
                taskDetails.style.fontSize = '0.85em';
                taskDetails.style.color = '#666';
                taskDetails.textContent = 
                    `Status: ${task.status} | Progress: ${task.percentComplete}% | Duration: ${Math.floor(task.duration / 60)} min`;
                
                taskElement.appendChild(taskHeader);
                taskElement.appendChild(taskProgress);
                taskElement.appendChild(taskDetails);
                
                taskListContainer.appendChild(taskElement);
            });
        }
        
        function updateTasks(deltaTime) {
            let updated = false;
            let completedAny = false;
            
            tasks.forEach(task => {
                if (task.status !== 'completed') {
                    // Update progress based on time delta, only if working
                    let progressRate = 1.0;
                    
                    // Apply productivity factor
                    progressRate *= workerStats.productivity / 100;
                    
                    // Apply skill factor if applicable
                    if (task.type === 'coding' && workerStats.skills.coding) {
                        progressRate *= workerStats.skills.coding / 75;
                    } else if (task.type === 'meeting' && workerStats.skills.communication) {
                        progressRate *= workerStats.skills.communication / 75;
                    } else if (task.type === 'planning' && workerStats.skills.teamwork) {
                        progressRate *= workerStats.skills.teamwork / 75;
                    } else if (task.type === 'documentation' && workerStats.skills.communication) {
                        progressRate *= workerStats.skills.communication / 75;
                    } else if (task.type === 'testing' && workerStats.skills.problemSolving) {
                        progressRate *= workerStats.skills.problemSolving / 75;
                    }
                    
                    task.progress += deltaTime * 60 * progressRate;
                    task.percentComplete = Math.min(100, Math.floor((task.progress / task.duration) * 100));

                    if (task.percentComplete > 0 && task.status === 'new') {
                        task.status = 'in-progress';
                    }
                    
                    if (task.percentComplete >= 100) {
                        task.status = 'completed';
                        task.progress = task.duration; // Cap progress
                        workerStats.completedTasks++;
                        completedAny = true;
                        
                        // Skill improvement with completed tasks
                        if (task.type === 'coding') {
                            workerStats.skills.coding = Math.min(100, workerStats.skills.coding + 0.2);
                        } else if (task.type === 'meeting' || task.type === 'documentation') {
                            workerStats.skills.communication = Math.min(100, workerStats.skills.communication + 0.2);
                        } else if (task.type === 'planning') {
                            workerStats.skills.teamwork = Math.min(100, workerStats.skills.teamwork + 0.2);
                        } else if (task.type === 'testing') {
                            workerStats.skills.problemSolving = Math.min(100, workerStats.skills.problemSolving + 0.2);
                        }
                        
                        // Satisfaction boost with completed tasks
                        workerStats.satisfaction = Math.min(100, workerStats.satisfaction + 1);
                    }
                    
                    updated = true;
                }
            });
            
            // Update the task list if it's visible and tasks were updated
            if (updated && document.getElementById('task-panel').style.display === 'block') {
                renderTaskList();
            }
            
            // Visual indication of task completion
            if (completedAny && isWorkDay) {
                // Flash a soft highlight around the worker
                const glow = new THREE.Mesh(
                    new THREE.SphereGeometry(0.5, 16, 16),
                    new THREE.MeshBasicMaterial({ 
                        color: 0x4CAF50, 
                        transparent: true, 
                        opacity: 0.6 
                    })
                );
                glow.position.copy(worker.position);
                glow.position.y += 0.5;
                scene.add(glow);
                
                // Animate glow effect
                gsap.to(glow.scale, {
                    x: 2,
                    y: 2,
                    z: 2,
                    duration: 0.8,
                    ease: "power2.out"
                });
                
                gsap.to(glow.material, {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    onComplete: () => {
                        scene.remove(glow);
                    }
                });
            }
        }

        // --- Project Management ---
        function addRandomProject() {
            const projectType = projectTypes[Math.floor(Math.random() * projectTypes.length)];
            const projectNames = [
                'Alpha Launch', 'Beta Release', 'Q3 Marketing Push', 'Website Redesign',
                'Core Feature Refactor', 'New Product Research', 'Infrastructure Upgrade'
            ];

            const projectName = projectNames[Math.floor(Math.random() * projectNames.length)];

            const project = {
                id: nextProjectId++,
                name: projectName,
                type: projectType.id,
                typeInfo: projectType,
                status: 'active', // Add more statuses later if needed
                createdAt: Date.now()
            };
            
            projects.push(project);
            renderProjectList();
        }

        function renderProjectList() {
            const projectListContainer = document.getElementById('project-list');
            projectListContainer.innerHTML = '';

            if (projects.length === 0) {
                projectListContainer.innerHTML = '<p>No projects yet. Add a project to get started.</p>';
                return;
            }

            projects.sort((a, b) => a.createdAt - b.createdAt);

            projects.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.className = 'task-item'; // Reuse task styling for now
                projectElement.style.borderLeftColor = project.typeInfo.color;

                const projectHeader = document.createElement('div');
                projectHeader.className = 'task-header';

                const projectTitle = document.createElement('div');
                projectTitle.textContent = project.name;

                const projectType = document.createElement('div');
                projectType.textContent = project.typeInfo.name;
                projectType.style.color = project.typeInfo.color;

                projectHeader.appendChild(projectTitle);
                projectHeader.appendChild(projectType);
                
                const projectDetails = document.createElement('div');
                projectDetails.style.fontSize = '0.85em';
                projectDetails.style.color = '#666';
                projectDetails.textContent = `Status: ${project.status}`;

                projectElement.appendChild(projectHeader);
                projectElement.appendChild(projectDetails);

                projectListContainer.appendChild(projectElement);
            });
        }

        // Handle mouse click
        function onMouseClick(event) {
            // Calculate mouse position in normalized device coordinates
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
            
            // Update the picking ray with the camera and mouse position
            raycaster.setFromCamera(mouse, camera);
            
            // Calculate objects intersecting the picking ray
            const intersects = raycaster.intersectObjects(scene.children, true);
            
            // Check if worker was clicked
            let workerClicked = false;
            for (let i = 0; i < intersects.length; i++) {
                const obj = findAncestor(intersects[i].object, worker);
                if (obj) {
                    workerClicked = true;
                    followWorker();
                    break;
                }
            }
            
            // If clicking elsewhere and following worker, stop following
            if (!workerClicked && followingWorker && event.target === renderer.domElement) {
                unfollowWorker();
            }
        }

        // Find if an object is part of the worker
        function findAncestor(obj, ancestor) {
            let current = obj;
            while (current) {
                if (current === ancestor) return current;
                current = current.parent;
            }
            return null;
        }

        // Follow worker with camera
        function followWorker() {
            if (!followingWorker) {
                // Store current camera state for returning later
                originalCameraPosition = camera.position.clone();
                originalCameraTarget = controls.target.clone();
                
                followingWorker = true;
                
                // Disable manual controls while following
                controls.enabled = false;
                
                // Show worker stats card
                document.getElementById('worker-stats-card').style.display = 'block';
                
                updateInstructions('Following worker. Press F or ESC to stop following.');
            }
        }

        // Stop following worker
        function unfollowWorker() {
            if (followingWorker) {
                followingWorker = false;
                
                // Return to original camera position
                if (originalCameraPosition && originalCameraTarget) {
                    gsap.to(camera.position, {
                        x: originalCameraPosition.x,
                        y: originalCameraPosition.y,
                        z: originalCameraPosition.z,
                        duration: 1.2,
                        ease: "power2.inOut",
                        onComplete: () => {
                            controls.target.copy(originalCameraTarget);
                            controls.enabled = true;
                        }
                    });
                } else {
                    controls.enabled = true;
                }
                
                // Hide worker stats card
                document.getElementById('worker-stats-card').style.display = 'none';
                
                resetInstructions();
            }
        }

        // Update worker stats for display
        function updateWorkerStats() {
            // Update stats based on worker state
            if (isWorkDay && !isOnBreak) {
                // When working, slowly decrease energy
                workerStats.energy = Math.max(40, workerStats.energy - 0.01);
                
                // If energy is low, productivity starts to decrease
                if (workerStats.energy < 70) {
                    workerStats.productivity = 70 + (workerStats.energy - 40);
                } else {
                    workerStats.productivity = 100;
                }
                
                // Satisfaction gradually decreases during workday
                workerStats.satisfaction = Math.max(50, workerStats.satisfaction - 0.005);
            } else if (isOnBreak) {
                // During break, recover energy and satisfaction
                workerStats.energy = Math.min(100, workerStats.energy + 0.05);
                workerStats.satisfaction = Math.min(100, workerStats.satisfaction + 0.02);
                workerStats.productivity = 0; // Not productive during break
            } else {
                // Reset when not working
                workerStats.energy = 100;
                workerStats.productivity = 100;
                workerStats.satisfaction = 80;
            }
            
            // Update display if card is visible
            if (document.getElementById('worker-stats-card').style.display === 'block') {
                const card = document.getElementById('worker-stats-card');
                
                // Update basic stats
                card.querySelector('.stat-row:nth-child(2) .stat-value').textContent = `${Math.round(workerStats.productivity)}%`;
                card.querySelector('.stat-bar:nth-child(3) .stat-fill').style.width = `${Math.round(workerStats.productivity)}%`;
                
                card.querySelector('.stat-row:nth-child(4) .stat-value').textContent = `${Math.round(workerStats.energy)}%`;
                card.querySelector('.stat-bar:nth-child(5) .stat-fill').style.width = `${Math.round(workerStats.energy)}%`;
                
                card.querySelector('.stat-row:nth-child(6) .stat-value').textContent = `${Math.round(workerStats.satisfaction)}%`;
                card.querySelector('.stat-bar:nth-child(7) .stat-fill').style.width = `${Math.round(workerStats.satisfaction)}%`;
                
                // Update completed tasks count
                card.querySelector('.stat-row:last-of-type .stat-value').textContent = workerStats.completedTasks;
            }
        }

        // Show notification
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.position = 'fixed';
            notification.style.top = '10px';
            notification.style.left = '50%';
            notification.style.transform = 'translateX(-50%)';
            notification.style.backgroundColor = 'rgba(0,0,0,0.7)';
            notification.style.color = 'white';
            notification.style.padding = '10px 20px';
            notification.style.borderRadius = '5px';
            notification.style.zIndex = '1000';
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                gsap.to(notification, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    onComplete: () => notification.remove()
                });
            }, 3000);
        }

        // Create worker stats card
        function createWorkerStatsCard() {
            const workerStatsCard = document.createElement('div');
            workerStatsCard.id = 'worker-stats-card';
            workerStatsCard.innerHTML = `
                <h3>${workerStats.name}</h3>
                <div class="stat-row">
                    <span class="stat-label">Productivity:</span>
                    <span class="stat-value">${workerStats.productivity}%</span>
                </div>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${workerStats.productivity}%; background-color: #4CAF50;"></div>
                </div>
                
                <div class="stat-row">
                    <span class="stat-label">Energy:</span>
                    <span class="stat-value">${workerStats.energy}%</span>
                </div>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${workerStats.energy}%; background-color: #2196F3;"></div>
                </div>
                
                <div class="stat-row">
                    <span class="stat-label">Satisfaction:</span>
                    <span class="stat-value">${workerStats.satisfaction}%</span>
                </div>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${workerStats.satisfaction}%; background-color: #FF9800;"></div>
                </div>
                
                <div class="stat-skills">
                    <div class="stat-row">
                        <span class="stat-label">Coding:</span>
                        <span class="stat-value">${workerStats.skills.coding}%</span>
                    </div>
                    <div class="stat-bar">
                        <div class="stat-fill" style="width: ${workerStats.skills.coding}%; background-color: #3498db;"></div>
                    </div>
                    
                    <div class="stat-row">
                        <span class="stat-label">Teamwork:</span>
                        <span class="stat-value">${workerStats.skills.teamwork}%</span>
                    </div>
                    <div class="stat-bar">
                        <div class="stat-fill" style="width: ${workerStats.skills.teamwork}%; background-color: #e74c3c;"></div>
                    </div>
                    
                    <div class="stat-row">
                        <span class="stat-label">Communication:</span>
                        <span class="stat-value">${workerStats.skills.communication}%</span>
                    </div>
                    <div class="stat-bar">
                        <div class="stat-fill" style="width: ${workerStats.skills.communication}%; background-color: #2ecc71;"></div>
                    </div>
                    
                    <div class="stat-row">
                        <span class="stat-label">Problem Solving:</span>
                        <span class="stat-value">${workerStats.skills.problemSolving}%</span>
                    </div>
                    <div class="stat-bar">
                        <div class="stat-fill" style="width: ${workerStats.skills.problemSolving}%; background-color: #9b59b6;"></div>
                    </div>
                </div>
                
                <div class="stat-row">
                    <span class="stat-label">Completed Tasks:</span>
                    <span class="stat-value">${workerStats.completedTasks}</span>
                </div>
                
                <button class="unfocus-btn" onclick="unfollowWorker()">Stop Following</button>
            `;
            document.body.appendChild(workerStatsCard);
        }

        // Create a coffee station
        function createCoffeeStation() {
            // Coffee station location - against the wall
            const coffeeStationX = 8;
            const coffeeStationZ = 3;
            
            // Coffee table/counter
            const counterGeometry = new THREE.BoxGeometry(1.5, 0.8, 0.8);
            const counterMaterial = new THREE.MeshStandardMaterial({ color: 0xd2b48c }); // Wooden color
            const counter = new THREE.Mesh(counterGeometry, counterMaterial);
            counter.position.set(coffeeStationX, 0.4, coffeeStationZ);
            counter.castShadow = true;
            counter.receiveShadow = true;
            counter.name = "coffeeStation";
            scene.add(counter);
            
            // Coffee machine
            const machineBaseGeometry = new THREE.BoxGeometry(0.6, 0.3, 0.4);
            const machineMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 }); // Dark gray/black
            const machineBase = new THREE.Mesh(machineBaseGeometry, machineMaterial);
            machineBase.position.set(coffeeStationX, 0.9, coffeeStationZ - 0.1);
            machineBase.castShadow = true;
            scene.add(machineBase);
            
            // Coffee machine top
            const machineTopGeometry = new THREE.BoxGeometry(0.5, 0.2, 0.3);
            const machineTop = new THREE.Mesh(machineTopGeometry, machineMaterial);
            machineTop.position.set(coffeeStationX, 1.15, coffeeStationZ - 0.1);
            machineTop.castShadow = true;
            scene.add(machineTop);
            
            // Coffee pot
            const potBaseGeometry = new THREE.CylinderGeometry(0.1, 0.12, 0.2, 8);
            const potMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x777777,
                transparent: true,
                opacity: 0.8
            });
            const potBase = new THREE.Mesh(potBaseGeometry, potMaterial);
            potBase.position.set(coffeeStationX + 0.3, 0.9, coffeeStationZ - 0.1);
            potBase.castShadow = true;
            scene.add(potBase);
            
            // Coffee in pot
            const coffeeGeometry = new THREE.CylinderGeometry(0.09, 0.11, 0.15, 8);
            const coffeeMaterial = new THREE.MeshStandardMaterial({ color: 0x4a2c2a }); // Coffee brown
            const coffee = new THREE.Mesh(coffeeGeometry, coffeeMaterial);
            coffee.position.set(coffeeStationX + 0.3, 0.87, coffeeStationZ - 0.1);
            scene.add(coffee);
            
            // Handle for pot
            const handleGeometry = new THREE.TorusGeometry(0.06, 0.01, 8, 16, Math.PI);
            const handle = new THREE.Mesh(handleGeometry, potMaterial);
            handle.position.set(coffeeStationX + 0.4, 0.9, coffeeStationZ - 0.1);
            handle.rotation.y = Math.PI / 2;
            scene.add(handle);
            
            // Add some cups on the counter
            createCoffeeCup(coffeeStationX - 0.4, 0.8, coffeeStationZ + 0.1, 0x3e82a0); // Blue cup
            createCoffeeCup(coffeeStationX - 0.2, 0.8, coffeeStationZ + 0.1, 0xd69b54); // Orange cup
            createCoffeeCup(coffeeStationX, 0.8, coffeeStationZ + 0.1, 0xc95959);       // Red cup
            
            // Add coffee beans jar
            const jarGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.25, 8);
            const jarMaterial = new THREE.MeshStandardMaterial({ 
                color: 0xffffff,
                transparent: true,
                opacity: 0.4
            });
            const jar = new THREE.Mesh(jarGeometry, jarMaterial);
            jar.position.set(coffeeStationX - 0.5, 0.925, coffeeStationZ - 0.2);
            jar.castShadow = true;
            scene.add(jar);
            
            // Coffee beans in jar
            const beansGeometry = new THREE.CylinderGeometry(0.09, 0.09, 0.2, 8);
            const beansMaterial = new THREE.MeshStandardMaterial({ color: 0x3e2723 }); // Dark coffee bean color
            const beans = new THREE.Mesh(beansGeometry, beansMaterial);
            beans.position.set(coffeeStationX - 0.5, 0.9, coffeeStationZ - 0.2);
            scene.add(beans);
            
            // Jar lid
            const lidGeometry = new THREE.CylinderGeometry(0.11, 0.11, 0.02, 8);
            const lid = new THREE.Mesh(lidGeometry, new THREE.MeshStandardMaterial({ color: 0xdddddd }));
            lid.position.set(coffeeStationX - 0.5, 1.05, coffeeStationZ - 0.2);
            scene.add(lid);
        }

        // Create a coffee cup
        function createCoffeeCup(x, y, z, color = 0xffffff) {
            const cupGroup = new THREE.Group();
            cupGroup.name = "coffeeCup";
            
            // Cup body
            const cupGeometry = new THREE.CylinderGeometry(0.05, 0.04, 0.1, 16);
            const cupMaterial = new THREE.MeshStandardMaterial({ color: color });
            const cup = new THREE.Mesh(cupGeometry, cupMaterial);
            cup.position.set(0, 0, 0);
            cup.castShadow = true;
            cupGroup.add(cup);
            
            // Coffee in cup
            const coffeeGeometry = new THREE.CylinderGeometry(0.04, 0.03, 0.02, 16);
            const coffeeMaterial = new THREE.MeshStandardMaterial({ color: 0x4a2c2a }); // Coffee brown
            const coffee = new THREE.Mesh(coffeeGeometry, coffeeMaterial);
            coffee.position.set(0, 0.05, 0);
            cupGroup.add(coffee);
            
            // Cup handle
            const handleGeometry = new THREE.TorusGeometry(0.03, 0.01, 8, 16, Math.PI);
            const handle = new THREE.Mesh(handleGeometry, cupMaterial);
            handle.position.set(0.05, 0, 0);
            handle.rotation.y = Math.PI / 2;
            cupGroup.add(handle);
            
            cupGroup.position.set(x, y, z);
            scene.add(cupGroup);
            
            return cupGroup;
        }

        // Finish coffee break and return to work
        function finishCoffeeBreak() {
            isOnBreak = false;
            
            // Finish coffee and discard cup
            if (workerCoffeeCup) {
                // Position cup back on counter
                const coffeeStationPosition = new THREE.Vector3(8, 1, 3);
                
                // First turn toward coffee station
                const direction = new THREE.Vector3().subVectors(coffeeStationPosition, worker.position).normalize();
                const angle = Math.atan2(direction.x, direction.z);
                
                gsap.to(worker.rotation, {
                    y: angle,
                    duration: 0.5,
                    onComplete: () => {
                        // Walk back to coffee station
                        gsap.to(worker.position, {
                            x: coffeeStationPosition.x - 1,
                            z: coffeeStationPosition.z,
                            duration: 1.5,
                            ease: "power1.inOut",
                            onComplete: () => {
                                // Detach cup from worker
                                const cupWorldPosition = new THREE.Vector3();
                                workerCoffeeCup.getWorldPosition(cupWorldPosition);
                                
                                worker.remove(workerCoffeeCup);
                                workerCoffeeCup = null;
                                
                                // Create a cup at the counter position (disposing animation)
                                const disposedCup = createCoffeeCup(7.6, 0.8, 3, 0xc95959);
                                
                                // Fade out cup (for cleanup animation)
                                gsap.to(disposedCup.position, {
                                    y: 0.9,
                                    duration: 0.3,
                                    onComplete: () => {
                                        gsap.to(disposedCup.children[0].material, {
                                            opacity: 0,
                                            duration: 0.5,
                                            onComplete: () => {
                                                scene.remove(disposedCup);
                                                // Walk to desk after disposing cup
                                                walkToDesk();
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                // If no cup (shouldn't happen), just walk to desk
                walkToDesk();
            }
            
            // Update instructions
            updateInstructions('Worker is returning to work...');
        }

    </script>
</body>
</html> 
