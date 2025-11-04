import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild, signal, AfterViewInit, inject, ChangeDetectorRef } from '@angular/core';

type ObstacleType = 'paper' | 'briefcase';
interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: ObstacleType;
}

type BuildingType = 'rect' | 'tower' | 'sloped';
interface Building {
    x: number;
    width: number;
    height: number;
    color: string;
    type: BuildingType;
}


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gameCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private cdr = inject(ChangeDetectorRef);
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId: number | null = null;
  
  // Game state
  gameState = signal<'idle' | 'running' | 'over'>('idle');
  score = signal(0);
  
  // Player properties
  private player = { x: 50, y: 150, width: 40, height: 60, dy: 0, jumpPower: -10, gravity: 0.4, onGround: true };
  private playerImage!: HTMLImageElement;
  private playerImageLoaded = signal(false);
  
  // Obstacle properties
  private obstacles: Obstacle[] = [];
  private obstacleSpeed = 2;
  private readonly initialObstacleSpeed = 2;
  private readonly maxObstacleSpeed = 8;
  private readonly speedIncreaseRate = 0.0005;
  private obstacleSpawnTimer = 0;
  
  // Background properties
  private buildings: Building[] = [];


  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      this.ctx = context;

      this.playerImage = new Image();
      this.playerImage.src = 'https://cdn.imgchest.com/files/4ae6d48bd514.PNG';
      this.playerImage.onload = () => {
        this.playerImageLoaded.set(true);
        // Redraw if game hasn't started yet
        if (this.gameState() !== 'running') {
            this.draw();
        }
      };

      this.resizeCanvas();
      window.addEventListener('resize', this.resizeCanvas);
      document.addEventListener('keydown', this.handleKeydown);
      canvas.addEventListener('mousedown', this.handleInteraction);
      canvas.addEventListener('touchstart', this.handleInteraction);
      this.generateBuildings();
      this.draw(); // Initial draw
    }
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    const canvas = this.canvasRef.nativeElement;
    window.removeEventListener('resize', this.resizeCanvas);
    document.removeEventListener('keydown', this.handleKeydown);
    canvas.removeEventListener('mousedown', this.handleInteraction);
    canvas.removeEventListener('touchstart', this.handleInteraction);
  }

  private resizeCanvas = () => {
    this.canvasRef.nativeElement.width = this.canvasRef.nativeElement.offsetWidth;
    this.canvasRef.nativeElement.height = 300; // Fixed height
    this.player.y = this.canvasRef.nativeElement.height - this.player.height;
    if (this.gameState() === 'idle' || this.gameState() === 'over') {
        this.draw();
    }
  }

  startGame(): void {
    if (this.gameState() === 'running') return;

    this.resetGame();
    this.gameState.set('running');
    this.gameLoop();
  }
  
  private resetGame(): void {
    this.score.set(0);
    this.obstacles = [];
    this.obstacleSpawnTimer = 100; // spawn first one quicker
    this.player.y = this.ctx.canvas.height - this.player.height;
    this.player.dy = 0;
    this.player.onGround = true;
    this.obstacleSpeed = this.initialObstacleSpeed;
  }

  private handleInteraction = (e: Event) => {
    e.preventDefault();
    if (this.gameState() === 'running' && this.player.onGround) {
      this.player.dy = this.player.jumpPower;
      this.player.onGround = false;
    } else if (this.gameState() !== 'running') {
      this.startGame();
    }
  };

  private handleKeydown = (e: KeyboardEvent) => {
    if ((e.code === 'Space' || e.code === 'ArrowUp')) {
        this.handleInteraction(e);
    }
  };

  private gameLoop = () => {
    this.update();
    this.draw();
    if (this.gameState() === 'running') {
      this.animationFrameId = requestAnimationFrame(this.gameLoop);
    }
  }

  private update(): void {
    // Increase speed over time
    if (this.obstacleSpeed < this.maxObstacleSpeed) {
      this.obstacleSpeed += this.speedIncreaseRate;
    }

    // Update player
    this.player.dy += this.player.gravity;
    this.player.y += this.player.dy;
    
    const groundY = this.ctx.canvas.height - this.player.height;
    if (this.player.y > groundY) {
      this.player.y = groundY;
      this.player.dy = 0;
      this.player.onGround = true;
    }

    // Update obstacles
    this.obstacleSpawnTimer++;
    if (this.obstacleSpawnTimer > 80 + Math.random() * 80) { // increased spawn time variability
      const type: ObstacleType = Math.random() > 0.5 ? 'paper' : 'briefcase';
      const isPaper = type === 'paper';
      this.obstacles.push({
        x: this.ctx.canvas.width,
        y: 0, // y is calculated from bottom in draw functions
        width: isPaper ? 25 + Math.random() * 10 : 30,
        height: isPaper ? 20 + Math.random() * 15 : 30,
        type: type
      });
      this.obstacleSpawnTimer = 0;
    }

    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const o = this.obstacles[i];
      o.x -= this.obstacleSpeed;
      if (o.x + o.width < 0) {
        this.obstacles.splice(i, 1);
        this.score.update(s => s + 10);
      }
      
      // Collision detection - simplified box collision
      if (
        this.player.x < o.x + o.width &&
        this.player.x + this.player.width > o.x &&
        this.player.y < this.ctx.canvas.height && // Obstacles are on the ground
        this.player.y + this.player.height > this.ctx.canvas.height - o.height
      ) {
        this.gameOver();
      }
    }

    // Update background buildings
    this.buildings.forEach(b => {
        b.x -= this.obstacleSpeed / 4; // Parallax effect
        if(b.x + b.width < 0) {
            b.x = this.ctx.canvas.width + 50;
        }
    });
  }
  
  private gameOver(): void {
    this.gameState.set('over');
    this.cdr.detectChanges();
  }

  private draw(): void {
    const { width, height } = this.ctx.canvas;
    this.ctx.clearRect(0, 0, width, height);
    
    // Draw background
    this.drawBackground();

    // Draw player
    if(this.playerImageLoaded()) {
      this.ctx.drawImage(this.playerImage, this.player.x, this.player.y, this.player.width, this.player.height);
    } else {
      this.ctx.fillStyle = '#0b65df'; // Blue player placeholder
      this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
    }

    // Draw obstacles
    this.obstacles.forEach(o => {
      if(o.type === 'paper') {
        this.drawPaperStack(o);
      } else {
        this.drawBriefcase(o);
      }
    });
  }

  private drawPaperStack(o: Obstacle): void {
    const { height } = this.ctx.canvas;
    const groundY = height;
    this.ctx.fillStyle = '#e5e7eb'; // gray-200
    this.ctx.strokeStyle = '#9ca3af'; // gray-400
    this.ctx.lineWidth = 1;

    const pageHeight = 6;
    let currentY = groundY;
    let count = 0;
    while(currentY > groundY - o.height) {
        const xOffset = count > 0 ? (Math.random() - 0.5) * 6 : 0;
        const widthOffset = count > 0 ? (Math.random() - 0.5) * 4 : 0;
        this.ctx.fillRect(o.x + xOffset, currentY - pageHeight, o.width + widthOffset, pageHeight);
        this.ctx.strokeRect(o.x + xOffset, currentY - pageHeight, o.width + widthOffset, pageHeight);
        currentY -= pageHeight;
        count++;
    }
  }

  private drawBriefcase(o: Obstacle): void {
      const { height } = this.ctx.canvas;
      const groundY = height;
      const bodyHeight = o.height;
      const bodyY = groundY - bodyHeight;

      // Body
      this.ctx.fillStyle = '#57534e'; // stone-600
      this.ctx.fillRect(o.x, bodyY, o.width, bodyHeight);

      // Lock
      this.ctx.fillStyle = '#facc15'; // yellow-400
      this.ctx.fillRect(o.x + o.width * 0.45, bodyY + 5, o.width * 0.1, 5);
      
      // Handle
      this.ctx.strokeStyle = '#44403c'; // stone-700
      this.ctx.lineWidth = 4;
      this.ctx.beginPath();
      this.ctx.moveTo(o.x + o.width * 0.3, bodyY);
      this.ctx.quadraticCurveTo(o.x + o.width * 0.5, bodyY - 10, o.x + o.width * 0.7, bodyY);
      this.ctx.stroke();
  }


  private generateBuildings(): void {
    let currentX = 0;
    this.buildings = [];
    while(currentX < this.ctx.canvas.width * 2) {
        const typeOptions: BuildingType[] = ['rect', 'tower', 'sloped'];
        this.buildings.push({
            x: currentX,
            width: 50 + Math.random() * 100,
            height: 50 + Math.random() * 150,
            color: `hsl(0, 0%, ${90 + Math.random() * 10}%)`,
            type: typeOptions[Math.floor(Math.random() * typeOptions.length)]
        });
        currentX += 100 + Math.random() * 150;
    }
  }

  private drawBackground(): void {
    const { width, height } = this.ctx.canvas;
    // Sky gradient
    const sky = this.ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#87CEEB'); // Sky Blue
    sky.addColorStop(1, '#FFFFFF'); // White at horizon
    this.ctx.fillStyle = sky;
    this.ctx.fillRect(0, 0, width, height);
    
    // Satirical Skolkovo buildings
    this.buildings.forEach(b => {
        this.ctx.fillStyle = b.color;
        
        // Draw building shape
        if (b.type === 'sloped') {
            this.ctx.beginPath();
            this.ctx.moveTo(b.x, height);
            this.ctx.lineTo(b.x, height - b.height * 0.7);
            this.ctx.lineTo(b.x + b.width / 2, height - b.height);
            this.ctx.lineTo(b.x + b.width, height - b.height * 0.7);
            this.ctx.lineTo(b.x + b.width, height);
            this.ctx.closePath();
            this.ctx.fill();
        } else { // rect and tower base are rects
            this.ctx.fillRect(b.x, height - b.height, b.width, b.height);
        }

        if (b.type === 'tower') {
            // Spire
            this.ctx.beginPath();
            this.ctx.moveTo(b.x + b.width / 2 - 5, height - b.height);
            this.ctx.lineTo(b.x + b.width / 2 + 5, height - b.height);
            this.ctx.lineTo(b.x + b.width / 2, height - b.height - 30);
            this.ctx.closePath();
            this.ctx.fill();
        }

        // Funny windows
        this.ctx.fillStyle = '#6b7280'; // gray-500 windows
        for(let y = height - b.height + 10; y < height - 10; y+= 20) {
            for(let x = b.x + 10; x < b.x + b.width -10; x += 20) {
                if(Math.random() > 0.3) {
                    this.ctx.fillRect(x, y, 5, 5);
                }
            }
        }
    });

    // Ground
    this.ctx.fillStyle = '#a1a1aa'; // zinc-400
    this.ctx.fillRect(0, height - 10, width, 10);
  }
}
