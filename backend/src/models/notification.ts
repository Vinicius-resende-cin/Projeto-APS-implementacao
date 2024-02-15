
// Interface que define o comportamento do componente base
export default interface Notifier {
    messageConfiguration: object;
    addresses: object;
    send(): void;
}