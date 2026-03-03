export class Event {
  #waiters: Array<() => void> = [];
  notify(): void {
    for (const waiter of this.#waiters) {
      waiter();
    }
    this.#waiters = [];
  }

  async waitFor(): Promise<void> {
    return new Promise((resolve) => {
      this.#waiters.push(() => resolve(undefined));
    });
  }
}
