import { BaseCommand, BaseHandler, meta } from "@fancy-crud/core";

export class GreetCommand implements BaseCommand {
  public readonly meta = meta(IGreetHandler)

  constructor(
    public readonly name: string
  ) {}
}

export abstract class IGreetHandler implements BaseHandler {
  abstract execute(command: GreetCommand): string
}
