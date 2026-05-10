export class CodeUtil {
  static generate() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}