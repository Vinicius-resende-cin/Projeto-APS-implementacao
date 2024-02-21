export default class User {
    constructor(
        public id: number,
        public name: string|undefined = undefined,
        public type: string|undefined = undefined,
        public apartment: string|undefined = undefined,
        public email: string|undefined = undefined
    ) { }
}