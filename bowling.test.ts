import {afterEach, beforeEach, expect, test} from "@jest/globals";
import {BowlingGame, Game} from "./bowling";

let game: Game;

beforeEach(() => {
    game = new BowlingGame();
});

afterEach(() => {
    console.log(game.toString());
})

test('new game score is 0', () => {
    expect(game.score()).toBe(0);
});

test('score is 4 after rolling 4', () => {
    game.roll(4);

    expect(game.score()).toBe(4);
});

test('score is 8 after rolling 4 and 4', () => {
    game.roll(4);
    game.roll(4);

    expect(game.score()).toBe(8);
});

test('if a bowler rolls, 4,6 | 5, 0 their score is 20', () => {
    game.roll(4);
    game.roll(6);
    game.roll(5);
    game.roll(0);

    expect(game.score()).toBe(20);
});

test('if a bowler rolls, 10 | 5, 4 their score is 28', () => {
    game.roll(10);
    game.roll(5);
    game.roll(4);

    expect(game.score()).toBe(28);
});

test('if a bowler rolls, 10 | 10 | 10 their score is 60', () => {
    game.roll(10);
    game.roll(10);
    game.roll(10);

    expect(game.score()).toBe(60);
});

test('In the last frame, if the bowler bowls a spare, they get another bowl. The score of this frame is the sum of the three bowls.', () => {
    for (let i = 0; i < 18; i++) {
        game.roll(0);
    }

    game.roll(3);
    game.roll(7);
    game.roll(5);

    expect(game.score()).toBe(15);
});

test('In the last frame, if the bowler bowls a strike, they get another 2 bowls. The score of this frame is the sum of the three bowls', () => {
    for (let i = 0; i < 18; i++) {
        game.roll(0);
    }

    game.roll(10);
    game.roll(7);
    game.roll(5);

    expect(game.score()).toBe(22);
});

test('perfect game scores 300', () => {
    for (let i = 0; i < 12; i++) {
        game.roll(10);
    }

    expect(game.score()).toBe(300);
});

test('random game should score 107', () => {
    game.roll(9);
    game.roll(1);

    game.roll(6);
    game.roll(2);

    game.roll(9);
    game.roll(0);

    game.roll(10);

    game.roll(1);
    game.roll(4);

    game.roll(7);
    game.roll(2);

    game.roll(6);
    game.roll(4);

    game.roll(2);
    game.roll(2);

    game.roll(2);
    game.roll(8);

    game.roll(9);
    game.roll(1);
    game.roll(0);

    expect(game.score()).toBe(107);
})
