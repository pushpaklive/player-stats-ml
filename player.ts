export interface Player {
    name: string,
    stamina: number,
    skills: {
        speed: number,
        dribble: number,
        accuracy: number,
        power: number
    }
}