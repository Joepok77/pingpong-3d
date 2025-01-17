import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function init() {
    const WIDTH = 700;
    const HEIGHT = 500;
    const TABLE_WIDTH = 400;
    const TABLE_LENGTH = 800;
    const BALL_RADIUS = 10;

    let ball;
    let paddle1, paddle2;
    let ballDirection = { x: 3, z: 4 };
    const paddleSpeed = 8;

    
    let scores = { player1: 0, player2: 0 };
    let isGameOver = false;


    const scoreElement = document.createElement('div');
    scoreElement.style.position = 'absolute';
    scoreElement.style.top = '20px';
    scoreElement.style.left = '50%';
    scoreElement.style.transform = 'translateX(-50%)';
    scoreElement.style.color = 'white';
    scoreElement.style.fontSize = '20px';
    scoreElement.style.fontFamily = 'Arial, sans-serif';
    scoreElement.innerHTML = `Player 1: ${scores.player1} | Player 2: ${scores.player2}`;
    document.body.appendChild(scoreElement);

    // Conteneur pour le message de fin et le bouton
    const endGameContainer = document.createElement('div');
    endGameContainer.style.position = 'absolute';
    endGameContainer.style.top = '50%';
    endGameContainer.style.left = '50%';
    endGameContainer.style.transform = 'translate(-50%, -50%)';
    endGameContainer.style.padding = '20px';
    endGameContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    endGameContainer.style.color = 'white';
    endGameContainer.style.fontSize = '20px';
    endGameContainer.style.fontFamily = 'Arial, sans-serif';
    endGameContainer.style.textAlign = 'center';
    endGameContainer.style.borderRadius = '10px';
    endGameContainer.style.display = 'none'; 
    document.body.appendChild(endGameContainer);

    const winnerMessage = document.createElement('p');
    winnerMessage.style.margin = '0 0 20px 0';
    endGameContainer.appendChild(winnerMessage);

    function checkGameEnd() {
        if (scores.player1 === 2 || scores.player2 === 2) {
            isGameOver = true;
            const winner = scores.player1 === 2 ? 'Player 1 wins!' : 'Player 2 wins!';
            winnerMessage.innerText = winner;
            endGameContainer.style.display = 'block'; 
            restartButton.style.display = 'block'; 
        }
    }

  
    const restartButton = document.createElement('button');
    restartButton.innerText = 'Recommencer';
    restartButton.style.position = 'absolute';
    restartButton.style.top = '60%';
    restartButton.style.left = '50%';
    restartButton.style.transform = 'translate(-50%, -50%)';
    restartButton.style.padding = '10px 20px';
    restartButton.style.fontSize = '16px';
    restartButton.style.cursor = 'pointer';
    restartButton.style.display = 'none'; 
    document.body.appendChild(restartButton);

    restartButton.addEventListener('click', () => {
        resetGame();
        restartButton.style.display = 'none'; 
        endGameContainer.style.display = 'none'; 
    });

    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);

    // Caméra
    const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
    camera.position.set(0, 150, TABLE_LENGTH / 2 + 200);
    camera.lookAt(0, 0, 0);

    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);

    // Lumières
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 200, 300);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x888888, 0.5);
    scene.add(ambientLight);

    // Table de Ping-Pong
    const tableGeometry = new THREE.BoxGeometry(TABLE_WIDTH, 5, TABLE_LENGTH);
    const tableMaterial = new THREE.MeshLambertMaterial({ color: 0x006400 });
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.set(0, -5, 0);
    scene.add(table);

    // Murs latéraux
    const wallGeometry = new THREE.BoxGeometry(10, 50, TABLE_LENGTH);
    const wallMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 });

    const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
    leftWall.position.set(-TABLE_WIDTH / 2 - 5, 25, 0);
    scene.add(leftWall);

    const rightWall = leftWall.clone();
    rightWall.position.set(TABLE_WIDTH / 2 + 5, 25, 0);
    scene.add(rightWall);

    // Ligne centrale
    const lineGeometry = new THREE.PlaneGeometry(TABLE_WIDTH, 2);
    const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const centerLine = new THREE.Mesh(lineGeometry, lineMaterial);
    centerLine.rotation.x = -Math.PI / 2;
    centerLine.position.set(0, 0.1, 0);
    scene.add(centerLine);

    // Charger le modèle GLTF pour les paddles
    const loader = new GLTFLoader();

    loader.load('./assets/ping_pong_racket/scene.gltf', (gltf) => {
        paddle1 = gltf.scene.clone();
        paddle1.scale.set(15, 15, 15);
        paddle1.position.set(0, 10, TABLE_LENGTH / 2 - 0);
        paddle1.rotation.set(0, 0, 0);
        scene.add(paddle1);
    });

    loader.load('./assets/ping_pong_racket/scene.gltf', (gltf) => {
        paddle2 = gltf.scene.clone();
        paddle2.scale.set(15, 15, 15);
        paddle2.position.set(0, 10, -TABLE_LENGTH / 2 + 0);
        paddle2.rotation.set(0, 0, 0);
        scene.add(paddle2);
    });

    // Balle
    const ballGeometry = new THREE.SphereGeometry(BALL_RADIUS, 16, 16);
    const ballMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(0, 10, 0);
    scene.add(ball);

    // Contrôle des paddles
    document.addEventListener('keydown', (event) => {
        const halfTableWidth = TABLE_WIDTH / 2;

        if (paddle1 && !isGameOver) {
            if (event.key === 'ArrowLeft') paddle1.position.x -= paddleSpeed;
            if (event.key === 'ArrowRight') paddle1.position.x += paddleSpeed;
            if (paddle1.position.x < -halfTableWidth + 25) paddle1.position.x = -halfTableWidth + 25;
            if (paddle1.position.x > halfTableWidth - 25) paddle1.position.x = halfTableWidth - 25;
        }

        if (paddle2 && !isGameOver) {
            if (event.key === 'a') paddle2.position.x -= paddleSpeed;
            if (event.key === 'd') paddle2.position.x += paddleSpeed;
            if (paddle2.position.x < -halfTableWidth + 25) paddle2.position.x = -halfTableWidth + 25;
            if (paddle2.position.x > halfTableWidth - 25) paddle2.position.x = halfTableWidth - 25;
        }
    });

    function checkCollisionWithPaddle(paddle) {
        return (
            ball.position.z + BALL_RADIUS >= paddle.position.z - 5 &&
            ball.position.z - BALL_RADIUS <= paddle.position.z + 5 &&
            ball.position.x + BALL_RADIUS >= paddle.position.x - 25 &&
            ball.position.x - BALL_RADIUS <= paddle.position.x + 25 &&
            ball.position.y >= paddle.position.y - 5 &&
            ball.position.y <= paddle.position.y + 5
        );
    }

    function updateScore(player) {
        if (player === 'player1') {
            scores.player1++;
        } else if (player === 'player2') {
            scores.player2++;
        }

        scoreElement.innerHTML = `Player 1: ${scores.player1} | Player 2: ${scores.player2}`;
        checkGameEnd();
        resetBall();
    }

    function resetGame() {
        scores = { player1: 0, player2: 0 };
        scoreElement.innerHTML = `Player 1: 0 | Player 2: 0`;
        isGameOver = false;
        resetBall();
    }

    function resetBall() {
        ball.position.set(0, 10, 0);
        ballDirection = { x: (Math.random() > 0.5 ? 3 : -3), z: (Math.random() > 0.5 ? 4 : -4) };
    }

    function animate() {
        requestAnimationFrame(animate);

        if (isGameOver) return;

        ball.position.x += ballDirection.x;
        ball.position.z += ballDirection.z;

        if (ball.position.x - BALL_RADIUS <= -TABLE_WIDTH / 2 || ball.position.x + BALL_RADIUS >= TABLE_WIDTH / 2) {
            ballDirection.x *= -1;
        }

        if (paddle1 && checkCollisionWithPaddle(paddle1)) {
            ballDirection.z *= -1;
        }

        if (paddle2 && checkCollisionWithPaddle(paddle2)) {
            ballDirection.z *= -1;
        }

        if (ball.position.z > TABLE_LENGTH / 2) {
            updateScore('player2');
        }

        if (ball.position.z < -TABLE_LENGTH / 2) {
            updateScore('player1');
        }

        renderer.render(scene, camera);
    }

    animate();
}

init();
