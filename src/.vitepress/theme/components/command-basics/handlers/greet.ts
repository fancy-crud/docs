import { GreetCommand, IGreetHandler } from "../commands/greet";

export class GreetHandler implements IGreetHandler {
  execute(command: GreetCommand): string {
      return `Hello ${command.name}`
  }
}