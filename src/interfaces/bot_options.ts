interface Identity {
    username: string,
    password: string
}

export default interface BotOptions {
    identity: Identity,
    channels: string[]
}