export default class Order {
    constructor(
        public id: number,
        public name: string,
        public status: string|undefined = undefined,
        public userID: number,
        public description: string|undefined = undefined,
        public image: string|undefined = undefined
    ) { }
}