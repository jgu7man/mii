export class AlertMsgModel {
    constructor(
        public mensaje: string,
        public confirmacion?: string
    ){}
}

export class AlertAskModel {
    constructor(
        public mensaje: string,
        public respTrue?: string,
        public respFalse?: string
    ){}
}