export default class ErrorData<D> extends Error {
  public data: D
  constructor(message: string, data: D) {
    super(message)
    this.name = this.constructor.name
    this.data = data
  }
}