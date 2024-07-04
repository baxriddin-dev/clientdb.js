export class ID {
  static unique() {
    const timestamp = Date.now().toString(36);
    const randomStrStart = Math.random().toString(36).substring(2, 11);
    const randomStrEnd = Math.random().toString(36).substring(2, 11);

    return `${randomStrStart}-${timestamp}-${randomStrEnd}`;
  }
}