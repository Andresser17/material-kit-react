export default class HTTPError extends Error {
  status: number;
  statusText: string;

  constructor(message: string, response: Response) {
    super(message);
    this.name = "HTTPError";
    this.status = response.status;
    this.statusText = response.statusText;
  }
}
