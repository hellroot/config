class PC {
  constructor(name) {
    this.name = name;
  }

  sayWakeUp() {
    return `Wake up, ${this.name}`;
  }
}

const config = {
  someObject: new PC('Neo')
};

module.exports = config;
