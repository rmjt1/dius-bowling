export interface Game {
    roll(noOfPins: number);

    score(): number;
}

class Frame {
    balls: number[] = [];

    bowl(pins: number) {
        if (this.isComplete()) throw new Error("Too many bowls");
        this.balls.push(pins);
    }

    isComplete(): boolean {
        return this.total() == 10 || this.balls.length == 2;
    }

    total(): number {
        return (this.balls[0] ? this.balls[0] : 0) + (this.balls[1] ? this.balls[1] : 0);
    }

    isSpare(): boolean {
        return !this.isStrike() && this.balls.length == 2 && (this.balls[0] + this.balls[1] == 10);
    }

    isStrike(): boolean {
        return this.balls[0] == 10;
    }

    score(frames: Frame[]) {
        const balls = frames.flatMap(f => f.balls);
        let total = this.total();
        if (this.isSpare() && balls[0]) total += balls[0];
        if (this.isStrike()) {
            if (balls[0]) total += balls[0];
            if (balls[1]) total += balls[1];
        }
        return total;
    }

    toString(): string {
        return `(${this.balls[0]},${this.balls.length > 1 ? this.balls[1] : '_'})`;
    }
}

class LastFrame extends Frame {
    total(): number {
        return super.total() + (this.balls[2] ? this.balls[2] : 0);
    }

    isComplete(): boolean {
        return this.balls.length == 3;
    }

    score(): number {
        return this.total();
    }

    toString(): string {
        return `(${this.balls[0]},${this.balls[1] ? this.balls[1] : '_'},${this.balls[2] ? this.balls[2] : ''})`;
    }
}

export class BowlingGame implements Game {
    private frames: Frame[] = [];
    private currentFrame: Frame;

    isLastFrame(): boolean {
        return this.frames.length == 9;
    }

    frame(): Frame {
        if (!this.currentFrame || this.currentFrame.isComplete()) {
            if (this.isLastFrame())
                this.currentFrame = new LastFrame();
            else
                this.currentFrame = new Frame();
            this.frames.push(this.currentFrame);
        }
        return this.currentFrame;
    }

    roll(noOfPins: number): void {
        this.frame().bowl(noOfPins);
    }

    score(): number {
        return this.frames
            .reduce((score, frame, index, frames) => {
                return score + frame.score(frames.slice(index + 1));
            }, 0);
    }

    toString(): string {
        return "Game[" + this.frames.map(f => f.toString()) + "]";
    }
}
